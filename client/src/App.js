import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const [response, setResponse] = useState('');
  const [post, setPost] = useState('');
  const [responseToPost, setResponseToPost] = useState('');

  useEffect(() => {
    const callApi = async () => {
      const response = await fetch('/api/hello');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      setResponse(body.express);
    };
    callApi();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post })
    });
    const body = await response.text();

    setResponseToPost(body);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{response}</p>
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input type="text" value={post} onChange={e => setPost(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <p>{responseToPost}</p>
    </div>
  );
}
