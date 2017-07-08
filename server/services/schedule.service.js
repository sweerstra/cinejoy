const cheerio = require('cheerio');
const request = require('../data/index.js');

module.exports = {
    getCorrectTimeLink(link, minTime) {
        return getScheduleScript(link).then((schedules) => {
            for (var i = 0; i < schedules.length; i++) {
                const schedule = schedules[i];
                const scheduleName = schedule.name;

                if (SCHEDULE_DAYS.some(day => scheduleName.indexOf(day) !== -1)) {
                    const checkoutLink = getOptimizedCheckoutLink(schedule, minTime || 1900)
                    return Promise.resolve(createReservationLink(checkoutLink));
                }
            }
        });
    },

    getSchedule(link) {
        return getScheduleScript(link).then((data) => {
            const schedule = [];
            data.forEach((day) => {
                const timeslots = day.timeslots;
                const obj = { name: /*cutDay(*/day.name/*)*/, data: [] };
                for (var i = 0; i < timeslots.length; i++) {
                    if (day.active[i] === 1 && day.full[i] === 0) {
                        obj.data.push({
                            time: timeslots[i],
                            link: createReservationLink(day.links[i])
                        });
                    }
                }
                schedule.push(obj);
            });

            return Promise.resolve(schedule);
        });
    }
};

const SCHEDULE_DAYS = ['vrijdag', 'zaterdag', 'maandag'];

function getOptimizedCheckoutLink (schedule, minTime) {
    const timeslots = schedule.timeslots.reverse();
    const length = timeslots.length;

    for (var i = 0; i < timeslots.length; i++) {
        const time = +timeslots[i].replace(':', '');

        if (time > minTime) {
            return schedule.links[length - i - 1];
        }
    }
}

function createReservationLink (url) {
    if (!url) return null;
    const pop = url.split('/').pop();
    return `http://tilburg.euroscoop.nl/Reservation.asp?WCI=templateLogin&WCE=&Vorst=${pop}&JAVA=true`;
}

function getScheduleScript (url) {
    const KEYWORD = 'scheduleData';
    return request.getHtml(url).then((html) => {
        const $ = cheerio.load(html);
        const scripts = $('script');

        for (var i = 0; i < scripts.length; i++) {
            var data = scripts[i].children[0].data;
            if (data.indexOf(KEYWORD) !== -1) {
                return JSON.parse(data.replace('var scheduleData = ', '').slice(0, -1));
            }
        }
    });
}

function cutDay (day) {
    return day.split(' ').slice(1).join(' ');
}