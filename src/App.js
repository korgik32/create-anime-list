import React, { useRef, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import List from './components/List/List';
import Instruction from './components/Instruction/Instruction';
import {Routes,Route} from "react-router-dom"


function App() {

  return (

    <div onDrop={(event) => (event.preventDefault())} className='App'>

      <div className='wrapper'>
        <Header />
        <Routes>
          <Route path='/' element={<List />}/>
          <Route path='/instruction' element={<Instruction />}/>
          <Route path='*' element={<center>Not found</center>}/>
        </Routes>
        <Footer />
      </div>
    </div>

  );
}

export default App;
