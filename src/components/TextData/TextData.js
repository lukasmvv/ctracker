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

    render() {
        return(
            <div>
                <h1>World | {this.state.worldData[this.state.worldData.length-1].confirmed} | {this.state.worldData[this.state.worldData.length-1].deaths} | {this.state.worldData[this.state.worldData.length-1].recovered}</h1>
                {this.state.countries.map((country,i) => {
                    const cData = this.state.data[country];
                    
                    return <p key={i} style={
                        {
                            fontSize: country==='South Africa'||country==='Ireland' ? '25px' : `${cData[cData.length-1].confirmedPercentage.toFixed(2)/10}em`,
                            color: country==='South Africa'||country==='Ireland' ? 'green' : 'black'
                        }} >
                            {country} | {cData[cData.length-1].confirmed} ({(cData[cData.length-1].confirmedPercentage).toFixed(2)}%) | {cData[cData.length-1].deaths} ({(cData[cData.length-1].deathsPercentage).toFixed(2)}%) | {cData[cData.length-1].recovered} ({(cData[cData.length-1].recoveredPercentage).toFixed(2)}%)</p>
                })}
            </div>
        );
    }
}

export default TextData;