import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function NavBar(props) {
  return (
    <Nav className="nav nav-bar fixed-bottom d-flex justify-content-around text-white pt-2 pb-5"
    style={{
      height: '60px'
    }}>
      <div>
        <a href={''} className="fas fa-home text-center text-white home-icon">
          <p className="mt-1 icon-text primary-font">Home</p>
        </a>
      </div>
      <div>
        <a href={'#history'} className="fas fa-history text-center text-white history-icon">
          <p className='mt-1 icon-text primary-font'>History</p>
        </a>
      </div>
    </Nav>
  );
}
