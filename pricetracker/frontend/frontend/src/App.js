import React from 'react';
import { ApiProvider } from './components/api_fetcher';
import FuelView from './components/fuelview';
import WelcomePage from './components/welcome_page';
import { PageNotFound, About } from './components/misc_pages';
import Navbar from './components/header';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { SelectedChanger } from './components/data_table';
import './App.css';

// using a class instead of function/const allows for states

const App = () => {
    return ( 
      <ApiProvider>  
      <SelectedChanger>  
        <Router>
          <h1 className='Title'>PriceTracker</h1>
          <div className="App">
          <Navbar />
            <div className="Content">
              <Routes>
                <Route exact path="/" element={<WelcomePage />} />
                <Route path="/fuelview" element={<FuelView />} />
                <Route path="/about" element={<About />} />
                <Route element={<PageNotFound />} />
              </Routes>
            </div>
        </div>
      </Router>
    </SelectedChanger> 
    </ApiProvider> 
    );


  // }

  
}

export default App;
