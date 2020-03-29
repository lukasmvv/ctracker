import React from 'react';
import classes from './CountryButton.module.css';

const countryButton = (props) => {
    let bg = '#a5c9ec';
    let allClasses = [classes.CountryButton];
    if (props.active) {
        bg = props.color;
    }
    return (
        <button className={allClasses.join(' ')} style={{backgroundColor:bg}} onClick={(e) => props.clicked(e)} value={props.country}>{props.country}</button>
    );
}

export default countryButton;