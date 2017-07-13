import React, { Component } from 'react';
import NavForm from './Form';
import Items from './Items';
import Suggestions from './Suggestions';
import '../App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavForm/>
                <Items/>
                <Suggestions/>
            </div>
        )
    };
}

export default App;
