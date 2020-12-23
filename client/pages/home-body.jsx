import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';

export default function HomeBody(props) {
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

  return (
    <>
    <InputGroup className="mb-3 location-bar" style={searchBarStyle}>
      <FormControl
        placeholder="Search Location..."
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" style={searchButton}>Search</Button>
      </InputGroup.Append>
    </InputGroup>

    <Container>
      <Row className='search-btns'>
        <Button variant="outline-secondary" className='search-btns' style={searchBarStyle}>Primary</Button>{' '}
        <Button variant="outline-secondary" className='search-btns' style={searchBarStyle}>Primary</Button>{' '}
        <Button variant="outline-secondary" className='search-btns' style={searchBarStyle}>Primary</Button>{' '}
      </Row>
      <Row className='justify-content-center'>
    <img src="../../client/images/google-map-example.png" className='map'></img>
      </Row>
    </Container>

    <Container>
      <Row className='justify-content-center'>
        <Button variant="outline-secondary" style={rouletteButtons}>{'Let\'s eat!'}</Button>{' '}
        <Button variant="outline-secondary" style={rouletteButtons}>Filter by restaurants</Button>{' '}
      </Row>
    </Container>
    </>
  );
}
