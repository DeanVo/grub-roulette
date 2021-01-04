import React from 'react';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorited: false
    };
    this.favoriteToggle = this.favoriteToggle.bind(this);
  }

  favoriteToggle(e) {
    this.setState({ isFavorited: !this.state.isFavorited });
  }

  render() {
    let heartStatus;

    if (!this.state.isFavorited) {
      heartStatus = 'far fa-heart primary-color d-flex flex-row-reverse';
    } else {
      heartStatus = 'fas fa-heart primary-color d-flex flex-row-reverse';
    }

    return (
    <>
      <ul className="nav justify-content-end">
        <li className="nav-item mx-2 my-1">
          <i onClick={this.favoriteToggle} className={heartStatus} style={{ fontSize: '2.5rem' }}></i>
        </li>
        <li className="nav-item mx-2 my-1">
          <i className="far fa-bookmark primary-color" style={{ fontSize: '2.5rem' }}></i>
        </li>
      </ul>
    </>
    );
  }
}
