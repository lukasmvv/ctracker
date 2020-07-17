import React, {Component} from 'react';
import classes from './TextData.module.css';

class TextData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: props.countries,
            data: props.shouldAnimate ? props.animateData: props.data,
            worldData: props.worldData
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        return {
            countries: nextProps.countries,
            data: nextProps.shouldAnimate ? nextProps.animateData : nextProps.data,
            worldData: nextProps.worldData
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.data===[] || this.state.countries===[] || this.state.worldData===[] || this.state.worldData.length<=1) {            
            return false;
        }
        return true;
    }

    formatNumber(num) {
        let str = ''+num;
        let i = str.length;
        let counter = 0;
        let newStr = '';
        while (i--) {
            counter++;
            if ((counter-1)%3===0 && (counter-1)!==0) {
                newStr = [ str.slice(i,i+1), ',', ...newStr].join('');
            } else {
                newStr = [ str.slice(i,i+1), ...newStr].join('');
            }
        }
        return newStr;
    }

    getWorldString= () => {
        if (this.state.worldData.length<=1) {
            return '';
        } else {
            return `World | ${this.formatNumber(this.state.worldData[this.state.worldData.length-1].confirmed)} (+${this.formatNumber(this.state.worldData[this.state.worldData.length-1].confirmed - this.state.worldData[this.state.worldData.length-2].confirmed)}) 
            | ${this.formatNumber(this.state.worldData[this.state.worldData.length-1].deaths)} (+${this.formatNumber(this.state.worldData[this.state.worldData.length-1].deaths - this.state.worldData[this.state.worldData.length-2].deaths)}) 
            | ${this.formatNumber(this.state.worldData[this.state.worldData.length-1].recovered)} (+${this.formatNumber(this.state.worldData[this.state.worldData.length-1].recovered - this.state.worldData[this.state.worldData.length-2].recovered)})`
        }
    }

    getCountryString = (cData, country) => {
        return `${country} 
        | ${this.formatNumber(cData[cData.length-1].confirmed)} (${(cData[cData.length-1].confirmedPercentage).toFixed(2)}%) (+${this.formatNumber(cData[cData.length-1].confirmed - cData[cData.length-2].confirmed)}) 
        | ${this.formatNumber(cData[cData.length-1].deaths)} (${(cData[cData.length-1].deathsPercentage).toFixed(2)}%) (+${this.formatNumber(cData[cData.length-1].deaths - cData[cData.length-2].deaths)})
        | ${this.formatNumber(cData[cData.length-1].recovered)} (${(cData[cData.length-1].recoveredPercentage).toFixed(2)}%) (+${this.formatNumber(cData[cData.length-1].recovered - cData[cData.length-2].recovered)})`;
    }

    getDateString = () => {
        //console.log(typeof this.state.data['Afghanistan']===undefined);
        if (this.state.worldData.length<=1) {
            return '';
        } else {
            const len = this.state.data['Afghanistan'].length;
            const date = new Date(this.state.data['Afghanistan'][len-1].date);
            return `${('0'+date.getDate()).slice(-2)}/${('0'+(date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`;
        }
    }

    render() {
        //console.log(this.state.data['Afghanistan']);
        return(
            <div>                
                <h1>{this.getWorldString()}</h1>
                <button className={classes.Animate} onClick={this.props.animate}>Animate</button>
                <div className={classes.Date}>{this.getDateString()}</div>
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
                    } else if (cData[cData.length-1].confirmedPercentage < 25) {
                        allClasses.push(classes.Button25);
                    } else if (cData[cData.length-1].confirmedPercentage < 30) {
                        allClasses.push(classes.Button30);
                    }

                    return <button key={i} className={allClasses.join(' ')} >
                            {/* {country} | {this.formatNumber(cData[cData.length-1].confirmed)} ({(cData[cData.length-1].confirmedPercentage).toFixed(2)}%) | {this.formatNumber(cData[cData.length-1].deaths)} ({(cData[cData.length-1].deathsPercentage).toFixed(2)}%) | {this.formatNumber(cData[cData.length-1].recovered)} ({(cData[cData.length-1].recoveredPercentage).toFixed(2)}%) */}
                            {this.getCountryString(cData, country)}
                            </button>
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