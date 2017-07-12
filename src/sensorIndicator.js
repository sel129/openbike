import React, { Component } from 'react';
import './css/sensorIndicator.css';

class SensorIndicator extends Component {
    constructor() {
        super();
        const interval = setInterval(() => {
            const blinkPhase = this.state.blinkPhase === "light" ? "dark" : "light";

            this.setState({blinkPhase: blinkPhase});
        }, 2000);
        this.state = {
            status: "not-connected",
            blinkPhase: "light",
            inverval: interval
        }
    }
    
    render() {
        if(this.props.status === "connected") {
            clearInterval(this.state.interval);
            this.setState({status: "connected", interval: undefined});
        }
        
        return ( 
            <span className={`indicatorBox ${this.state.blinkPhase}`}>
                {this.props.sensorType}
            </span>

        );
    }
}

export default SensorIndicator;