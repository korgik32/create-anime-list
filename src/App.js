import React, { useState } from 'react';
import './App.css';
import ListItem from './components/ListItem/ListItem';


function App() {
  const clickWatcher = (event) => {
  }
  return (
    <div onClick={clickWatcher} className='wrapper'>
      < ListItem />
    </div>
  );
}

export default App;
