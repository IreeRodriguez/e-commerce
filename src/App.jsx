import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import Home from './components/Home';
import About from './components/About';
import Cart from './components/Cart';
import Navbar from './components/CustomNavbar';
import SideNav from './components/SideNav';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Row>
            <Col sm={3} md={3}>
              < SideNav />
            </Col>
            <Col sm={9} md={9}>
              <Route exact path="/" component={Home} />
              <Route path="/About" component={About} />
              <Route path="/Cart" component={Cart} />
            </Col>
          </Row>
        </div>

      </Router>
    );
  }
}

export default App;
