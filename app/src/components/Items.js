import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
// import fetch from '../data/fetch';
// import * as Config from '../config';

const Items = ({ items, loading }) => (
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
);

Items.propTypes = {
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Items;
