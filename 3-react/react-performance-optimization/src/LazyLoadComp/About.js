import React, { useState } from 'react';

const About = () => {
  const [name] = useState('About')
  return (
    <>
      {name}
    </>
  );
};

export default About;