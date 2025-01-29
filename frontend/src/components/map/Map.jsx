import React from 'react';
import {
    APIProvider,
    Map
} from '@vis.gl/react-google-maps';
import PointMarkers from './PointMarkers.jsx'; 
import { useDataContext } from '../../store/context.jsx'; 

const GMap = () => {
    const apikey = process.env.REACT_APP_MAP_API_KEY;

    const { data } = useDataContext();

    console.log(apikey);

    return (
        <div style={{ width: '800px', height: '300px', margin:'100px'}}>
           <APIProvider apiKey={apikey} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
                defaultZoom={9}
                defaultCenter={{ lat: 43.6529, lng: -79.3849 }}
                onCameraChanged={ev =>
                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }
                mapId='da37f3254c6a6d1c'
            >
                <PointMarkers  data={data} />
            </Map>
          </APIProvider>
        </div>
    )
}

export default GMap;
