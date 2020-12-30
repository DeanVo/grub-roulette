import React from 'react';
import Container from 'react-bootstrap/Container';
import fetch from 'node-fetch';
import Spinner from './spinner';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

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
    const categories = [];
    let status = '';
    let indicator = '';

    if (!selectedRestaurant) {
      return (
      <Spinner/>
      );
    }

    if (selectedRestaurant.is_closed === false) {
      status = 'Closed';
      indicator = 'green';
    } else {
      status = 'Open';
      indicator = 'red';
    }

    for (let i = 0; i < selectedRestaurant.categories.length; i++) {
      categories.push(selectedRestaurant.categories[i].title);
    }

    if (categories[1] === undefined) {
      categories[1] = '';
    }

    if (categories[2] === undefined) {
      categories[2] = '';
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
          <Container>
          <h3 className='d-flex primary-color-font text-nowrap'>{selectedRestaurant.name}</h3>
          <p className='d-flex primary-color-font text-nowrap flex-column-reverse'>{`${selectedRestaurant.review_count} Reviews`}</p>
          <p className='primary-color-font'>{`${categories[0]} ${categories[1]} ${categories[2]}`}</p>
          <p className={`${indicator} font-weight-bold`}>{status}</p>
          </Container>
        </Container>
        <Container>
          <Row className='d-flex justify-content-center'>
          <h2 className='text-center primary-color pt-1'>Location & Hours</h2>
          </Row>
          <Row>
            <Column>
            <h3 className='mt-2 border-top border-danger'>{selectedRestaurant.name}</h3>
            <p className='mb-0'>{selectedRestaurant.location.address1}</p>
            <p className='mb-0'>{selectedRestaurant.location.display_address[selectedRestaurant.location.display_address.length - 1]}</p>
            </Column>
          </Row>
        </Container>
      </>
    );
  }
}
