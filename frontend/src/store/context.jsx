import React, { createContext, useContext, useState } from "react";
import { getCoordinates } from '../services/api.js'; 

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}

export function DataContextProvider({ children }) {
  const [data, setData] = useState([]);

  function handleSearch(value) {
    if (value) {
      getCoordinates(value)
        .then(data => {
          if (data) {
            setData(data);
          } else {
            console.error('Received undefined or null data');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.error('No search value provided');
    }
  }

  return (
    <DataContext.Provider value={{ data, handleSearch }}>
      {children}
    </DataContext.Provider>
  );
}
