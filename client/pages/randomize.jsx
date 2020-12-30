import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default class Randomize extends React.Component {
  render() {
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
      <Container>
          <Row className='justify-content-center'>
          <Button href={'#restaurants'} className="btn btn-primary" style={rouletteButtons} onClick={this.handleRandomizer}>{'Let\'s eat!'}</Button>
        </Row>
      </Container>
    </>
    );
  }
}
