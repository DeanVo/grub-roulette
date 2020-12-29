import React from 'react';
import Container from 'react-bootstrap/Container';
import fetch from 'node-fetch';

export default class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: []
    };
  }

  componentDidMount() {
    fetch('/api/random/1')
      .then(response => response.json())
      .then(data => this.setState({
        selectedRestaurant: data
      }));
  }

  render() {
    const { selectedRestaurant } = this.state;
    return (
      <>
        <Container style={{
          width: '575px',
          height: '500px',
          backgroundImage: `url(${selectedRestaurant.image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'flex-end'
        }}>
          <h1 className='restaurant-name'>{selectedRestaurant.name}</h1>
        </Container>
      </>
    );
  }
}
