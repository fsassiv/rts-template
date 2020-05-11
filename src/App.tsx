import React, { useEffect, useState } from 'react';
import './App.scss';

const App = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log('Mounted again');
    setValue('Sinner');
  }, []);

  return <div>Hello world {value}</div>;
};

export default App;
