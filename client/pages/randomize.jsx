import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import fetch from 'node-fetch';

export default class Randomize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: []
    };
    this.handleRandomizer = this.handleRandomizer.bind(this);
  }

  componentDidMount() {
    fetch('/api/random')
      .then(response => response.json())
      .then(data => this.setState({
        selectedRestaurant: data
      }));
  }

  handleRandomizer(e) {
    this.postDb();
  }

  postDb(restaurant) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurant)
    };

    fetch('/api/random', requestOptions)
      .then(response => response.json());
  }

  render() {
    const rouletteButtons = {
      width: '75%',
      fontSize: '1.5rem',
      marginTop: '1rem',
      color: '#FF4B3A',
      border: '1px solid #FF4B3A',
      borderRadius: '.25rem',
      backgroundColor: 'white'
    };
    return (
    <>
      <Container>
          <Row className='justify-content-center'>
          <Button href={'#restaurants'} className="btn btn-primary" style={rouletteButtons} onClick={this.handleRandomizer}>{'Let\'s eat!'}</Button>
        </Row>
      </Container>
    </>
    );
  }
}
