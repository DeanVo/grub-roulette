import fetch from 'node-fetch';
import React from 'react';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorited: false,
      selectedRestaurant: null
    };
    this.favoriteToggle = this.favoriteToggle.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  favoriteToggle(e) {

    this.setState({ isFavorited: !this.state.isFavorited });

    fetch('/api/random/selected')
      .then(response => response.json())
      .then(data => this.setState({
        selectedRestaurant: data
      }));

    if (this.state.isFavorited === false) {
      this.addFavorite(this.selectedRestaurant);
    }

    if (this.state.isFavorited === true) {
      this.removeFavorite(this.state.selectedRestaurant.id);
    }

  }

  addFavorite(fav) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fav)
    };

    fetch('/api/random/favorite', requestOptions)
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  removeFavorite(fav) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`/api/random/favorite/${fav}`, requestOptions)
      .catch(err => console.error(err));
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
