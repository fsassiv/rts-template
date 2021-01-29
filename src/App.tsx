import '@styles/index.scss';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('Sinner');
  }, []);

  return <div className="test">Hello world {value}</div>;
};

export default App;
