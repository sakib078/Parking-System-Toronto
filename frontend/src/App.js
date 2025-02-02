import React from 'react';
import './App.css';
import Search from './components/parking/search';
import Nearestspot from './components/map/Nearestspot.jsx';
import GMap from './components/map/Map.jsx';
import { DataContextProvider } from './store/context.jsx';  // Adjust the import path as needed

function App() {
  return (
    <DataContextProvider>
      <div className="App">
        <div className="App-header">
          <GMap />
          <Search />
          <Nearestspot />
        </div>
      </div>
    </DataContextProvider>
  );
}

export default App;
