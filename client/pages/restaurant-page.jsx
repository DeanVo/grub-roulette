import React from 'react';
import Container from 'react-bootstrap/Container';
import fetch from 'node-fetch';
import Spinner from './spinner';

export default class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: null
    };
  }

  componentDidMount() {
    fetch('/api/random')
      .then(response => response.json())
      .then(data => this.setState({
        selectedRestaurant: data
      }));
  }

  render() {
    const { selectedRestaurant } = this.state;
    if (!selectedRestaurant) {
      return (
      <Spinner/>
      );
    }
    return (
      <>
        <Container style={{
          height: '475px',
          backgroundImage: `url(${selectedRestaurant.image_url})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} className='d-flex flex-column-reverse'>
          <h3 className='d-flex restaurant-name text-nowrap'>{selectedRestaurant.name}</h3>
        </Container>
        <Container>
          <h2 className='text-center'>Location & Hours</h2>
        </Container>
      </>
    );
  }
}
