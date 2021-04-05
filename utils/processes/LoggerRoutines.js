const fs = require('fs');
const path = require('path');

const __path = process.argv[2];
const FILES_WHITELIST = [
    ".gitignore"
];

const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const diffDays = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const msToMidnight = () => {
    const now = new Date();
    const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0, 0, 0 // ...at 00:00:00 hours
    );

    return night.getTime() - now.getTime();
}

const execute = (startup) => {
    const today = formatDate(new Date);
    let success, error, data;
    try {
        const files = fs.readdirSync(__path);
        files.filter((file) => {
            return !FILES_WHITELIST.includes(file);
        }).forEach((file) => {
            const filepath = path.join(__path, file);
            const stat = fs.statSync(filepath);
            const fileDate = formatDate(new Date(stat.birthtime));

            if (diffDays(new Date(fileDate), new Date(today)) > 7) {
                fs.unlinkSync(filepath);
            }
        });

        success = true;
        error = null;
        data = {
            today
        };

        setTimeout(() => {
            execute(false);
        }, msToMidnight());
    } catch (e) {
        success = false;
        error = e;
    } finally {
        process.send({
            success,
            error,
            data,
            startup
        });
    }
}

execute(true);