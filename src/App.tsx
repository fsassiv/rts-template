import React, { useEffect } from 'react';
import './App.scss';

const App = () => {
  useEffect(() => {
    console.log('Hello');
  }, []);

  return <div>Hello world</div>;
};

export default App;
