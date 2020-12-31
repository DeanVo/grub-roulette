import React from 'react';

export default function Home(props) {
  return (
    <div className="header-container" style={{
      fontFamily: '\'Actor\', sans-serif',
      color: '#ff4b3a',
      textAlign: 'center'
    }}>
      <h1 className="mt-4 font-weight-bold">{'Grub Roulette'}</h1>
      <p style={{ fontSize: '1.5rem' }}>{"Let's find restaurants in your area"}</p>
    </div>
  );
}
