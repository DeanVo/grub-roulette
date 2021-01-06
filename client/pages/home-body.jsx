import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import fetch from 'node-fetch';
import Row from 'react-bootstrap/Row';

export default class HomeBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      selectedRestaurant: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch('/api/random/location?userLocation=' + this.state.search)
      .then(response => response.json())
      .then(data => this.setState({
        selectedRestaurant: data
      }));
  }

  render() {
    const searchBarStyle = {
      color: '#FF4B3A',
      border: '1px solid #FF4B3A',
      borderRadius: '.25rem',
      backgroundColor: 'white'
    };
    const searchButton = {
      color: '#FF4B3A',
      border: '1px solid #FF4B3A'
    };
    const rouletteButtons = {
      width: '75%',
      fontSize: '1.5rem',
      marginTop: '1rem',
      color: '#FF4B3A',
      border: '1px solid #FF4B3A',
      borderRadius: '.25rem',
      backgroundColor: 'white'
    };

    const value = this.state.search;

    let message = '';
    let eatButton;

    if (value !== '') {
      message = <>
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </>;
    }

    if (value === '') {
      message = <p className='primary-color-font'>Please submit an address.</p>;
    }

    if (this.state.selectedRestaurant !== null) {
      message = <p className='primary-color-font'>Restaurant found around {value}!</p >;
      eatButton = <Button href={'#restaurants'} className="btn btn-primary" style={rouletteButtons} onClick={this.handleRandomizer}>{'Let\'s eat!'}</Button>;
    }

    if (this.state.selectedRestaurant === null) {
      eatButton = <Button disabled href={'#restaurants'} className="btn btn-primary" style={rouletteButtons} onClick={this.handleRandomizer}>{'Let\'s eat!'}</Button>;
    }

    return (
    <>
    <Container className='px-0'>
    <form onSubmit={this.handleSubmit}>
      <InputGroup className="mb-1 location-bar" style={searchBarStyle}>
        <FormControl
          required
          type="text"
          value={value}
          placeholder="Search Location..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={this.handleChange}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" type="submit" style={searchButton}>Randomize</Button>
        </InputGroup.Append>
      </InputGroup>
    </form>
    {message}
          <Container>
            <Row className='justify-content-center'>
              {eatButton}
            </Row>
          </Container>
      </Container>
    </>
    );
  }
}
