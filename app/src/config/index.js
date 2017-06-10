const SERVER_PATH = 'http://deni-deni-node-app.1d35.starter-us-east-1.openshiftapps.com/';
const LOCAL_PATH = 'http://localhost:8080/';

export const MATCHING_TITLES = /*SERVER_PATH*/LOCAL_PATH + 'titles';
export const TIMELINE_SCRAPE = SERVER_PATH + 'schedule?link=';
export const TRAKT_POSTER_SCRAPE = SERVER_PATH + '/src/api/trakt_poster.php?target=';
