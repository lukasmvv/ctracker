import React, {Component} from 'react';
import classes from './CompareChart.module.css';
import LineChart from '../LineChart/LineChart';
import CountryButton from './CountryButton/CountryButton';

class CompareChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
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
            cases: false,
            deaths: false,
            recovered: false,
            daily: true,
            colorsSet: false,

            getcookie: this.getCookie.bind(this)
        }
        
    }

    componentDidMount() {
        if (this.props.countries.length>0) {
            console.log('update');
            
            const favs = this.getCookie('favs');
            console.log(favs);
            const countries = this.props.countries.map(c => {
                return {
                    countryName: c,
                    active: false,
                    fav: false,
                    color: `rgba(${parseInt(255*Math.random())}, ${parseInt(255*Math.random())}, ${parseInt(255*Math.random())}, 1)`
                }
            });
            console.log(countries);
            countries.forEach(c => {
                favs.forEach(f => {
                    if (c.countryName===f) {
                        c.fav = true;
                    }
                });
            });
            this.setState({countries: [...countries]});
            console.log(this.state);
            return true;
        } 
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // const options = state.lineOptions; 
    //     // let isSet = state.colorsSet;
        
    //     // // console.log(nextProps.countries.length>0 && isSet===false);
    //     // if (nextProps.countries.length>0 && isSet===false) {   
    //     //     isSet = true;            
    //     //     return {
    //     //         data: nextProps.data, 
    //     //         countries: nextProps.countries.map(c => {
    //     //             return {
    //     //                 countryName: c,
    //     //                 active: false,
    //     //                 fav: false,
    //     //                 color: `rgba(${parseInt(255*Math.random())}, ${parseInt(255*Math.random())}, ${parseInt(255*Math.random())}, 1)`
    //     //             }
    //     //         }),
    //     //         lineOptions: options,
    //     //         colorsSet: isSet
    //     //     }
    //     // }  else {
    //     //     return state;
    //     // }  
    //     if (JSON.stringify(this.state.countries)!==JSON.stringify(nextState.countries)) {
    //         console.log('updates');
    //         console.log(nextState);
    //         // const favs = this.getCookie('favs');
    //         // console.log(favs);
    //         // const countries = this.state.countries;
    //         // countries.forEach(c => {
    //         //     favs.forEach(f => {
    //         //         if (c.countryName===f) {
    //         //             c.fav = true;
    //         //         }
    //         //     });
    //         // });
    //         // this.setState({countries: [...countries]});

    //         return true;
    //     } 
    //     return false;
    // }

    static getDerivedStateFromProps(nextProps, state) {
        const options = state.lineOptions; 
        let isSet = state.colorsSet;
        
        // console.log(nextProps.countries.length>0 && isSet===false);
        if (nextProps.countries.length>0 && isSet===false) {   
            isSet = true;            
            const favs = state.getcookie('favs');
            return {
                data: nextProps.data, 
                countries: nextProps.countries.map(c => {
                    return {
                        countryName: c,
                        active: false,
                        fav: favs.includes(c) ? true : false,
                        color: `rgba(${parseInt(255*Math.random())}, ${parseInt(255*Math.random())}, ${parseInt(255*Math.random())}, 1)`
                    }
                }),
                lineOptions: options,
                colorsSet: isSet
            }
        }  else {
            return state;
        }           
    }

    getCookie = (name) => {
        const cookieArray = document.cookie.split(';');
        var nameEQ = name + "=";

        // looping through all cookies
        for (var i=0;i<cookieArray.length;i++) {
            let c = cookieArray[i];

            // removing leading spaces
            if (c.charAt(0)===' ') {
                c = c.substring(1,c.length);
            }

            // if found returning all values in array
            if (c.includes(nameEQ)) {
                return c.substring(nameEQ.length,c.length).split(',');
            }
        }
        return null;
    }

    setCookie = (name, value, expireDate) => {
        const cookieName = `${name}=${value}; `;
        const expires = `expires=${expireDate}; `;
        const cookie = `${cookieName}${expires}path=/`;
        document.cookie = cookie;
    }

    eraseCookie = (name) => {
        document.cookie = `${name}+=; Max-Age=-99999999;`;
    }

    countryClicked = (e) => {
        // getting country object
        const countries = this.state.countries
        const country = countries.filter(c => {
            return c.countryName === e.target.value;
        })[0];
        let cIndex = countries.findIndex(x => x.countryName === e.target.value);

        // getting and setting data
        const data = this.state.data[country.countryName];
        let datasets = this.state.lineData.datasets;

        // deactivating country
        if (country.active) {
            country.active = !country.active;

            let indices = [];
            
            datasets.forEach((d,i) => {
                if (d.label.includes(country.countryName)) {
                    indices.push(i);
                }                
            }); 
            for (var i=indices.length-1;i>-1;i--) {
                datasets.splice(indices[i],1);
            }
        } 
        // activating country
        else {
            country.active = !country.active;
            datasets.push({
                label: `${country.countryName} Confirmed Cases`,
                data: data.map(point => point.confirmed),
                pointBackgroundColor: country.color,
                pointBorderColor: country.color,
                pointRadius: 0,
                // borderWidth: 7,
                backgroundColor: country.color,
                borderColor: country.color,
                fill: false,
                hidden: this.state.cases===true ? false : true,
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
                            ret = `${country.countryName}: ${value} C`;
                        }
                        return ret;
                    }
                }
            });
            datasets.push({
                label: `${country.countryName} Cases`,
                data: data.map(point => point.confirmed - point.recovered - point.deaths),
                borderDash: [10,5],
                pointBackgroundColor: country.color,
                pointBorderColor: country.color,
                pointRadius: 0,
                // borderWidth: 7,
                backgroundColor: country.color,
                borderColor: country.color,
                fill: false,
                hidden: this.state.cases===true ? false : true,
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
                            ret = `${country.countryName}: ${value} AC`;
                        }
                        return ret;
                    }
                }
            });
            datasets.push({
                label: `${country.countryName} Deaths`,
                data: data.map(point => point.deaths),
                pointBackgroundColor: country.color,
                pointBorderColor: country.color,
                pointRadius: 0,
                backgroundColor: country.color,
                borderColor: country.color,
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
                            ret = `${country.countryName}: ${value} D`;
                        }
                        return ret;
                    }
                }
            });
            datasets.push({
                label: `${country.countryName} Recovered`,
                data: data.map(point => point.recovered),
                pointBackgroundColor: country.color,
                pointBorderColor: country.color,
                pointRadius: 0,
                backgroundColor: country.color,
                borderColor: country.color,
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
                            ret = `${country.countryName}: ${value} R`;
                        }
                        return ret;
                    }
                }
            });
            datasets.push({
                label: `${country.countryName} Daily`,
                data: data.map(point => point.newCases),
                pointBackgroundColor: country.color,
                pointBorderColor: country.color,
                pointRadius: 0,
                backgroundColor: country.color.substring(0,country.color.length-2)+'0.5)',
                borderColor: country.color,
                lineTension: 0,
                // pointStyle: 'triangle',
                fill: true,
                hidden: this.state.daily===true ? false : true,
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
                            ret = `${country.countryName}: ${value} NC`;
                        }
                        return ret;
                    }
                }
            });
            datasets.push({
                label: `${country.countryName} Last Daily Equivalent`,
                data: data.map(point => data[data.length-1].newCases),
                pointBackgroundColor: 'rgba(211,211,211)',
                pointBorderColor: 'rgba(211,211,211)',
                pointRadius: 0,
                backgroundColor: 'rgba(211,211,211)',
                borderColor: 'rgba(211,211,211)',
                // pointStyle: 'triangle',
                fill: false,
                hidden: this.state.daily===true ? false : true,
                datalabels: {
                    anchor: 'start',
                    align: 'left',
                    offset: 10,
                    font: {
                        size: 20
                    },
                    formatter: function(value, context) {
                        let ret = '';
                        // if (context.dataIndex===data.length-1) {
                        //     ret = `${country}: ${value} NC`;
                        // }
                        return ret;
                    }
                }
            });
        }        

        const lineData = {
            labels: this.props.xLabels,
            datasets: datasets
        }
    
        // re-creating countries and setting state
        countries[cIndex] = country;
        this.setState({
            lineData: lineData,
            countries: [...countries]
        });
    }

    countryFavClicked = (countryN) => {
        // getting country object
        const countries = this.state.countries;
        const country = countries.filter((c,index) => {
            return c.countryName === countryN;
        })[0];
        let cIndex = countries.findIndex(x => x.countryName === countryN);

        country.fav = !country.fav;
        // re-creating countries and setting state
        countries[cIndex] = country;
        this.setState({
            countries: [...countries]
        });

        let favs = this.getCookie('favs');
        if (country.fav) {
            favs.push(countryN);
            favs.sort((a, b) => a.localeCompare(b));
            this.setCookie('favs', favs, '01-01-2100');
        } else {
            this.setCookie('favs', favs.filter((f) => { return f !== countryN }), '01-01-2100');
        }        
    }

    legendClick = (e) => {
        const clicked = e.target.value.toLowerCase();
        //git test
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
        let confirmedClasses = [classes.LegendButton];
        if (!this.state.cases) {
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
        if (!this.state.daily) {
            newCasesClasses.push(classes.LegendButtonActive);
        }

        return (
            <div className={classes.CompareChart}>
                <div className={classes.LegendButtons}>
                    <button className={confirmedClasses.join(' ')} value={'cases'} onClick={(e) => this.legendClick(e)}>Cases</button>
                    <button className={deathsClasses.join(' ')} value={'deaths'} onClick={(e) => this.legendClick(e)}>Deaths</button>
                    <button className={recoveredClasses.join(' ')}  value={'recovered'} onClick={(e) => this.legendClick(e)}>Recovered</button>
                    <button className={newCasesClasses.join(' ')}  value={'daily'} onClick={(e) => this.legendClick(e)}>Daily New</button>
                </div>
                <div className={classes.Chart}>
                    <LineChart data={this.state.lineData} options={this.state.lineOptions}></LineChart>
                </div>
                <div className={classes.FavButtons}>
                    {this.state.countries.map((country,i) => {
                        if (country.fav) {
                            return <CountryButton 
                                        key={i} 
                                        country={country} 
                                        activeCountry={this.countryClicked}
                                        favCountry={this.countryFavClicked}></CountryButton>
                        }
                        return null;
                    })}
                </div>
                <div className={classes.Buttons}>
                    {this.state.countries.map((country,i) => {
                        return <CountryButton 
                                    key={i} 
                                    country={country} 
                                    activeCountry={this.countryClicked}
                                    favCountry={this.countryFavClicked}></CountryButton>
                    })}
                </div>                
            </div>
        );
    }
    
};

export default CompareChart;