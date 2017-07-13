import React from 'react';
import PropTypes from 'prop-types';
// import fetch from '../data/fetch';
// import * as Config from '../config';

const Suggestions = ({ suggestions, deleteSuggestion }) => (
    <div id="suggestions-popup" className="overlay">
        <div className="popup">
            <h2>Toegevoegd</h2>
            <a className="close" href="#">&times;</a>
            <div id="suggestion-content">
                {Object.keys(suggestions).map((key) =>
                    <p key={key}>
                        {suggestions[key].title}
                        <a onClick={() => deleteSuggestion(key)}>
                            Verwijder
                        </a>
                        <a href={suggestions[key].poster}
                           target="_blank"
                           className="poster-source">
                            Bron
                        </a>
                    </p>
                )}
            </div>
        </div>
    </div>
);

Suggestions.propTypes = {
    suggestions: PropTypes.array.isRequired,
    deleteSuggestion: PropTypes.func.isRequired
};

export default Suggestions;

/*
 class Suggestions extends Component {
 constructor() {
 super();

 this.state = { suggestions: [] };

 this.deleteSuggestion = this.deleteSuggestion.bind(this);
 }

 componentDidMount() {
 fetch.get(Config.ADD_SUGGESTION).then((suggestions) => {
 this.setState({ suggestions });
 });
 }

 deleteSuggestion(id) {
 console.log(id);

 fetch.delete(`${Config.DELETE_SUGGESTION}${id}.json`).then(() => {
 this.componentDidMount();
 });
 }

 render() {
 const { suggestions } = this.state;

 return (
 <div id="suggestions-popup" className="overlay">
 <div className="popup">
 <h2>Toegevoegd</h2>
 <a className="close" href="#">&times;</a>
 <div id="suggestion-content">
 {Object.keys(suggestions).map((key) =>
 <p key={key}>
 {suggestions[key].title}
 <a onClick={() => this.deleteSuggestion(key)}>
 Verwijder
 </a>
 <a href={suggestions[key].poster}
 target="_blank"
 className="poster-source">
 Bron
 </a>
 </p>
 )}
 </div>
 </div>
 </div>
 )
 };
 }
 */
