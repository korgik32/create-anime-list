import React, { useState } from 'react';
import './App.css';
import ListItem from './components/ListItem/ListItem';


function App() {
  /*   let data
    async function get() {
      await fetch("https://kitsu.io/api/edge/anime?filter[text]=code geass", {
        headers: {
          "Accept": "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json"
        },
      })
        .then(response => response.json())
        .then(result => data = result)
      console.log(data.data[0].attributes.posterImage.original);
    }
  
    get() */

  return (
    <div className='wrapper'>
      < ListItem />
    </div>
  );
}

export default App;
