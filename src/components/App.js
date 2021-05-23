import React, { Component } from "react";
import Renderer from "./Renderer";
import { spec, spec1 } from "./data/spec";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'total': 0,
      'compulsory': 0,
      'conflict': 0,
      'address': Array(16).fill(-1)
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log("props: " + JSON.stringify(props));
    console.log("sate : " + JSON.stringify(state));
    if (props.address >= 0) {
      let cached_address = state.address[props.address % 16]
      var compulsory = cached_address < 0;
      var conflict = cached_address >= 0 && cached_address != props.address;
      var new_address = state.address.slice();
      new_address[props.address % 16] = props.address;

      console.log("new_address: " + new_address + " compulsory: " + compulsory + " conflict: " + conflict);
      return {
        total: state.total + 1,
        compulsory: state.compulsory + compulsory,
        conflict: state.conflict + conflict,
        address: new_address
      };
    }
    return null;
  }

  render() {
    return (
      <div>
        <p>total          : {this.state.total}</p>
        <p>hit rate       : {this.state.total > 0 ? 1 - (this.state.compulsory + this.state.conflict) / this.state.total : "NA"}</p>
        <p>compulsory miss: {this.state.compulsory}</p>
        <p>conflict miss  : {this.state.conflict}</p>
        <p>resident       : {this.state.address}</p>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.child1 = React.createRef();
    this.child2 = React.createRef();
    this.onClick = this.onClick.bind(this);
    this.genData = this.genData.bind(this);
    this.state = {
      address: -1,
      num: 1
    }
  }

  onClick() {
    for (let index = 0; index < this.state.num; index++) {
      setTimeout(this.genData, 100 * index);
    }
  }

  genData() {
    var random_address = Math.floor(Math.random() * 256);
    console.log("access memeory at " + random_address);
    this.child1.current.modifyData((tuple) => tuple.y == random_address, "opacity", 1);
    this.child2.current.modifyData((tuple) => tuple.y == random_address % 16, "opacity", 1);
    this.setState({ address: random_address })
  }

  render() {
    return (
      <div>
        <Renderer ref={this.child1} spec={spec} width="50%" position="left"/>
        <Renderer ref={this.child2} spec={spec1} width="50%" position="right"/>
        <Stats address={this.state.address}/>
        <div>
        <input type="number"
        onChange={(event) => this.setState({address: -1, num: event.target.value})} 
        value={this.state.num} />
          <button onClick={this.onClick}>Hello</button>
        </div>
        <p>last memory access: {this.state.address}</p>
      </div>
    );
  }
}

export default App;
