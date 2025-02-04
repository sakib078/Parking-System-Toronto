import { useEffect, useState } from "react"

import { useDataContext } from "../../store/context";

import { getspots } from "../../services/api";


export default function Nearestspot() {

    const [fspots, setfspots] = useState([]);

    const { nearestLocs } = useDataContext();

    useEffect(() => {
        
        if (!nearestLocs  || nearestLocs.length === 0) {
            console.log("nearestLocs not filled yet");
            return ;
        }
        else {

            getspots()
              .then(allspots => {
                console.log(allspots);

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
        }

    }, [nearestLocs]);

    console.log('nearest', nearestLocs);
    console.log('Spots', fspots);
    return (
        <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop : '100px'
      }}
    >
      {fspots.map((spot) => (
        <div
          key={spot._id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '1rem',
            background: '#f9f9f9',
          }}
        >
          <h2 style={{ margin: '0 0 10px 0' }}>{spot.name}</h2>
          <p>
            <strong>Asset ID:</strong> {spot.assetId}
          </p>
          <p>
            <strong>Total Spaces:</strong> {spot.totalSpaces}
          </p>
          <p>
            <strong>Regular Spaces:</strong> {spot.regularSpaces}
          </p>
          <p>
            <strong>handicapSpaces:</strong> {spot.handicapSpaces}
          </p>
          <p>
            <strong>Distance:</strong> {spot.distance}
          </p>
          <p>
            <strong>Access:</strong> {spot.access}
          </p>
        </div>
      ))}
    </div>
    )
}