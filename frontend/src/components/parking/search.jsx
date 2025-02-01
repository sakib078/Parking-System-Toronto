import React, { useState, useEffect } from 'react';
import { getrelavantNames } from '../../services/api';
import { useDataContext } from '../../store/context.jsx';  

function Search() {            
    
    const [value, setValue] = useState('');
    const [suggestedNames, setSuggestedNames] = useState([]);
    const { data, handleSearch } = useDataContext();


    useEffect(() => {
        if (value) {
            getrelavantNames(value)
                .then(names => {
                    setSuggestedNames(names);
                })
                .catch(error => {
                    console.error('Error fetching suggested names:', error);
                });
        } else {
            setSuggestedNames([]);
        }
    }, [value]);

    function handleInputChange(inputValue) {
        setValue(inputValue);
    }

    return (
        <>
            <h1>Search for the spots here</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter your location"
                    value={value}
                    onChange={(event) => handleInputChange(event.target.value)}
                />
                {suggestedNames.length > 0 && (
                    <ul>
                        {suggestedNames.map((name, index) => (
                            <li key={index} onClick={() => setValue(name)}>{name}</li>
                        ))}
                    </ul>
                )}
            </div>
            <button className="button" onClick={() => handleSearch(value)}>FIND</button>
            {data.length > 0 && (
                data.map(item => (
                    <div key={item._id}>
                        <p>ID: {item._id}</p>
                        <p>Latitude: {item.latitude}</p>
                        <p>Longitude: {item.longitude}</p>
                    </div>
                ))
            )}
        </>
    );
}

export default Search;
