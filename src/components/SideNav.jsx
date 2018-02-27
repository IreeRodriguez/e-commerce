import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './SideNav.css';

export default class SideNav extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: true,
      category: []
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData(){
    fetch('https://api.mercadolibre.com/sites/MLC', {
      type: 'GET',
      datatype: 'json'
    })
      .then(response => response.json())
        .then(data => data.categories.map(cat => (
          {
            categories: `${cat.name}`,
            id: `${cat.id}`
          }

        )))
          .then(category => this.setState({
            category,
            isLoading: false
          }) )
          .catch(error => console.log(error))
  }

  render() {
    const {isLoading, category} = this.state;
    return (
          <div className={`content ${isLoading ? 'is-loading' : ''} sidenav`} >
          {
                              !isLoading && category.length > 0 ? category.map(cat => {
                                  const {categories, id} = cat;
                                  return <div key={id}>
                                      <a href="#">{categories}</a>
                                  </div>
                              }) : null
                          }
          </div>        
        // <Col sm={3} md={3}>
        // </Col>
    );
  }
}
