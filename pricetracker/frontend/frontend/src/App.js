import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from './logo.svg';
import './App.css';

// using a class instead of function allows for states
class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        fuels: [],
        activeItem: {
          id:null,
          name:'',
          price:0,
        },
        editing:false,
      }
      this.fetchFuels = this.fetchFuels.bind(this)
  }

  componentWillMount(){ //if this component works
    this.fetchFuels()
  }

  fetchFuels(){
    console.log('Fetching...')
    fetch('http://127.0.0.1:8000/api')
    .then(response => response.json()) //converts data
    .then(data => console.log('Data:',data))
  }

  render() {
    return (
      <h1>no cap</h1>
    );


  }

  
}

export default App;
