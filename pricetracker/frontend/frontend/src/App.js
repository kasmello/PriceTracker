import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from './logo.svg';
import './App.css';

// using a class instead of function allows for states
class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        fuelprices: [],
        dataIsLoaded:false,
      }
      this.fetchFuels = this.fetchFuels.bind(this)
  }

  componentDidMount(){ //if this component works
    this.fetchFuels()
  }

  fetchFuels(){
    console.log('Fetching...')
    fetch('http://127.0.0.1:8000/api/price/')
    .then(response => response.json()) //converts data
    .then(json => {
      this.setState({
        fuelprices: json,
        dataIsLoaded: true

      });
    })
  }

  render() {
    const { dataIsLoaded, fuelprices } = this.state
    if (!dataIsLoaded) return <div>
      <h1>Please wait!</h1>
    </div>;
    return (
      <div className='App'>
        <h1>All prices recorded this month</h1> {
          fuelprices.map((price) => (
            <ol key = { price.id} >
              Brand: { price.brand },
              Date: { price.date },
              Price: { price.price },
              Address: { price.address }

            </ol>
          ))
        }
      </div>
    );


  }

  
}

export default App;
