import React, { Component } from "react";
import Item from "./Item";
import fetch from "../data/fetch";
import * as Config from "../config";

class Items extends Component {
    constructor() {
        super();

        this.state = { items: [] }
    }

    componentDidMount() {
        fetch.get(Config.MATCHING_TITLES).then((items) => {
            this.setState({ items });
        });
    }

    render() {
        return (
            <div>
                <div id="no-results">

                </div>
                <div id="content">
                    {this.state.items.map((item, index) =>
                        <Item item={item} key={index}/>
                    )}
                </div>
            </div>
        )
    };
}

export default Items;
