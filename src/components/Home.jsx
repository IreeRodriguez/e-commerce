import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './Home.css';

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: true,
      quizes: []
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData(){
    fetch('https://api.mercadolibre.com/sites/MLA')
      .then(response => response.json())
        .then(data => data.results.map(quiz => (
          {
            questions: `${quiz.question}`,
            wrong: `${quiz.incorrect_answers}`
          }

        )))
          .then(quizes => this.setState({
            quizes,
            isLoading: false
          }) )
          .catch(error => console.log(error))
  }

  render() {
    const {isLoading, quizes} = this.state;
    return (
      <Grid>
        <div className={`content ${isLoading ? 'is-loading' : ''}`}>
        {
                            !isLoading && quizes.length > 0 ? quizes.map(quiz => {
                                const {questions, wrong} = quiz;
                                return <div key={questions}>
                                    <h6>{questions}</h6>
                                    <p>{wrong}</p>
                                </div>
                            }) : null
                        }
        </div>
        <Jumbotron>
          <h2>Wellcome to CodeLive</h2>
          <p>This is how to build a website with react react router and react bootstrap</p>
          <Link to="/about">
            <Button bsStyle="primary" > About</Button>
          </Link>
        </Jumbotron>
        <Row className="show-grid text-center">
          <Col xs={12} sm={4} className="person-wrapper" >
            <Image src="https://raw.githubusercontent.com/MyNameIsURL/react-bootstrap-website/master/public/assets/person-1.jpg" circle className="profile-pic" />
            <h3>Frank</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt expedita voluptatum, quaerat minus veniam nam ex veritatis, quis distinctio ad velit laborum! Rem iste quae laborum cumque eaque dolorem id?</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper" >
            <Image src="https://raw.githubusercontent.com/MyNameIsURL/react-bootstrap-website/master/public/assets/person-1.jpg" circle className="profile-pic" />
            <h3>Frank</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt expedita voluptatum, quaerat minus veniam nam ex veritatis, quis distinctio ad velit laborum! Rem iste quae laborum cumque eaque dolorem id?</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper" >
            <Image src="https://raw.githubusercontent.com/MyNameIsURL/react-bootstrap-website/master/public/assets/person-1.jpg" circle className="profile-pic" />
            <h3>Frank</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt expedita voluptatum, quaerat minus veniam nam ex veritatis, quis distinctio ad velit laborum! Rem iste quae laborum cumque eaque dolorem id?</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}
