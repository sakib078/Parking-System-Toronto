
import {
    APIProvider,
    Map,
    // useMap,
    // AdvancedMarker,
    // MapCameraChangedEvent,
    // Pin
} from '@vis.gl/react-google-maps';


const GMap = () => {

    const apikey = process.env.REACT_APP_MAP_API_KEY;

    console.log(apikey)

    return (
        <div style={{ width: '800px', height: '300px' }}>
           <APIProvider apiKey={apikey} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
                defaultZoom={12}
                defaultCenter={{ lat: 43.6529, lng: -79.3849 }}
                onCameraChanged={ev =>
                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }
                mapId='da37f3254c6a6d1c'
            >
            </Map>
          </APIProvider>
        </div>
    )
}

export default GMap;