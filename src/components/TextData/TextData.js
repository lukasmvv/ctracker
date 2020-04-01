import React, {Component} from 'react';
import classes from './TextData.module.css';
import TextButton from './TextButton/TextButton';

class TextData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: props.countries,
            data: props.data,
            worldData: props.worldData
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        return {
            countries: nextProps.countries,
            data: nextProps.data,
            worldData: nextProps.worldData
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.data===[] || this.state.countries===[] || this.state.worldData===[]) {
            return false;
        }
        return true;
    }

    render() {
        
        return(
            <div>
                <h1>World | {this.state.worldData[this.state.worldData.length-1].confirmed} | {this.state.worldData[this.state.worldData.length-1].deaths} | {this.state.worldData[this.state.worldData.length-1].recovered}</h1>
                {this.state.countries.map((country,i) => {
                    const cData = this.state.data[country];
                    let allClasses = [];

                    if (cData[cData.length-1].confirmedPercentage < 1) {
                        allClasses.push(classes.Button1);
                    } else if (cData[cData.length-1].confirmedPercentage < 5) {
                        allClasses.push(classes.Button5);
                    } else if (cData[cData.length-1].confirmedPercentage < 10) {
                        allClasses.push(classes.Button10);
                    } else if (cData[cData.length-1].confirmedPercentage < 15) {
                        allClasses.push(classes.Button15);
                    } else if (cData[cData.length-1].confirmedPercentage < 20) {
                        allClasses.push(classes.Button20);
                    } 

                    return <button key={i} className={allClasses.join(' ')} >
                            {country} | {cData[cData.length-1].confirmed} ({(cData[cData.length-1].confirmedPercentage).toFixed(2)}%) | {cData[cData.length-1].deaths} ({(cData[cData.length-1].deathsPercentage).toFixed(2)}%) | {cData[cData.length-1].recovered} ({(cData[cData.length-1].recoveredPercentage).toFixed(2)}%)</button>
                    // return (<div className={classes.Button}><TextButton country={country} cData={cData}></TextButton></div>);
                })}
            </div>
        );
    }
}

export default TextData;

// style={
//     {
//         height: country==='South Africa'||country==='Ireland' ? '20%' : `${cData[cData.length-1].confirmedPercentage.toFixed(2)/10}em`,
//         color: country==='South Africa'||country==='Ireland' ? 'green' : 'black'
//     }} 