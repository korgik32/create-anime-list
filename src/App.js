import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import List from './components/List/List';



function App() {
  return (
    <div className='App'>

      <div className='wrapper'>
        <Header />
        <List />
      </div>
    </div>
  );
}

export default App;
