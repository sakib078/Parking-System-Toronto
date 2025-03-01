
import Nearestspot from '../map/Nearestspot.jsx';
import GMap from '../map/Map.jsx';


export default function Main() {

    return (

        <>
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex gap-6">
                    <div className="w-2/3 h-[calc(100vh-12rem)]">
                        <GMap />
                    </div>
                    <div className="w-96 overflow-y-auto h-[calc(100vh-12rem)]">
                        <h2 className="text-lg font-semibold mb-4 text-pretty text-center">Available Parking Spots</h2>
                        <Nearestspot />
                    </div>
                </div>
            </main>
        </>

    )
}