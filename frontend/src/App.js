import React, { useState } from 'react';
import axios from 'axios';
import SwirlBackground from './SwirlBackground';
import './App.css'; 

function App() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState('');

  const handleInputChange = (event) => {
    console.log("Input change detected:", event.target.value); // Log when input changes
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with keyword:", keyword); // Log the keyword on form submission

    axios.post('https://sentimentscanner-c0bbd127ef8e.herokuapp.com/analyze', { keyword })
      .then(response => {
        console.log("Response received:", response); // Log the full response from the server
        setResults(response.data.reddit_df);
      })
      .catch(error => {
        console.error('There was an error!', error); // Log any errors during the request
      });
  };

  return (
    <div className="App">
      <SwirlBackground />
      <header className="App-header">
        <h1>SentimentScanner</h1>
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            value={keyword}
            onChange={handleInputChange}
            placeholder="Enter Text Here"
            className="input-box"
            rows="1"
            onInput={(e) => {
              console.log("Adjusting textarea height"); // Log when the textarea height adjusts
              e.target.style.height = 'auto'; // Reset the height
              e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scroll height
            }}
          />
          <button type="submit" className="submit-button">Analyze</button>
        </form>
        <div className="results" dangerouslySetInnerHTML={{ __html: results }} />
      </header>
    </div>
  );
}

export default App;
