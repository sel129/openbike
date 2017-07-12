import React, {Component} from 'react';
import './css/Tile.css';
import 'noble';

class App extends Component {
  constructor() {
    super();
    let data = ["251", "252", "253", "255"];
    this.state = {
      flipped: false,
      className: "flip-container",
      data: data,
      pageIndex: 0,
      frontData: data[0],
      backData: data[1]
    }
    this.flipMe = this.flipMe.bind(this);
  }

  flipMe() {

    let flipped = !this.state.flipped,
      classes = this.state.flipped ? "flip-container" : "flip-container flip",
      pageIndex = (this.state.pageIndex + 1) % 4;
    this.setState({
      flipped: flipped,
      className: classes,
      pageIndex: pageIndex,
      frontData: this.state.flipped ? this.state.data[pageIndex] : this.state.frontData,
      backData: this.state.flipped ? this.state.backData : this.state.data[pageIndex]
    })
  }
  render() {
    return (
      <div >
        <div className={this.state.className} onClick={this.flipMe}>
          <div className="flipper">
            <div className="front">
              <div className="data-field">
                {this.state.frontData}
                {this.props.value}
              </div>
              <div className="field-label">
                3s Pwr
              </div>
            </div>
            <div className="back">
              <div className="data-field">
                {this.state.backData}
              </div>
              <div className="field-label">
                Hrt rt
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;