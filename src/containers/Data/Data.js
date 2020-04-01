import React, { Component } from 'react';
import classes from './Data.module.css';
// import LineChart from '../../components/LineChart/LineChart';
import WorldChart from '../../components/WorldChart/WorldChart';
import CompareChart from '../../components/CompareChart/CompareChart';
import TextData from '../../components/TextData/TextData';

// https://github.com/pomber/covid19

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            countries: [],
            xLabels: [],  
            worldData: [{
                confirmed: 0,
                deaths: 0,
                recovered: 0
            }]          
        };
    }

    static getDerivedStateFromProps(nextProps, state) {

        let world = state.worldData;
        let newData = state.data;
        const precision = 10000;

        // calculating world stats
        state.xLabels.forEach((date,i) => {

            let totalCases = 0;
            let totalDeaths = 0;
            let totalRecovered = 0;

            state.countries.forEach((country,ci) => {
                const cData = state.data[country];
    
                totalCases = totalCases + cData[i].confirmed;
                totalDeaths = totalDeaths + cData[i].deaths;
                totalRecovered = totalRecovered + cData[i].recovered;
            });

            world[i] = {
                date: date,
                confirmed: totalCases,
                deaths: totalDeaths,
                recovered: totalRecovered
            }
        });

        // adding percentages
        state.xLabels.forEach((date,i) => {
            const worldDateData = world[i];
            state.countries.forEach((country,ci) => {
                const cData = state.data[country];

                // console.log(`${country} ${(cData[i].confirmed/worldDateData.confirmed)*100}`);
                newData[country][i].confirmedPercentage = 100*(Math.round(precision*cData[i].confirmed/worldDateData.confirmed)/precision);
                newData[country][i].deathsPercentage = 100*(Math.round(precision*cData[i].deaths/worldDateData.deaths)/precision);
                newData[country][i].recoveredPercentage = 100*(Math.round(precision*cData[i].recovered/worldDateData.recovered)/precision);
                i!==0 ? newData[country][i].newCases = newData[country][i].confirmed - newData[country][i-1].confirmed: newData[country][i].newCases = 0
            });
        });

        return {
            worldData: world,
            data: newData
        };
    }

    componentDidMount() {
        fetch(`https://pomber.github.io/covid19/timeseries.json`)
        .then(res => res.json())
        .then(json => this.setState({ 
            data: json,
            countries: Object.keys(json).sort(),
            xLabels: json['Afghanistan'].map((dataPoint) => dataPoint.date)
        }));
    }

    render() {
        return (
            <div className={classes.Data}>
                <h1>Country | Cases | Deaths | Recovered</h1>
                
                <TextData worldData={this.state.worldData} countries={this.state.countries} data={this.state.data}></TextData>
                <WorldChart xLabels={this.state.xLabels} worldData={this.state.worldData} countries={this.state.countries} data={this.state.data}></WorldChart>
                <CompareChart xLabels={this.state.xLabels} countries={this.state.countries} data={this.state.data}></CompareChart>
                {/* <p className={classes.DataSource}>Data Source: https://github.com/pomber/covid19</p> */}
                <p><a className={classes.DataSource} href="https://github.com/pomber/covid19">Data Source: https://github.com/pomber/covid19</a></p>
            </div>
        );
    }
};

export default Data;