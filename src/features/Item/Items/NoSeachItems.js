import React from 'react';

const NoSearchItems = () => (
  <div
    style={{
      fontSize: '1.2rem',
      textAlign: 'center',
      padding: '2rem',
      maxWidth: '1100px',
    }}
  >
    <img height={200} src="/img/noitems.png" />
    <br />
    Please try again
  </div>
);

export default NoSearchItems;
