import React, { useState, useEffect, useRef } from 'react';
import { getrelavantNames } from '../../services/api';
import { useDataContext } from '../../store/context.jsx';
import { SearchIcon } from 'lucide-react';
import { StandaloneSearchBox } from '@react-google-maps/api';

function Search({ onPlaceSelect }) {
    const [value, setValue] = useState('');
    const [parkNameSuggestions, setParkNameSuggestions] = useState([]);
    const { data, handleSearch } = useDataContext();
    const inputRef = useRef(null);
    const [searchBox, setSearchBox] = useState(null);

    const options = {
        fields: ["geometry", "name", "formatted_address"],
        types: ["establishment", "geocode"],
        componentRestrictions: { country: "CA" },
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(43.58, -79.64), // Southwest corner of Toronto
          new google.maps.LatLng(43.86, -79.12)  // Northeast corner of Toronto
        ),
        strictBounds: true
      };

    useEffect(() => {
        if (value) {
            getrelavantNames(value)
                .then(names => {
                    setParkNameSuggestions(names);
                })
                .catch(error => {
                    console.error('Error fetching suggested names:', error);
                });
        } else {
            setParkNameSuggestions([]);
        }
    }, [value]);

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setValue(suggestion);
        handleSearch(suggestion);
    };

    const onLoad = (ref) => {
        setSearchBox(ref);
    };

    const onPlacesChanged = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places.length > 0) {
                const place = places[0];
                setValue(place.formatted_address || '');
                onPlaceSelect(place);
            }
        }
    };

    return (
        <div className="relative w-full max-w-2xl">
            <StandaloneSearchBox
                onLoad={onLoad}
                onPlacesChanged={onPlacesChanged}
                options={options}
            >
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Enter your location or park name"
                        value={value}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ref={inputRef}
                    />
                </div>
            </StandaloneSearchBox>
            {(parkNameSuggestions.length > 0) && (
                <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200">
                    {parkNameSuggestions.map((name, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(name)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <span className="text-blue-500">[Park Name]</span> {name}
                        </li>
                    ))}
                </ul>
            )}
            {/* <button className="button mt-2" onClick={() => handleSearch(value)}>FIND</button> */}
        </div>
    );
}

export default Search;

