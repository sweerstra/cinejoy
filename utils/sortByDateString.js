module.exports = (titles) => {
    return titles.sort((a, b) => {
        return Date.parse(parseDateString(a.release)) - Date.parse(parseDateString(b.release));
    });
};

const MONTHS = {
    'januari': 'Jan',
    'februari': 'Feb',
    'maart': 'Mar',
    'april': 'Apr',
    'mei': 'May',
    'juni': 'Jun',
    'juli': 'Jul',
    'augustus': 'Aug',
    'september': 'Sep',
    'oktober': 'Oct',
    'november': 'Nov',
    'december': 'Dec'
};

function parseDateString (str) {
    const split = str.replace('Vanaf ', '').split(' ');
    return `${MONTHS[split[1]]} ${split[0]}, ${split[2]}`;
}
