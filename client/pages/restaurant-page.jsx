import React from 'react';
import Container from 'react-bootstrap/Container';
import fetch from 'node-fetch';
import Spinner from './spinner';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: null
    };
  }

  componentDidMount() {
    fetch('/api/random/selected')
      .then(response => response.json())
      .then(data => this.setState({
        selectedRestaurant: data
      }));

  }

  render() {

    const { selectedRestaurant } = this.state;
    const mapStyles = {
      position: 'relative',
      width: '100%',
      height: '320px'
    };
    if (!selectedRestaurant) {
      return (
        <Spinner />
      );
    }

    function tConv24(time24) {
      let ts = time24;
      const H = +ts.substr(0, 2);
      let h = (H % 12) || 12;
      h = (h < 10) ? ('0' + h) : h;
      const ampm = H < 12 ? ' AM' : ' PM';
      ts = h + ':' + ts.substr(2, 3) + ampm;
      return ts;
    }

    function getDistanceInMiles(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d / 1.609;
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    let distance;
    let distanceIcon;
    if (this.props.lat !== null && this.props.lng !== null) {
      distance = `${getDistanceInMiles(this.props.lat, this.props.lng, selectedRestaurant.coordinates.latitude, selectedRestaurant.coordinates.longitude).toFixed(2)} miles`;
      distanceIcon = <i className="fas fa-location-arrow mr-2" style={{ fontSize: '1.1rem' }}></i>;
    } else {
      distance = 'User location not enabled. Please allow access in the browser to view distance in miles.';
    }

    const zipIndex = selectedRestaurant.location.display_address.length - 1;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const hoursByDay = days.map((day, dayIndex) => {
      let hours = selectedRestaurant.hours.open.find(timeSlot => timeSlot.day === dayIndex);

      if (hours === undefined) {
        hours = 'Closed';
      } else {
        hours = `${tConv24(hours.start)} - ${tConv24(hours.end)}`;
      }

      return {
        day,
        hours
      };
    });

    const categories = selectedRestaurant.categories.map(category => category.title);

    const stars = Array(Math.ceil(selectedRestaurant.rating)).fill().map((empty, index) => {
      if (selectedRestaurant.rating - index === 0.5) {
        return <i className='fas fa-star-half rated' key={index}></i>;
      } else {
        return <i className='fas fa-star rated' key={index}></i>;
      }
    });

    return (
      <>
        <Container style={{
          height: '475px',
          backgroundImage: `url(${selectedRestaurant.image_url})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} className='d-flex flex-column-reverse shadow'>
          <Container>
          <h3 className='d-flex primary-color-font text-nowrap mb-0 text-shadow'>{selectedRestaurant.name}</h3>
            <div>{stars}</div>
            <p className='d-flex primary-color-font text-nowrap flex-column-reverse mb-0'>{`${selectedRestaurant.review_count} Reviews`}</p>
            <p className='primary-color-font text-white font-italic mb-2'>{`${categories.join(', ')}`}</p>
          </Container>
        </Container>
        <Container>
          <Row className='d-flex justify-content-center'>
          <h2 className='text-center primary-color pt-1'>Location & Hours</h2>
          </Row>
          <Row className='border-top border-danger primary-font' style={{ marginBottom: '4rem' }}>
            <Column className='border border-danger rounded mt-4 mr-3 shadow'>
            <h3 className='mt-3'>{selectedRestaurant.name}</h3>
            <p className='mt-4 mb-0'>{selectedRestaurant.location.address1}</p>
            <p className='mb-0'>{selectedRestaurant.location.display_address[zipIndex]}</p>
            <p className='mt-4'>{distanceIcon}{distance}</p>
            </Column>
            <Column className='border border-danger rounded mt-4 ml-3 shadow' style={{ fontSize: '.9rem' }}>
              <p className='mt-3 mb-1'>{hoursByDay[0].day} <span className='float-right'>{hoursByDay[0].hours}</span></p>
              <p className='my-1'>{hoursByDay[1].day} <span className='float-right'>{hoursByDay[1].hours}</span></p>
              <p className='my-1'>{hoursByDay[2].day} <span className='float-right'>{hoursByDay[2].hours}</span></p>
              <p className='my-1'>{hoursByDay[3].day} <span className='float-right'>{hoursByDay[3].hours}</span></p>
              <p className='my-1'>{hoursByDay[4].day} <span className='float-right'>{hoursByDay[4].hours}</span></p>
              <p className='my-1'>{hoursByDay[5].day} <span className='float-right'>{hoursByDay[5].hours}</span></p>
              <p className='mt-1 mb-3'>{hoursByDay[6].day} <span className='float-right'>{hoursByDay[6].hours}</span></p>
            </Column>
          </Row>
        </Container>
        <Container className='margin-bottom'>
          <Map
            google={this.props.google}
            zoom={14}
            containerStyle={mapStyles}
            initialCenter={{ lat: selectedRestaurant.coordinates.latitude, lng: selectedRestaurant.coordinates.longitude }}
          >
          <Marker position={{ lat: this.props.lat, lng: this.props.lng }}>
          </Marker>
          <Marker position={{ lat: selectedRestaurant.coordinates.latitude, lng: selectedRestaurant.coordinates.longitude }}/>
          </Map>
        </Container>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.MAPS_KEY
})(Restaurant);
