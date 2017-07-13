const SERVER_PATH = 'http://deni-deni-node-app.1d35.starter-us-east-1.openshiftapps.com/';
const LOCAL_PATH = 'http://localhost:8080/';

export const MATCHING_TITLES = SERVER_PATH/*LOCAL_PATH*/ + 'titles';
export const ADD_SUGGESTION = 'https://draait-er-nog-iets.firebaseio.com/suggestions/.json';
export const DELETE_SUGGESTION = 'https://draait-er-nog-iets.firebaseio.com/suggestions/';
export const TIMELINE_SCRAPE = SERVER_PATH + 'schedule?link=';
export const TRAKT_POSTER_SCRAPE = 'https://i321720.iris.fhict.nl/draait-er-nog-iets/src/api/trakt_poster.php?target=';
