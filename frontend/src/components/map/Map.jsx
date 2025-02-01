import React, {useState } from 'react';
import {
    APIProvider,
    Map,
    MapControl,
    useAdvancedMarkerRef,
    ControlPosition,
    AdvancedMarker
} from '@vis.gl/react-google-maps';
import PointMarkers from './PointMarkers.jsx';
import PlaceAutocomplete from './PlaceAutocomplete.jsx';
import MapHandler from './MapHandler.jsx';
import { useDataContext } from '../../store/context.jsx';

const GMap = () => {

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();

    const apikey = process.env.REACT_APP_MAP_API_KEY;

    const { data } = useDataContext();

    console.log(apikey);

    return (
        
        <div style={{ width: '800px', height: '300px', margin: '100px' }}>
            <APIProvider apiKey={apikey} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultZoom={9}
                    defaultCenter={{ lat: 43.6529, lng: -79.3849 }}
                    onCameraChanged={ev =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }
                    mapId='da37f3254c6a6d1c'
                >
                     <AdvancedMarker ref={markerRef} position={null} />
                    <PointMarkers data={data} />
                </Map>
                <MapControl position={ControlPosition.TOP}>
                    <div className="autocomplete-control">
                        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                    </div>
                </MapControl>
                <MapHandler place={selectedPlace} marker={marker} />
            </APIProvider>
        </div>
    )
}

export default GMap;
