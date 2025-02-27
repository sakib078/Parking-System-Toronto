import React, { useState, useEffect } from 'react';
import { getrelavantNames } from '../../services/api';
import { useDataContext } from '../../store/context.jsx';
import { SearchIcon } from 'lucide-react';


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
            <div className="relative w-full max-w-2xl">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Enter your location"
                        value={value}
                        onChange={(event) => handleInputChange(event.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                {suggestedNames.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200">
                        {suggestedNames.map((name, index) => (
                            <li
                                key={index}
                                onClick={() => setValue(name)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button className="button mt-2" onClick={() => handleSearch(value)}>FIND</button>
            {data.length > 0 && (
                data.map(item => (
                    <div key={item._id} className="mt-4">
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
