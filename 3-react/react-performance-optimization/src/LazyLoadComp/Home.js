import React, { useState } from 'react';

const Home = () => {
  const [name] = useState('Home')
  return (
    <>
      {name}
    </>
  );
};

export default Home;