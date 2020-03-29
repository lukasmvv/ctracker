import React, {Component} from 'react';
import Chart from 'chart.js';
import classes from './BarChart.module.css';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            type: 'bar',
            data: null,
            options: null
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        return {
            data: nextProps.data,
            options: nextProps.options
        }            
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.myChart.options = nextState.options;
        this.myChart.data = nextState.data;
        this.myChart.update();
        return true;
    }

    componentDidUpdate() {
        // this.myChart.options = this.state.options;
        // this.myChart.data = this.state.data;
        // this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
          type: 'bar',
          data: this.state.data,
          options: this.state.options
        });
    }

    render() {       
        return (
            <div className={classes.BarChart}>
                <canvas ref={this.chartRef}/>
            </div>
        );
    }
}

export default BarChart;
