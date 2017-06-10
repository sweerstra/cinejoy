const cheerio = require('cheerio');
const request = require('../data/index.js');

module.exports = {
    getCorrectTimeLink(url, minTime) {
        return getScheduleScript(url).then((schedules) => {
            for (var i = 0; i < schedules.length; i++) {
                const schedule = schedules[i];
                const scheduleName = schedule.name;

                if (SCHEDULE_DAYS.some(day => scheduleName.indexOf(day) !== -1)) {
                    var checkoutLink = getOptimizedCheckoutLink(schedule, minTime || 1900);
                    return Promise.all(createReservationLink(checkoutLink));
                }
            }
        });
    }
};

const SCHEDULE_DAYS = ['vrijdag', 'zaterdag', 'maandag'];

function getOptimizedCheckoutLink(schedule, minTime) {
    const timeslots = schedule.timeslots.reverse();
    const length = timeslots.length;

    for (var i = 0; i < timeslots.length; i++) {
        const time = +timeslots[i].replace(':', '');

        if (time > minTime) {
            return schedule.links[length - i - 1];
        }
    }
}

function createReservationLink(url) {
    if (!url) return null;
    const pop = url.split('/').pop();
    return `http://tilburg.euroscoop.nl/Reservation.asp?WCI=templateLogin&WCE=&Vorst=${pop}&JAVA=true`;
}

function getScheduleScript(url) {
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
