import React from 'react';
import ReactDOM from 'react-dom/client';
import Apifetcher from './components/api_fetcher';
import WelcomePage from './components/welcome_page';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

// using a class instead of function/const allows for states

const App = () => {
    return (      
      <Router>
        <h1>PriceTracker</h1>
          <div className="App">
            <div className="Content">
              <Routes>
                <Route exact path="/" element={<WelcomePage />} />
                <Route path="/fuelview" element={<Apifetcher />} />
              </Routes>
            </div>
        </div>
    </Router>
    );


  // }

  
}

export default App;
