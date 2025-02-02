// parkingController.js

import parkingSpots from '../models/ParkingSpot.js';
import nearestSpot from '../utils/nearestSpots.js';

// Get all parking spots
export const getSpots = async (req, res) => {

    try {
        await parkingSpots.find().then(spots => {
            res.status(200).json({ spots: spots });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch parking spots' });
    }
};


export const searchNames = async (req, res) => {
    try {
        const { query } = req.params;
        
        // Create a case-insensitive regex that matches names starting with the query
        const regex = new RegExp(`^${query}`, 'i');

        const names = await parkingSpots.find({ name: regex })
            .select("name")
            .limit(20)
            .lean();

        const uniqueNames = [...new Set(names.map(spot => spot.name))];

        res.status(200).json({ names: uniqueNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch parking names' });
    }
};




// Search for parking spots based on criteria
export const searchSpots = async (req, res) => {
    // Implementation for searching parking spots based on given criteria

    const name = req.params.name;

    console.log(name);

    try {
        // let loc_array = {};

        await parkingSpots.where('name').equals(name).select("latitude longitude").then(location => {

            if (location === null) {
                const error = new Error('Could not fetch coordinates');
                error.statusCode = 422;
                throw error;
            }

            // for( const  cr of coordinates){
            //     loc_array.push(cr);
            // }

            console.log(location);

            res.status(200).json({ coordinates: location });

        })
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        console.log(error);
    }

};

export const nearestSpots = async (req, res) => {
    
    let coordinates = [43.750770, -79.258082];
    
    try {
        await parkingSpots.find().select('latitude longitude').then(spots => {
            const results = nearestSpot(coordinates, spots);

            if(results) {
                res.status(200).json({ results: results });
            }

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch parking spots' });
    }

}


// // Get a specific parking spot by ID
// export const getSpotById = async (req, res) => {

//     const id = req.params.id;
//     try {
//         await parkingSpots.findById(id).then(spotbyId => {

//             if (!spotbyId) {
//                 const error = new Error('could not find the spot');
//                 error.statusCode = 422;
//                 throw error;
//             }
//             res.status(200).json({ spotbyId: spotbyId });
//         })
//     }
//     catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         console.log(error);
//     }
// };

// Book a parking spot
export const bookSpot = (req, res) => {
    // Implementation for booking a parking spot
};

// Release a parking spot
export const releaseSpot = (req, res) => {
    // Implementation for releasing a parking spot
};

// // Create a new parking spot
// export const addSpot = (req, res) => {
//     // Implementation for creating a new parking spot
// };




// // Update an existing parking spot's information
// export const updateSpot = (req, res) => {
//     // Implementation for updating an existing parking spot
// };

// // Delete a parking spot
// export const deleteSpot = (req, res) => {
//     // Implementation for deleting a parking spot
// };

