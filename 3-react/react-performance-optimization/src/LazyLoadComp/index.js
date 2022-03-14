import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';

const About = lazy(() => import(/* webpackChunkName: "aboutya" */ './About'));

const Comp = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route 
          path="/about" 
          element={
            <Suspense fallback={<div>loading ...</div>}>
              <About/>
            </Suspense>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Comp;