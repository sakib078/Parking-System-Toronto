import React, { useState, useEffect } from 'react';
import {
    APIProvider,
    Map,
    MapControl,
    ControlPosition,
    AdvancedMarker
} from '@vis.gl/react-google-maps';
import PointMarkers from './PointMarkers.jsx';
import PlaceAutocomplete from './PlaceAutocomplete.jsx';
import { Nearestspot } from '../../services/api.js';
import { useDataContext } from '../../store/context.jsx';

const GMap = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [nearestLocs, setnearestLocs] = useState([]);
    const { data } = useDataContext();

    const apikey = process.env.REACT_APP_MAP_API_KEY;


    const handlePlaceSelect = (place) => {
        if (place.geometry?.location) {
            setSelectedPlace({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                name: place.name,
                address: place.formatted_address
            });
        }
    };

    console.log(selectedPlace);

    useEffect(() => {
            if (selectedPlace) {
                Nearestspot(selectedPlace.lat, selectedPlace.lng)
                    .then(results => {
                        setnearestLocs(results);
                    })
                    .catch(error => {
                        console.error('Error fetching suggested names:', error);
                    });
            } else {
                console.error('place is not selected');
            }
        }, [selectedPlace]);

        console.log('nearest',nearestLocs);

    return (
        <div style={{ width: '800px', height: '300px', margin: '100px' }}>
            <APIProvider apiKey={apikey} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultZoom={9}
                    defaultCenter={{ lat: 43.6529, lng: -79.3849 }}
                    mapId='da37f3254c6a6d1c'
                >
                    {nearestLocs && (
                        nearestLocs.map( nl => {

                            return (
                                <AdvancedMarker 
                                position={{ lat: nl.latitude, lng: nl.longitude }}
                                title={selectedPlace.name}
                            />
                            )
                        })
                    )}
                    <PointMarkers data={data} />
                </Map>
                
                <MapControl position={ControlPosition.TOP}>
                    <div className="autocomplete-control" style={{ margin: '10px' }}>
                        <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
                    </div>
                </MapControl>
            </APIProvider>
        </div>
    );
};

export default GMap;
