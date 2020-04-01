import React, {Component} from 'react';
import classes from './WorldChart.module.css';
import LineChart from '../LineChart/LineChart';

class WorldChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: props.countries,
            data: props.data,
            worldData: props.worldData,
            xLabels: props.xLabels,

            lineData: {
                labels: this.xLabels,
                datasets: [{
                    label: 'Confirmed Cases',
                    data: [],
                    pointBackgroundColor: '#42B3D5',
                    pointBorderColor: '#42B3D5',
                    pointRadius: 0,
                    backgroundColor: '#42B3D5',
                    borderColor: '#42B3D5',
                    fill: false,
                    datalabels: {
                        display: false
                    }
                },{
                    label: 'Deaths',
                    data: [],
                    pointBackgroundColor: '#E4521B',
                    pointBorderColor: '#E4521B',
                    pointRadius: 0,
                    backgroundColor: '#E4521B',
                    borderColor: '#E4521B',
                    fill: false,
                    datalabels: {
                        display: false
                    }
                },{
                    label: 'Recovered',
                    data: [],
                    pointBackgroundColor: '#E85285',
                    pointBorderColor: '#E85285',
                    pointRadius: 0,
                    backgroundColor: '#E85285',
                    borderColor: '#E85285',
                    fill: false,
                    datalabels: {
                        display: false
                    }
                }]},

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
                            min: 0,
                            stepSize: 50000
                        },
                        gridLines: {
                            display: true
                        }
                    }]
                },
                legend: {
                    display: true,
                    labels: {
                        fontSize: 18
                    }
                },
                title: {
                    text: 'World COVID-19 Cases',
                    display: true,
                    fontSize: 30,
                    align: 'start'
                }
            }
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
    
        let newLineData = state.lineData;
        let newLineOptions = state.lineOptions;
        
        newLineData.labels = nextProps.xLabels;
        newLineData.datasets[0].data = [];
        newLineData.datasets[1].data = [];
        newLineData.datasets[2].data = [];
        state.worldData.forEach((point,i) => {
            newLineData.datasets[0].data.push(point.confirmed);
            newLineData.datasets[1].data.push(point.deaths);
            newLineData.datasets[2].data.push(point.recovered);
        });

        return {
            lineData: newLineData,
            lineOptions: newLineOptions
        }
    }

    render() {
        return (
            <div className={classes.WorldChart}>
                <LineChart data={this.state.lineData} options={this.state.lineOptions}></LineChart>
            </div>
        );
    }    
};

export default WorldChart;