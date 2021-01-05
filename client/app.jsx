import React from 'react';
import parseRoute from './lib/parse-route';
import Home from './pages/home';
import Randomize from './pages/randomize';
import Restaurant from './pages/restaurant-page';
import History from './pages/history';
import NavBar from './pages/nav-bar';
import TopBar from './pages/top-bar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <>
      <Home/><Randomize/>
      </>;
    }
    if (route.path === '#restaurants') {
      return <><TopBar/><Restaurant/></>;
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
