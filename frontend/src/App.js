import React from 'react';
import './App.css';
import Header from './components/layout/Header.jsx';
import Main from './components/layout/Main.jsx';
import { DataContextProvider } from './store/context.jsx';  // Adjust the import path as needed
import { LoadScript } from '@react-google-maps/api';



function App() {

  return (
    <DataContextProvider>
      <LoadScript
       googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}
       libraries={["places"]}
      > 
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Main />
      </div>
      </LoadScript>
    </DataContextProvider>
  );
}

export default App;
