import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function NavBar(props) {
  return (
    <Nav className="nav nav-bar fixed-bottom d-flex justify-content-around text-white pt-2"
    style={{
      height: '7%'
    }}>
      <div>
        <a href={''} className="fas fa-home text-white home-icon ml-1"></a>
        <p className="nav-bar-text nav-bar-text-home">Home</p>
      </div>
      <div>
        <a className="fas fa-heart text-white ml-3 heart-icon"></a>
        <p className="nav-bar-text">Favorites</p>
      </div>
      <div>
        <a className="fas fa-bookmark text-white ml-4 bookmark-icon"></a>
        <p className="nav-bar-text">Bookmarks</p>
      </div>
      <div>
        <a className="fas fa-history text-white ml-2 history-icon"></a>
        <p className="nav-bar-text">History</p>
      </div>
    </Nav>
  );
}
