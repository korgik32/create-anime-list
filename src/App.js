import React, { useRef, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import List from './components/List/List';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Instruction from './components/Instruction/Instruction';



function App() {

  return (

    <div onDrop={(event) => (event.preventDefault())} className='App'>

      <div className='wrapper'>
        <Header />
        {/* <Instruction /> */}
        <List />
        <Footer />
      </div>
    </div>

  );
}

export default App;
