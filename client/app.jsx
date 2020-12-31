import React from 'react';
import parseRoute from './lib/parse-route';
import Home from './pages/home';
import Randomize from './pages/randomize';
import Restaurant from './pages/restaurant-page';
import NavBar from './pages/nav-bar';

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
      return <Restaurant/>;
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
