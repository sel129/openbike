import React, { Component } from 'react';
import SensorIndicator from './sensorIndicator'

class Homepage extends Component {
	render() {
		return ( 
			<div>
				<button onClick={this.props.startRide}>Start Ride</button>
				<button onClick={this.props.scan}>Scan for Devices</button>
				<div>
					<SensorIndicator sensorType="Power" status="not-connected"/>
					<SensorIndicator sensorType="Heart" status="not-connected"/>
				</div>
				
			</div>

		);
	}
}

export default Homepage;