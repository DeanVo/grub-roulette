import React from 'react';

export default class Spinner extends React.Component {

  render() {
    return (
  <div className="spinner spinner-border text-danger" role="status" style={{
    width: '5rem',
    height: '5rem'
  }}>
  </div>
    );
  }
}
