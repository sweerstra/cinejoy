import React from "react";
import PropTypes from 'prop-types';

const Item = ({ item }) => (
    <div className={`item ${item.release ? 'expecting' : 'current'}`}>
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

Item.propTypes = {
    item: PropTypes.object.isRequired
};

export default Item;
