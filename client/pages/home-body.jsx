import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import fetch from 'node-fetch';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class HomeBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      selectedRestaurant: null,
      isLoading: false
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

    this.setState({ isLoading: true });

    fetch('/api/random/location?userLocation=' + this.state.search)
      .then(response => response.json())
      .then(data => {
        this.setState({
          selectedRestaurant: data,
          isLoading: false
        });
        window.location.hash = '#restaurants';
      });

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
    const mapStyles = {
      position: 'relative',
      width: '100%',
      height: '320px'
    };

    const value = this.state.search;

    let message = '';
    let locationMessage = '';

    if (this.state.isLoading === true) {
      message = <>
      <Container className='d-flex justify-content-center'>
        <div className="spinner-border text-danger d-flex justify-content-center mt-2" role="status">
          <span className="sr-only">Loading...</span>
        </div>
       </Container>
      </>;
    } else {
      message = <p className='primary-color-font mx-4'>Please submit an address.</p>;
    }

    if (this.props.lat === null && this.props.lng === null) {
      locationMessage = <p className='d-flex justify-content-center' style={{ fontSize: '.8rem' }}>Please allow access to location in the browser to track distance from restaurant.</p>;
    }

    return (
    <>
    <Container className='px-0'>
    <form className='mx-4' onSubmit={this.handleSubmit}>
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
            <h2 className='d-flex justify-content-center my-3'>Current Location</h2>
            {locationMessage}
            <Map
              google={this.props.google}
              zoom={14}
              containerStyle={mapStyles}
              initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
            >
              <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />

            </Map>
          </Container>
      </Container>
    </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.MAPS_KEY
})(HomeBody);
