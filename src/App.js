import React, { Component } from 'react';
import './App.css';
import Tile from './Tile.js';
import noble from 'noble';
import Homepage from './Homepage';
import Setup from './setup';

class App extends Component {

  constructor() {
    super();
    noble.on('stateChange', function(state) {
      // possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
      console.log(state);
      if (state === 'poweredOn') {
        //noble.startScanning();
      } else {
        //noble.stopScanning();
      }
    });

    noble.on('discover', this.discover.bind(this));

    this.startScanning = this.startScanning.bind(this);
    this.startRide = this.startRide.bind(this);
    this.setup = this.setup.bind(this);
    this.state = {
      power: 0,
      cadence: 0,
      rideStarted: false
    }
  }

  discover(peripheral) {
    peripheral.connect(function(error) {
      console.log('connected to peripheral: ' + peripheral.uuid);
      peripheral.discoverServices(['180f'], function(error, services) {
        var powerMeterService = services[0];
        console.log('discovered Power Meter Service');

        powerMeterService.discoverCharacteristics(['0x2a63'], function(error, characteristics) {
          var powerMeasurementCharacteristic = characteristics[3];
          console.log('discovered power measurement characteristic');

          powerMeasurementCharacteristic.on('data', function(data, isNotification) {
            console.log('Power: ' + data.readUInt16BE(1));
            this.setState({power: data.readUInt16BE(1)})
          }.bind(this));

          // to enable notify
          powerMeasurementCharacteristic.subscribe(function(error) {
            console.log('power measurement notification on');
          });
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }
  
  startScanning() {
    noble.startScanning("0x1818", true);
  }

  renderContent() {
    let content;
    if(this.state.rideStarted) {
      content = (
        <div className="App">
          <div className="flex">
            <div className="flex-left">
              <Tile value={this.state.power}/>
            </div>
            <div className="flex-right">
              <Tile/>
            </div>
          </div>
          <div className="flex">
            <div className="flex-left">
              <Tile/>
            </div>
            <div className="flex-right">
              <Tile/>
            </div>
          </div>
          <button onClick={this.startScanning}>Start Scanning</button>
        </div>
      );
    } else if (this.state.showSetup) {
      content = (<Setup/>);
    } else {
      content = (<Homepage startRide={this.startRide} scan={this.startScanning} setup={this.setup}/>);
    }

    return content;
  }

  startRide() {
    this.setState({rideStarted: true});
  }

  setup() {
    this.setState({showSetup: true});
  }

  render() {
    const content = this.renderContent();
    return (content);
  }
}

export default App;
