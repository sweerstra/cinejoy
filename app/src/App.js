import React, { Component } from "react";
import Items from "./components/Items";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="nav">
                    <input id="input-suggestion" type="text" name="suggestion" placeholder="Film suggestie"/>
                    <input id="input-img" type="text" name="img" placeholder="Trakt.tv URL" title="img"/>
                    <button id="btn-add-suggestion">Toevoegen</button>
                    <a href="#suggestions-popup" id="suggestions">Toegevoegd</a>
                    <a href="#" id="refresh">Herladen</a>
                </div>

                <Items/>;

            </div>
        )
    };
}

export default App;
