import React from 'react';
import classes from './CountryButton.module.css';

const countryButton = (props) => {
    let bg = '#a5c9ec';
    let string = "+";
    let border = '';
    let allClasses = [classes.CountryButton];
    if (props.country.active) {
        bg = props.country.color;
    }
    if (props.country.fav) {
        string = "-"
        border = classes.favBorder;
    }
    return (
        <div className={[classes.fullButton, border].join(' ')}>            
            <button className={allClasses.join(' ')} style={{backgroundColor:bg}} onClick={(e) => props.activeCountry(e)} value={props.country.countryName}>{props.country.countryName}</button>
            <button className={classes.favButton} onClick={() => props.favCountry(props.country.countryName)}>{string}</button>
        </div>
    );
}

export default countryButton;