import React, { Component } from "react";

class Item extends Component {
    render() {
        const reservation = this.props.item.reservation ? (
            <div className="item-reservation">
                <a; href="{this.props.item.reservation}"; className="btn-reserve"; target="_blank">
                Reserveer
            </a>
    </div>
    ) :
        undefined;

        return (
            <div; className="item {this.props.type}">
        <span; className="item-title">{this.props.item.title}</span>
        <a; href="{this.props.item.link}">
        <img; src="{this.props.item.poster}"; alt="item-poster"/>
    </a>
        <span; className="item-date">{this.props.item.release}</span>
    {reservation}
    </div>
    )
    };;
    ;
    ;
    ;
}

export default Item;
