import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default function NavBar(props) {
  return (
    <Nav className="nav-bar">
      <Nav.Item>
        <Nav.Link className="fas fa-home home-icon"></Nav.Link>
        <p className="nav-bar-text nav-bar-text-home">Home</p>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="fas fa-heart heart-icon"></Nav.Link>
        <p className="nav-bar-text">Favorites</p>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="fas fa-bookmark bookmark-icon"></Nav.Link>
        <p className="nav-bar-text">Bookmarks</p>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="fas fa-history history-icon"></Nav.Link>
        <p className="nav-bar-text">History</p>
      </Nav.Item>
    </Nav>
  );
}

// https://react-bootstrap.github.io/components/navs/
/* <Nav className="justify-content-end" activeKey="/home">
  <Nav.Item>
    <Nav.Link href="/home">Active</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1">Link</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-2">Link</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="disabled" disabled>
      Disabled
      </Nav.Link>
  </Nav.Item>
</Nav> */
