import React, { Component } from "react";

class Item extends Component {
    render() {
        const { item } = this.props;
        const className = item.release ? 'expecting' : 'current';

        return (
            <div className={`item ${className}`}>
                <span className="item-title">{item.title}</span>
                <a href={item.link}>
                    <img src={item.poster} alt="item-poster"/>
                </a>
                <span className="item-date">{item.release}</span>
                {item.reservation &&
                <div className="item-reservation">
                    <a href={item.reservation} className="btn-reserve" target="_blank">
                        Reserveer
                    </a>
                </div>}
            </div>
        );
    };
}

export default Item;
