import React, { Component } from "react";
import fetch from "../data/fetch";
import * as Config from "../config";
import handlePosterScrape from "../utils/scrape/poster";

class NavForm extends Component {
    constructor() {
        super();

        this.state = { title: '', poster: '' };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePosterChange = this.handlePosterChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const { title, poster } = this.state;

        if (title && poster) {
            handlePosterScrape(poster).then((scrape) => {
                fetch.post(Config.SUGGESTIONS, { title, poster: scrape }).then(() => {
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

    render() {
        return (
            <nav>
                <form onSubmit={this.handleSubmit}>
                    <input id="input-suggestion"
                           value={this.state.title}
                           onChange={this.handleTitleChange}
                           placeholder="Film suggestie"/>
                    <input id="input-img"
                           value={this.state.poster}
                           onChange={this.handlePosterChange}
                           placeholder="Trakt.tv URL"/>
                    <button id="btn-add-suggestion">Toevoegen</button>
                    <a href="#suggestions-popup" id="suggestions">Toegevoegd</a>
                    <a href="#" id="refresh">Herladen</a>
                </form>
            </nav>
        )
    };
}

export default NavForm;
