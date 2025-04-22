import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [newQuery, setNewQuery] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [addStatus, setAddStatus] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:3000/query?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.response) {
        setResponse(data.response);
      } else {
        setResponse('No matching response found.');
      }
    } catch (error) {
      setResponse('Error fetching response.');
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: newQuery, response: newResponse })
      });

      const data = await res.json();
      if (data.success) {
        setAddStatus('Response added successfully!');
        setNewQuery('');
        setNewResponse('');
      } else {
        setAddStatus('Failed to add response.');
      }
    } catch (error) {
      setAddStatus('Error adding response.');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Response Generator</h1>
      </header>

      <div className="container">
        <input
          type="text"
          placeholder="Enter your query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <div className="result">
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      </div>

      <div className="container">
        <h2>Add New Response</h2>
        <input
          type="text"
          placeholder="Query"
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
        />
        <textarea
          placeholder="Response"
          value={newResponse}
          onChange={(e) => setNewResponse(e.target.value)}
        ></textarea>
        <button onClick={handleAdd}>Add</button>
        <p>{addStatus}</p>
      </div>
    </div>
  );
}

export default App;
import ReactDOM from 'react-dom/client';
import React from 'react';  