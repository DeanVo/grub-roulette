import React from 'react';
import fetch from 'node-fetch';
import Spinner from './spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rouletteHistory: null
    };
  }

  componentDidMount() {
    fetch('/api/random/history')
      .then(response => response.json())
      .then(data => this.setState({ rouletteHistory: data }));
  }

  render() {
    const { rouletteHistory } = this.state;

    if (!rouletteHistory) {
      return (
        <Spinner/>
      );
    }

    let listHistory = rouletteHistory.map((item, index) => {
      const stars = Array(Math.ceil(Number(item.rating))).fill().map((empty, index) => {
        if (Number(item.rating) - index === 0.5) {
          return <i className='fas fa-star-half rated' key={index}></i>;
        } else {
          return <i className='fas fa-star rated' key={index}></i>;
        }
      });

      return (
          <Container className='primary-font' key={index}>
            <Row className='border-top border-bottom border-danger py-3' key={item.restaurantName}>
              <Column key={item.imageUrl}>
                <img className='rounded float-left img-thumbnail' src={item.imageUrl} alt="restaurant preview"/>
              </Column>
              <Column key={item.restaurantName}>
                <h3 className='primary-color'>{item.restaurantName}</h3>
                <div>{stars}</div>
                <p className='primary-color mb-0'>{`${item.totalReviews} Reviews`}</p>
                <p className='mb-0'>{item.address}</p>
                <p className='text-muted mb-0' style={{ fontSize: '.9rem' }}>{item.categories}</p>
              </Column>
            </Row>
          </Container>
      );
    });

    let noHistory;

    if (listHistory.length === 0) {
      listHistory = 'No history to show. Let\'s eat soon!';
      noHistory = 'primary-color-font text-center';
    }

    return (
      <>
        <h1 className='primary-color-font text-center'>Roulette History</h1>
        <ul className={`mb-5 pl-0 ${noHistory} flex-column-reverse`} >{listHistory.reverse()}</ul>
      </>
    );
  }
}
