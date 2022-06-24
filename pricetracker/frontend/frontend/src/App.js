import React from 'react';
import { ApiProvider } from './components/api_fetcher';
import Table from './components/table';
import WelcomePage from './components/welcome_page';
import { PageNotFound, About } from './components/misc_pages';
import Navbar from './components/header';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';

// using a class instead of function/const allows for states

const App = () => {
    return ( 
      <ApiProvider>     
        <Router>
          <h1>PriceTracker</h1>
          <div className="App">
          <Navbar />
            <div className="Content">
              <Routes>
                <Route exact path="/" element={<WelcomePage />} />
                {/* <Route path="/fuelview" element={<Apifetcher />} /> */}
                <Route path="/fuelview" element={<Table />} />
                <Route path="/about" element={<About />} />
                <Route element={<PageNotFound />} />
              </Routes>
            </div>
        </div>
      </Router>
    </ApiProvider> 
    );


  // }

  
}

export default App;
