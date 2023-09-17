import React from 'react';
import './App.css';
import Songsphere from './songsphere'; // Corrected import

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SongSphere</h1>
      </header>
      <main>
        <Songsphere /> {/* Corrected component rendering */}
      </main>
    </div>
  );
}

export default App;
