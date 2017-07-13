import fetch from "../../data/fetch";
import * as Config from "../../config";
import UrlParser from "../UrlParser";

export default (poster) => {
    const parser = new UrlParser(poster);

    if (parser.contains('trakt.tv') && !parser.hasDotExtension()) {
        return fetch.get(Config.TRAKT_POSTER_SCRAPE + poster);
    }

    return Promise.resolve(poster);
};