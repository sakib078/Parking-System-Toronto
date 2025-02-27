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
import { useDataContext } from '../../store/context.jsx';

const GMap = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const { data , Nearestspots , nearestLocs } = useDataContext();

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

                Nearestspots(selectedPlace)
    
            } else {
                console.error('place is not selected');
            }
        }, [selectedPlace, Nearestspots]);

    return (
        <div className='w-6/12  h-80 m-28'>
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
