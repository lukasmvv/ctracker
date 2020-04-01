import React from 'react';
import classes from './TextButton.module.css';

const TextButton = (props) => {
    const country = props.country;
    const cData = props.cData;
    
    return (


        <button className={classes.TextButton}>{country} | {cData[cData.length-1].confirmed} ({(cData[cData.length-1].confirmedPercentage).toFixed(2)}%) | {cData[cData.length-1].deaths} ({(cData[cData.length-1].deathsPercentage).toFixed(2)}%) | {cData[cData.length-1].recovered} ({(cData[cData.length-1].recoveredPercentage).toFixed(2)}%)</button>

        // <button  key={i} style={
        //     {
        //         fontSize: country==='South Africa'||country==='Ireland' ? '25px' : `${cData[cData.length-1].confirmedPercentage.toFixed(2)/10}em`,
        //         color: country==='South Africa'||country==='Ireland' ? 'green' : 'black'
        //     }} className={classes.Button} >
        //         {country} | {cData[cData.length-1].confirmed} ({(cData[cData.length-1].confirmedPercentage).toFixed(2)}%) | {cData[cData.length-1].deaths} ({(cData[cData.length-1].deathsPercentage).toFixed(2)}%) | {cData[cData.length-1].recovered} ({(cData[cData.length-1].recoveredPercentage).toFixed(2)}%)</button>
    );
};

export default TextButton;