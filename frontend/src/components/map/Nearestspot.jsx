import React, { useEffect, useState } from "react";
import { useDataContext } from "../../store/context";
import { getspots } from "../../services/api";
import { Car, Accessibility, Navigation2 } from 'lucide-react';

export default function Nearestspot() {
    const [fspots, setfspots] = useState([]);
    const { nearestLocs } = useDataContext();

    useEffect(() => {
        if (!nearestLocs || nearestLocs.length === 0) {
            console.log("nearestLocs not filled yet");
            return;
        }

        getspots()
            .then(allspots => {
                const nearestIDMap = nearestLocs.reduce((acc, n) => {
                    acc[n._id] = n.distance;
                    return acc;
                }, {});

                const filteredSpot = allspots
                    .filter(spot => nearestIDMap[spot._id] !== undefined)
                    .map(spot => ({ ...spot, distance: nearestIDMap[spot._id] }));

                setfspots(filteredSpot);
            })
            .catch(error => {
                console.error("did not get the all spots", error);
            });
    }, [nearestLocs]);

    const handleGetDirections = (coordinates) => {
        // Implement direction functionality here
        console.log("Get directions for:", coordinates);
    };

    return (
        <div className="grid grid-cols-1 gap-4 mt-8">
            {fspots.map((spot) => (
                <div key={spot._id} className="bg-white rounded-lg  p-4 mb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">{spot.name}</h3>
                            <p className="text-gray-600 text-sm">Asset ID: {spot.assetId}</p>
                        </div>
                        <div className="flex gap-2">
                            <Car className="text-blue-600" size={20} />
                            {spot.handicapSpaces > 0 && <Accessibility className="text-green-600" size={20} />}
                        </div>
                    </div>
                    
                    <div className="mt-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total Spaces:</span>
                            <span className="font-semibold">{spot.totalSpaces}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Regular Spaces:</span>
                            <span className="font-semibold">{spot.regularSpaces}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Handicap Spaces:</span>
                            <span className="font-semibold">{spot.handicapSpaces}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Distance:</span>
                            <span className="font-semibold">{spot.distance.toFixed(2)} km</span>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={() => handleGetDirections(spot.coordinates)}
                            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Navigation2 size={16} />
                            Get Directions
                        </button>
                    </div>

                    <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {spot.access}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
