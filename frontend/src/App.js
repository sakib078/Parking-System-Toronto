import React from 'react';
import './App.css';
import Header from './components/layout/Header.jsx';
import Main from './components/layout/Main.jsx';
import { DataContextProvider } from './store/context.jsx';  // Adjust the import path as needed



function App() {
  return (
    <DataContextProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Main />
      </div>
    </DataContextProvider>
  );
}

export default App;
