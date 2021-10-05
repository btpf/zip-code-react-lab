import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  state = {
    city: '',
    data:[]
  }
  cityChanged = (event) =>{
    this.setState({city: event.target.value, data: []})
      fetch('http://ctp-zip-api.herokuapp.com/city/' + event.target.value.toUpperCase())
      .then((res)=> {
          return res.json()
      })
      .then((data)=> {
        console.log(data)
        this.setState({data:data})}).catch(err=>console.log("No Results"))
    
}

  render(){
  return (
    <div className="App">
    <div>Enter your city name  <input value={this.state.city} onChange={this.cityChanged}/> </div>
    {this.state.data.map((item, i)=> (<div key={i}>{item}</div>))}
    </div>
  );
  }

}

export default App;
