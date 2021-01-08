import React from 'react';
import parseRoute from './lib/parse-route';
import Home from './pages/home';
import Restaurant from './pages/restaurant-page';
import History from './pages/history';
import NavBar from './pages/nav-bar';
import TopBar from './pages/top-bar';
import HomeBody from './pages/home-body';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      userLat: null,
      userLong: null
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLat: position.coords.latitude,
        userLong: position.coords.longitude
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <>
        <Home /><HomeBody handler={this.state.route} lat={this.state.userLat} lng={this.state.userLong}/>
      </>;
    }
    if (route.path === '#restaurants') {
      return <><TopBar /><Restaurant lat={this.state.userLat} lng={this.state.userLong}/></>;
    }

    if (route.path === '#history') {
      return <History/>;
    }
  }

  render() {

    return (
    <>
      {this.renderPage()}
      <NavBar/>
    </>
    );
  }
}
