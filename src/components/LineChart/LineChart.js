import React, {Component} from 'react';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import classes from './LineChart.module.css';

Chart.plugins.unregister(ChartDataLabels);

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            type: 'line',
            data: props.data,
            options: props.options,
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        return {
            type: 'line',
            data: nextProps.data,
            options: nextProps.options,
        } 
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.myChart.options = nextState.options;
        this.myChart.data = nextState.data;
        this.myChart.update();
        return true;
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            plugins: [ChartDataLabels],
            type: 'line',
            data: this.state.data,
            options: this.state.options
        });
    }

    render() {
        return (
            <div className={classes.LineChart}>
                <canvas ref={this.chartRef}/>
            </div>            
        );
    }
}

export default LineChart;