import {
    AdvancedMarker,
    Pin
} from '@vis.gl/react-google-maps';

export default function PointMarkers({ data}) {


    return (
        <>
            {
                data.map(item => (
                    <AdvancedMarker
                        key={item._id}
                        position={{ lat: item.latitude, lng: item.longitude }}
                    >
                        <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                    </AdvancedMarker>
                ))
            }
        </>
    )

}