import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './Home.css';

export default class Home extends Component {
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
      <div className={`content ${isLoading ? 'is-loading' : ''}`} >
        {
                            !isLoading && category.length > 0 ? category.map(cat => {
                                const {categories, id} = cat;
                                return <div key={id}>
                                    <h6>{categories}</h6>
                                    <p>{id}</p>
                                </div>
                            }) : null
                        }
        </div>
        // <Jumbotron>
        //   <h2>Wellcome to CodeLive</h2>
        //   <p>This is how to build a website with react react router and react bootstrap</p>
        //   <Link to="/about">
        //     <Button bsStyle="primary" > About</Button>
        //   </Link>
        // </Jumbotron>
      // <Col md={8}>
      // </Col>
      // <Grid>
        /* <div className={`content ${isLoading ? 'is-loading' : ''}`}>
        {
                            !isLoading && category.length > 0 ? category.map(cat => {
                                const {categories, id} = cat;
                                return <div key={id}>
                                    <h6>{categories}</h6>
                                    <p>{id}</p>
                                </div>
                            }) : null
                        }
        </div> */
    );
  }
}
