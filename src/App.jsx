import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Cart from './components/Cart';
import Navbar from './components/CustomNavbar';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home}/>
          <Route path="/About" component={About}/>
          <Route path="/Cart" component={Cart}/>
        </div>
      
      </Router>
    );
  }
}

export default App;
