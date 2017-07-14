const cheerio = require('cheerio');
const request = require('../data/index.js');

module.exports = {
    getScheduleData(link) {
        return findScheduleScript(link).then((data) => {
            const schedule = [];
            data.forEach((day) => {
                if (day.active.every(a => a === 0)) return;

                const timeslots = day.timeslots;
                const obj = { name: day.name, data: [] };
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

function createReservationLink (url) {
    if (!url) return null;
    const pop = url.split('/').pop();
    return `http://tilburg.euroscoop.nl/Reservation.asp?WCI=templateLogin&WCE=&Vorst=${pop}&JAVA=true`;
}

function findScheduleScript (url) {
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
