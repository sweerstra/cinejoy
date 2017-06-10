import React, { Component } from "react";
import Item from "./Item";
import fetch from "../data/fetch";
import * as Config from "../config";

class Items extends Component {
    constructor() {
        super();

        this.state = { items: [], loading: true }
    }

    componentDidMount() {
        fetch.get(Config.MATCHING_TITLES).then((items) => {
            this.setState({ items, loading: false });
        });
    }

    render() {
        const { items, loading } = this.state;

        return (
            <div>
                {loading &&
                <div id="spinner">
                    <svg viewBox="25 25 50 50" className="circular">
                        <circle cx="50" cy="50" r="20" fill="none" className="path"/>
                    </svg>
                </div>}
                {(!loading && !items.length) &&
                <div id="no-results">
                    <span>Geen films beschikbaar</span>
                </div>}
                <div id="content">
                    {items.map((item, index) =>
                        <Item item={item} key={index}/>
                    )}
                </div>
            </div>
        )
    };
}

export default Items;
