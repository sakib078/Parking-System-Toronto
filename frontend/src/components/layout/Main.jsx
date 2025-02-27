
import  Nearestspot  from '../map/Nearestspot.jsx';
import GMap from '../map/Map.jsx';



export default function Main() {

    return (

        <>
            <div className="App">
                <div className="App-header">
                    <GMap />
                    <Nearestspot />
                </div>
            </div>
        </>

    )
}