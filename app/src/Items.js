import React, { Component } from "react";
import Item from "./Item";
import * as Config from "config/index";

class Items extends Component {
    async;

    constructor() {
        super();

        this.state = {
            items: await fetch.get(Config.)
    }
    }

    render() {
        return (
            <div>
                <div
                ; id="no-results">

            </div>;
        <div; id="content">
    {this.state.items.map((item) =>
        <Item; item="{item}"; type="{}"/>;
        )}
    </div>
    </div>
    )
    };
}

export default Items;
