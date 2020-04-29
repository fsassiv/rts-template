import React,{useEffect} from 'react';
import './App.scss';

const App = () => {
    useEffset(()=>{
      console.log("Hello")
    },[]);
  return(<div>Hello world</div>)};

export default App;
