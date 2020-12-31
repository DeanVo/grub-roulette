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

    function tConv24(time24) {
      let ts = time24;
      const H = +ts.substr(0, 2);
      let h = (H % 12) || 12;
      h = (h < 10) ? ('0' + h) : h;
      const ampm = H < 12 ? ' AM' : ' PM';
      ts = h + ':' + ts.substr(2, 3) + ampm;
      return ts;
    }

    if (!selectedRestaurant) {
      return (
      <Spinner/>
      );
    }
    const zipIndex = selectedRestaurant.location.display_address.length - 1;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const hoursByDay = days.map((day, dayIndex) => {
      const hours = selectedRestaurant.hours.open.find(timeSlot => timeSlot.day === dayIndex);
      return {
        day,
        hours
      };
    });

    for (let i = 0; i < selectedRestaurant.categories.length; i++) {
      categories.push(selectedRestaurant.categories[i].title);
    }

    for (let i = 0; i < 7; i++) {
      if (hoursByDay[i].hours === undefined) {
        hoursByDay[i].hours = 'Closed';
      } else {
        hoursByDay[i].hours = `${tConv24(hoursByDay[i].hours.start)} - ${tConv24(hoursByDay[i].hours.end)}`;
      }
    }

    let rating;

    if (selectedRestaurant.rating === 5) {
      rating = <>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        </>;
    } else if (selectedRestaurant.rating === 4.5) {
      rating = <>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star-half rated"></i>
      </>;
    } else if (selectedRestaurant.rating === 4) {
      rating = <>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
      </>;
    } else if (selectedRestaurant.rating === 3.5) {
      rating = <>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star-half rated"></i>
      </>;
    } else if (selectedRestaurant.rating === 3) {
      rating = <>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
      </>;
    } else if (selectedRestaurant.rating === 2.5) {
      rating = <>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star-half rated"></i>
      </>;
    } else if (selectedRestaurant.rating === 2) {
      rating = <>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star rated"></i>
      </>;
    } else if (selectedRestaurant.rating === 1.5) {
      rating = <>
        <i className="fas fa-star rated"></i>
        <i className="fas fa-star-half rated"></i>
      </>;
    } else if (selectedRestaurant.rating === 1) {
      rating = <>
        <i className="fas fa-star rated"></i>
      </>;
    }

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
            <div>{rating}</div>
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
            <p className='mb-0'>{selectedRestaurant.location.address1}</p>
            <p className='mb-0'>{selectedRestaurant.location.display_address[zipIndex]}</p>
            </Column>
            <Column className='border border-danger rounded mt-4 ml-3 shadow' style={{ fontSize: '.9rem' }}>
              <p className='dflex flex-row mt-3 mb-1'>{hoursByDay[0].day} <span className='float-right'>{hoursByDay[0].hours}</span></p>
              <p className='dflex flex-row my-1'>{hoursByDay[1].day} <span className='float-right'>{hoursByDay[1].hours}</span></p>
              <p className='dflex flex-row my-1'>{hoursByDay[2].day} <span className='float-right'>{hoursByDay[2].hours}</span></p>
              <p className='dflex flex-row my-1'>{hoursByDay[3].day} <span className='float-right'>{hoursByDay[3].hours}</span></p>
              <p className='dflex flex-row my-1'>{hoursByDay[4].day} <span className='float-right'>{hoursByDay[4].hours}</span></p>
              <p className='dflex flex-row my-1'>{hoursByDay[5].day} <span className='float-right'>{hoursByDay[5].hours}</span></p>
              <p className='dflex flex-row mt-1 mb-3'>{hoursByDay[6].day} <span className='float-right'>{hoursByDay[6].hours}</span></p>
            </Column>
          </Row>
        </Container>
      </>
    );
  }
}
