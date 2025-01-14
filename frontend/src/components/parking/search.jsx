import React, { useState } from 'react';
import { getName } from '../../services/api';

function Search() {
    const [value, setValue] = useState();
    const [data , setdata] = useState([]);

    function getValue(inputValue) {
        setValue(inputValue);
    }

    
    function sendtheValue  () {

        if (value) {

            getName(value).then(data => {
                console.log(data);
                if (data !== undefined && data !== null) {
                    setdata(data);
                } else {
                    console.error('Received undefined or null data');
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        } else {
            console.error('did not get the name');
        }
    }

    return (
        <>
        <h1> Search for the spots here </h1>
        <div className="search-box">
            <input
                type="text"
                placeholder="enter your location"
                onChange={(event) => getValue(event.target.value)}
            />
        </div>
        <button className="button" onClick={sendtheValue}> FIND </button>
        {
            data && 
            (
                data.map( item => {

                    return (
                        <div key={item._id}>
                            <p>ID: {item._id}</p>
                            <p>Latitude: {item.latitude}</p>
                            <p>Longitude: {item.longitude}</p>
                        </div>
                    )
                })

            )
        }
    </>
    );
}

export default Search;