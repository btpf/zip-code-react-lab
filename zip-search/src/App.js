import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div id='appContainer'>
    <div id="containerTitle">{props.locationText}</div>
    <ul>
      <li>State: {props.state}</li>
      <li>Location: {props.location}</li>
      <li>Population (estimated): {props.population}</li>
      <li>Total Wages: {props.totalWages}</li>
    </ul>
  </div>);
}

function ZipSearchField(props) {
  return (<div id='zipSearch'>
    <div>Zip Code</div>
    <input onChange={props.changeHandler} value={props.zipCode}/>
  </div>);
}


class App extends Component {
  state = {
    zipCode: '',
    data:[]
  }
  zipChanged = (event) =>{
    let inputLength = event.target.value.length
    if(inputLength < 6){
    this.setState({zipCode: event.target.value, data: []})
    if(inputLength == 5){
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + event.target.value)
      .then((res)=> res.json())
      .then((data)=> this.setState({data:data}))
    }
  }
}
  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChanged}/>
        <div>
          {this.state.data.map((item,i)=>(
            // <div key={i}>{item.Location}</div>
            <City key={i} state={item.State} locationText={item.LocationText} 
            location={'(' + item.Xaxis + ", " + item.Yaxis + ")"}
             population={item.EstimatedPopulation}
             totalWages={item.TotalWages}
             />
            ))}
          {/* <City />
          <City /> */}
        </div>
      </div>
    );
  }
}

export default App;
