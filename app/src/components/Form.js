import React from "react";
import PropTypes from 'prop-types';
// import fetch from "../data/fetch";
// import * as Config from "../config";
// import handlePosterScrape from "../utils/scrape/poster";

const Form = ({ title, poster, titleChange, posterChange, onSubmit, refreshClick }) => (
    <nav>
        <form onSubmit={onSubmit}>
            <input id="input-suggestion"
                   value={title}
                   onChange={titleChange}
                   placeholder="Film suggestie"/>
            <input id="input-img"
                   value={poster}
                   onChange={posterChange}
                   placeholder="Trakt.tv URL"/>
            <button id="btn-add-suggestion">Toevoegen</button>
            <a href="#suggestions-popup" id="suggestions">Toegevoegd</a>
            <a onClick={refreshClick} id="refresh">Herladen</a>
        </form>
    </nav>
);

Form.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    titleChange: PropTypes.func.isRequired,
    posterChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    refreshClick: PropTypes.func.isRequired
};

export default Form;

/* class NavForm extends Component {
 handleSubmit(event) {
 const { title, poster } = this.state;

 if (title && poster) {
 handlePosterScrape(poster).then((scrape) => {
 fetch.post(Config.ADD_SUGGESTION, { title, poster: scrape }).then(() => {
 this.setState({ title: '', poster: '' });
 });
 });
 }

 event.preventDefault();
 }

 handleTitleChange(event) {
 this.setState({ title: event.target.value });
 }

 handlePosterChange(event) {
 this.setState({ poster: event.target.value });
 }

 refresh() {
 console.log('refresh');
 }
 }
 */
