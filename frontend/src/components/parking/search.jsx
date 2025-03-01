import React, { useState, useEffect, useRef } from 'react';
import { getrelavantNames } from '../../services/api';
import { useDataContext } from '../../store/context.jsx';
import { SearchIcon, MapPin, Car, ChevronDown } from 'lucide-react';
import { StandaloneSearchBox } from '@react-google-maps/api';

function Search() {
    const [category, setCategory] = useState('location');
    const [value, setValue] = useState('');
    const [parkNameSuggestions, setParkNameSuggestions] = useState([]);
    const { handleSearch, Nearestspots, setSelectedPlace } = useDataContext();
    const inputRef = useRef(null);
    const [searchBox, setSearchBox] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const options = {
        fields: ["geometry", "name", "formatted_address"],
        types: ["establishment", "geocode"],
        componentRestrictions: { country: "CA" },
        bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(43.58, -79.64),
            new google.maps.LatLng(43.86, -79.12)
        ),
        strictBounds: true
    };

    useEffect(() => {
        if (category === 'parking' && value) {
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
    }, [value, category]);

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
        if (searchBox && category === 'location') {
            const places = searchBox.getPlaces();
            if (places.length > 0) {
                const place = places[0];
                setValue(place.formatted_address || '');
                handlePlaceSelect(place);
            }
        }
    };

    const handlePlaceSelect = (place) => {
        if (place.geometry?.location) {
            const selectedPlace = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                name: place.name,
                address: place.formatted_address
            };

            Nearestspots(selectedPlace);
            setSelectedPlace(selectedPlace);
        }
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setValue('');
        setParkNameSuggestions([]);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative">
            <div className="flex items-center bg-white rounded-full shadow-md">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-center px-4 py-2 text-gray-700 bg-gray-100 rounded-l-full hover:bg-gray-200 focus:outline-none"
                    >
                        {category === 'location' ? <MapPin size={18} /> : <Car size={18} />}
                        <ChevronDown size={18} className="ml-2" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                            <button
                                onClick={() => handleCategoryChange('location')}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                            >
                                <MapPin className="mr-2" size={18} /> Location
                            </button>
                            <button
                                onClick={() => handleCategoryChange('parking')}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                            >
                                <Car className="mr-2" size={18} /> Parking Spot
                            </button>
                        </div>
                    )}
                </div>
                {category === 'location' ? (
                    <StandaloneSearchBox
                        onLoad={onLoad}
                        onPlacesChanged={onPlacesChanged}
                        options={options}
                    >
                        <input
                            type="text"
                            placeholder={category === 'location' ? "Search location..." : "Search parking..."}
                            value={value}
                            onChange={handleInputChange}
                            className="w-64 px-4 py-2 rounded-r-full focus:outline-none"
                            ref={inputRef}
                        />
                    </StandaloneSearchBox>
                ) : (
                    <input
                        type="text"
                        placeholder="Search parking..."
                        value={value}
                        onChange={handleInputChange}
                        className="w-64 px-4 py-2 rounded-r-full focus:outline-none"
                    />
                )}
                <button className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none">
                    <SearchIcon size={18} />
                </button>
            </div>

            {category === 'parking' && parkNameSuggestions.length > 0 && (
                <ul className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                    {parkNameSuggestions.map((name, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(name)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <Car className="inline-block mr-2 text-blue-500" size={16} />
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Search;


// searching design idea

/*
<div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-center mb-2">Find Your Perfect Spot</h2>
                <p className="text-gray-600 text-center">Choose a category and start searching!</p>
            </div>
            
            <div className="flex mb-4">
                <button
                    onClick={() => handleCategoryChange('location')}
                    className={`flex-1 py-3 px-4 rounded-tl-lg rounded-bl-lg ${
                        category === 'location' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition duration-300 ease-in-out`}
                >
                    <MapPin className="inline-block mr-2" size={20} />
                    Location
                </button>
                <button
                    onClick={() => handleCategoryChange('parking')}
                    className={`flex-1 py-3 px-4 rounded-tr-lg rounded-br-lg ${
                        category === 'parking' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition duration-300 ease-in-out`}
                >
                    <Car className="inline-block mr-2" size={20} />
                    Parking Spot
                </button>
            </div>
            
            <div className="mb-4">
                {category === 'location' ? (
                    <p className="text-sm text-gray-600 mb-2">
                        Enter an address or landmark to find nearby parking spots.
                    </p>
                ) : (
                    <p className="text-sm text-gray-600 mb-2">
                        Enter a parking lot name or area to find specific parking spots.
                    </p>
                )}
            </div>

            {category === 'location' ? (
                <StandaloneSearchBox
                    onLoad={onLoad}
                    onPlacesChanged={onPlacesChanged}
                    options={options}
                >
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for a location..."
                            value={value}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            ref={inputRef}
                        />
                    </div>
                </StandaloneSearchBox>
            ) : (
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for parking spots..."
                        value={value}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            )}

            {category === 'parking' && parkNameSuggestions.length > 0 && (
                <ul className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto max-h-60">
                    {parkNameSuggestions.map((name, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(name)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out"
                        >
                            <Car className="inline-block mr-2 text-blue-500" size={16} />
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
*/
