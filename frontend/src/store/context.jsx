import React, { createContext, useContext, useState } from "react";
import { getCoordinates, Nearestspot } from '../services/api.js';

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}


export function DataContextProvider({ children }) {

  const [data, setData] = useState([]);
  const [nearestLocs, setnearestLocs] = useState([]);

  const value = {
    data,
    nearestLocs,
    handleSearch,
    Nearestspots
  }

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

  function Nearestspots(selectedPlace) {
     
      Nearestspot(selectedPlace.lat, selectedPlace.lng)
        .then( places => {
           if(places) {
              setnearestLocs(places)
           }
           else {
             console.error('Receives undefined or null value');
           }
        }).catch(error => {
           console.error('Error fetching nearest places: ', error);
        })
     }


  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
