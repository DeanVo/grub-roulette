import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import fetch from 'node-fetch';

export default class Randomize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedRestaurant: []
    };
    this.handleRandomizer = this.handleRandomizer.bind(this);
  }

  handleRandomizer(e) {
    this.setState({ isLoading: true });
    fetch('/api/random')
      .then(response => response.json())
      .then(data => this.setState({
        selectedRestaurant: data
      }));

    this.postDb();
  }

  postDb(restaurant) {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurant)
    };

    fetch('/api/random', requestOptions)
      .then(response => response.json());
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleRandomizer);
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
          <Button className="btn btn-primary" style={rouletteButtons} onClick={this.handleRandomizer}>{'Let\'s eat!'}</Button>
        </Row>
      </Container>
    </>
    );
  }
}
