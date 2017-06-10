import React, { Component } from "react";
import NavForm from "./components/NavForm";
import Items from "./components/Items";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavForm/>
                <Items/>
            </div>
        )
    };
}

export default App;
