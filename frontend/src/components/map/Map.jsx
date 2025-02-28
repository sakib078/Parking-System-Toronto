
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
    const { data, Nearestspots, nearestLocs } = useDataContext();

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

    useEffect(() => {
        if (selectedPlace) {
            Nearestspots(selectedPlace);
        } else {
            console.error('place is not selected');
        }
    }, [selectedPlace, Nearestspots]);

    return (
            <APIProvider apiKey={apikey} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultZoom={14}
                    defaultCenter={{ lat: 43.6529, lng: -79.3849 }}
                    mapId='da37f3254c6a6d1c'
                    mapContainerClassName="w-full h-full rounded-lg"
                    options={{
                        disableDefaultUI: false,
                        zoomControl: true,
                        styles: [
                            {
                                featureType: 'poi.business',
                                stylers: [{ visibility: 'off' }],
                            },
                        ],
                    }}
                >
                    {nearestLocs && nearestLocs.map((nl, index) => (
                        <AdvancedMarker
                            key={index}
                            position={{ lat: nl.latitude, lng: nl.longitude }}
                            title={nl.name || 'Parking Spot'}
                            icon={{
                                url: 'https://maps.google.com/mapfiles/ms/icons/parking.png',
                            }}
                        />
                    ))}
                    <PointMarkers data={data} />
                    <MapControl position={ControlPosition.TOP_LEFT}>
                        {/* <div className="autocomplete-control" style={{ margin: '10px' }}>
                            <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
                        </div> */}
                    </MapControl>
                </Map>
            </APIProvider>
    );
};

export default GMap;
