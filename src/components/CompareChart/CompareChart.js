import React, {Component} from 'react';
import classes from './CompareChart.module.css';
import LineChart from '../LineChart/LineChart';
import CountryButton from './CountryButton/CountryButton';

class CompareChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: props.countries,
            countriesActive: props.countries.map(c => false),
            data: props.data,
            lineData: {
                labels: props.xLabels, 
                datasets: []
            },
            lineOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Date',
                            fontSize: 25
                        },
                        type: 'time',
                        time: {
                            parser: 'YYYY-MM-DD',
                            unit: 'day',
                            displayFormats: {
                                hour: 'HH:mm',
                                day: 'DD-MMM',
                                month: 'MMM-YY'
                             }
                         },
                        ticks: {
                            // min: 0,
                            // max: this.state.xLabels.length,
                            fontSize: 15,
                            autoSkip: true,
                            maxTickLimit: 24                            
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        position: 'left',
                        scaleLabel: {
                            display: true,
                            labelString: '# People',
                            fontSize: 25
                        },
                        ticks: {
                            beginAtZero:true,
                            min: 0
                        },
                        gridLines: {
                            display: true
                        }
                    }]
                },
                legend: {
                    display: false,
                    labels: {
                        fontSize: 18
                    }
                },
                tooltips: {
                    enabled: true
                },
                title: {
                    text: 'Compare Cases',
                    display: true,
                    fontSize: 30,
                    align: 'start'
                }
            },
            confirmed: true,
            deaths: false,
            recovered: false,
            newcases: false,
            allColors: props.countries.map(c => false),
            colorsSet: false
        }
        
    }

    static getDerivedStateFromProps(nextProps, state) {
        const options = state.lineOptions;
        let allColors = state.allColors; 
        let isSet = state.colorsSet;
        
        // console.log(nextProps.countries.length>0 && isSet===false);
        if (nextProps.countries.length>0 && isSet===false) {
            allColors = [];      
            for (var i=0;i<nextProps.countries.length;i++) {
                allColors.push(`rgba(${parseInt(255*Math.random())}, ${parseInt(255*Math.random())}, ${parseInt(255*Math.random())}, 1)`);               
            }
            isSet = true;
        }     

        return {
            data: nextProps.data, 
            countries: nextProps.countries,
            lineOptions: options,
            allColors: allColors,
            colorsSet: isSet
        }
    }

    // generateColors(numCol) {
    //     let allColors = [];
    //     for (var i=0;i<numCol;i++) {
    //         allColors.push(`rgba(${parseInt(255*Math.random())}, ${parseInt(255*Math.random())}, ${parseInt(255*Math.random())}, 1)`);
    //     }
    //     return allColors;
    // }

    countryClicked = (e) => {
        const country = e.target.value;
        const data = this.state.data[country];
        const countryIndex = this.state.countries.indexOf(country);
        
        const newCountriesActive = this.state.countriesActive;
        const countryActive = newCountriesActive[countryIndex];

        let datasets = this.state.lineData.datasets;

        if (countryActive) {
            newCountriesActive[countryIndex] = !countryActive;

            let indices = [];
            
            datasets.forEach((d,i) => {
                if (d.label.includes(country)) {
                    indices.push(i);
                }                
            }); 
            for (var i=indices.length-1;i>-1;i--) {
                datasets.splice(indices[i],1);
            }
        } else {
            newCountriesActive[countryIndex] = !countryActive;//
            datasets.push({
                label: `${country} Confirmed Cases`,
                data: data.map(point => point.confirmed),
                pointBackgroundColor: this.state.allColors[countryIndex],
                pointBorderColor: this.state.allColors[countryIndex],
                pointRadius: 0,
                // borderWidth: 7,
                backgroundColor: this.state.allColors[countryIndex],
                borderColor: this.state.allColors[countryIndex],
                fill: false,
                hidden: this.state.confirmed===true ? false : true,
                datalabels: {
                    anchor: 'start',
                    align: 'left',
                    offset: 10,
                    font: {
                        size: 20
                    },
                    formatter: function(value, context) {
                        let ret = '';
                        if (context.dataIndex===data.length-1) {
                            ret = `${country}: ${value} C`;
                        }
                        return ret;
                    }
                }
            });
            datasets.push({
                label: `${country} Deaths`,
                data: data.map(point => point.deaths),
                pointBackgroundColor: this.state.allColors[countryIndex],
                pointBorderColor: this.state.allColors[countryIndex],
                pointRadius: 0,
                backgroundColor: this.state.allColors[countryIndex],
                borderColor: this.state.allColors[countryIndex],
                // pointStyle: 'star',
                fill: false,
                hidden: this.state.deaths===true ? false : true,
                datalabels: {
                    anchor: 'start',
                    align: 'left',
                    offset: 10,
                    font: {
                        size: 20
                    },
                    formatter: function(value, context) {
                        let ret = '';
                        if (context.dataIndex===data.length-1) {
                            ret = `${country}: ${value} D`;
                        }
                        return ret;
                    }
                }
            });
            datasets.push({
                label: `${country} Recovered`,
                data: data.map(point => point.recovered),
                pointBackgroundColor: this.state.allColors[countryIndex],
                pointBorderColor: this.state.allColors[countryIndex],
                pointRadius: 0,
                backgroundColor: this.state.allColors[countryIndex],
                borderColor: this.state.allColors[countryIndex],
                // pointStyle: 'triangle',
                fill: false,
                hidden: this.state.recovered===true ? false : true,
                datalabels: {
                    anchor: 'start',
                    align: 'left',
                    offset: 10,
                    font: {
                        size: 20
                    },
                    formatter: function(value, context) {
                        let ret = '';
                        if (context.dataIndex===data.length-1) {
                            ret = `${country}: ${value} R`;
                        }
                        return ret;
                    }
                }
            });
            datasets.push({
                label: `${country} NewCases`,
                data: data.map(point => point.newCases),
                pointBackgroundColor: this.state.allColors[countryIndex],
                pointBorderColor: this.state.allColors[countryIndex],
                pointRadius: 0,
                backgroundColor: this.state.allColors[countryIndex],
                borderColor: this.state.allColors[countryIndex],
                // pointStyle: 'triangle',
                fill: false,
                hidden: this.state.newcases===true ? false : true,
                datalabels: {
                    anchor: 'start',
                    align: 'left',
                    offset: 10,
                    font: {
                        size: 20
                    },
                    formatter: function(value, context) {
                        let ret = '';
                        if (context.dataIndex===data.length-1) {
                            ret = `${country}: ${value} NC`;
                        }
                        return ret;
                    }
                }
            });
        }        

        const lineData = {
            labels: this.props.xLabels,
            datasets: datasets
        }
        
        this.setState({
            lineData: lineData
        });
    }

    legendClick = (e) => {
        const clicked = e.target.value.toLowerCase();
        
        let datasets = this.state.lineData.datasets;
        // let newDatasets = datasets.slice();
        // let indices = [];
        let status = this.state[clicked];

        datasets.forEach((d,i) => {
            if (this.state[clicked]) {
                if((d.label.toLowerCase()).includes(clicked)) {
                    d.hidden = true; 
                }
            } else {
                if((d.label.toLowerCase()).includes(clicked)) {
                    d.hidden = false;  
                } 
            }                                      
        });   
        status = !status;
        
        this.setState({
            [clicked]: status,
            datasets: datasets
        });
    }

    render() {  
        // this.colors = this.generateColors(this.props.countries.length);
        let confirmedClasses = [classes.LegendButton];
        if (!this.state.confirmed) {
            confirmedClasses.push(classes.LegendButtonActive);
        }
        let deathsClasses = [classes.LegendButton];
        if (!this.state.deaths) {
            deathsClasses.push(classes.LegendButtonActive);
        }
        let recoveredClasses = [classes.LegendButton];
        if (!this.state.recovered) {
            recoveredClasses.push(classes.LegendButtonActive);
        }
        let newCasesClasses = [classes.LegendButton];
        if (!this.state.newcases) {
            newCasesClasses.push(classes.LegendButtonActive);
        }

        return (
            <div className={classes.CompareChart}>
                <div className={classes.LegendButtons}>
                    <button className={confirmedClasses.join(' ')} value={'confirmed'} onClick={(e) => this.legendClick(e)}>Cases</button>
                    <button className={deathsClasses.join(' ')} value={'deaths'} onClick={(e) => this.legendClick(e)}>Deaths</button>
                    <button className={recoveredClasses.join(' ')}  value={'recovered'} onClick={(e) => this.legendClick(e)}>Recovered</button>
                    <button className={newCasesClasses.join(' ')}  value={'newCases'} onClick={(e) => this.legendClick(e)}>Daily New Cases</button>
                </div>
                <div className={classes.Chart}>
                    <LineChart data={this.state.lineData} options={this.state.lineOptions}></LineChart>
                </div>
                <div className={classes.Buttons}>
                    {this.state.countries.map((country,i) => {
                        return <CountryButton key={i} color={this.state.allColors[i]} active={this.state.countriesActive[i]} country={country} clicked={this.countryClicked}></CountryButton>
                    })}
                </div>                
            </div>
        );
    }
    
};

export default CompareChart;