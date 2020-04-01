import React, {Component} from 'react';
import classes from './TextData.module.css';

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

    formatNumber(num) {
        let str = ''+num;
        if (num > 1000000) {
            return `${str.substring(0,4)},${str.substring(4,str.length)}`;
        } else if (num > 100000) {
            return `${str.substring(0,3)},${str.substring(3,str.length)}`;
        } else if (num > 10000) {
            return `${str.substring(0,2)},${str.substring(2,str.length)}`;
        } else if (num >1000) {
            return `${str.substring(0,1)},${str.substring(1,str.length)}`;
        } else {
            return `${num}`
        }
    }

    render() {
        
        return(
            <div>
                <h1>World | {this.formatNumber(this.state.worldData[this.state.worldData.length-1].confirmed)} | {this.formatNumber(this.state.worldData[this.state.worldData.length-1].deaths)} | {this.formatNumber(this.state.worldData[this.state.worldData.length-1].recovered)}</h1>
                {this.state.countries.map((country,i) => {
                    const cData = this.state.data[country];
                    let allClasses = [];

                    if (cData[cData.length-1].confirmedPercentage < 1) {
                        allClasses.push(classes.Button05);
                    } else if (cData[cData.length-1].confirmedPercentage < 1) {
                        allClasses.push(classes.Button1);
                    } else if (cData[cData.length-1].confirmedPercentage < 5) {
                        allClasses.push(classes.Button5);
                    } else if (cData[cData.length-1].confirmedPercentage < 10) {
                        allClasses.push(classes.Button10);
                    } else if (cData[cData.length-1].confirmedPercentage < 15) {
                        allClasses.push(classes.Button15);
                    } else if (cData[cData.length-1].confirmedPercentage < 20) {
                        allClasses.push(classes.Button20);
                    } else if (cData[cData.length-1].confirmedPercentage < 30) {
                        allClasses.push(classes.Button30);
                    } 

                    return <button key={i} className={allClasses.join(' ')} >
                            {country} | {this.formatNumber(cData[cData.length-1].confirmed)} ({(cData[cData.length-1].confirmedPercentage).toFixed(2)}%) | {this.formatNumber(cData[cData.length-1].deaths)} ({(cData[cData.length-1].deathsPercentage).toFixed(2)}%) | {this.formatNumber(cData[cData.length-1].recovered)} ({(cData[cData.length-1].recoveredPercentage).toFixed(2)}%)</button>
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