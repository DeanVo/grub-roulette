import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('/api/random')
      .then(response => response.json())
      .then(data => this.setState({
        selectedRestaurant: data
      }));
  }

  render() {
    const { selectedRestaurant } = this.state;
    return (
      <>
        <Container>
          <img className='restaurant-image' src={selectedRestaurant.image_url}></img>
          <h1 className='restaurant-name'>{selectedRestaurant.name}</h1>
        </Container>
      </>
    );
  }
}
