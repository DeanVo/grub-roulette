import React from 'react';
import Home from './pages/home';
import NavBar from './pages/nav-bar';

export default class App extends React.Component {
  render() {
    return <>
    <Home/><NavBar/>
    </>;
  }
}
