import React from 'react';
import Home from './pages/home';
import NavBar from './pages/nav-bar';
import HomeBody from './pages/home-body';

export default class App extends React.Component {
  render() {
    return <>
    <Home/><HomeBody/><NavBar/>
    </>;
  }
}
