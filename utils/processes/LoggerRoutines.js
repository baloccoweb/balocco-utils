import fs from 'fs';
import path from 'path';

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

const execute = (dirpath, callback = () => { }) => {
    const today = formatDate(new Date);
    fs.readdir(dirpath, (err, files) => {
        if (err) throw err;

        files.filter((file) => {
            return !FILES_WHITELIST.includes(file);
        }).forEach((file) => {
            const filepath = path.join(dirpath, file);
            fs.stat(filepath, (err, stat) => {
                if (err) throw err;

                const fileDate = formatDate(new Date(stat.birthtime));
                if (diffDays(new Date(fileDate), new Date(today)) > 7) {
                    fs.unlink(filepath, (err) => {
                        if (err) throw err;
                    });
                }
            });
        });
    });

    setTimeout(() => {
        execute(dirpath, callback);
    }, msToMidnight());

    callback(today);
}

const LoggerRoutines = {
    execute
}

export default LoggerRoutines;