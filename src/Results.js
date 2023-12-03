import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const [ newSearch, setNewSearch ] = useState('')
  const handleChangeSearch = (event) =>{
	  setNewSearch(event.target.value)
	  
  }

const Results = () => {
	return(
		<div></div>
	)
}

function App() {
  return (
    <div className="App">
		<h2>Imatia Image Search</h2>
      <input type="text" value={newSearch} onChange={handleChangeSearch} />
	  <Results />
    </div>
  );
}

export default App;
