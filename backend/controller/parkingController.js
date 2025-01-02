// parkingController.js

import parkingSpots from '../models/ParkingSpot.js';

// Get all parking spots
export const getSpots = async (req, res) => {

    try {
        await parkingSpots.find().then(spots => {
            res.status(200).json({spots : spots});
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch parking spots' });
    }
};

// Get a specific parking spot by ID
export const getSpotById = async (req, res) => {
    
    const id = req.params.id;
    try {
        await parkingSpots.findById(id).then( spotbyId => {
            
            if(!spotbyId) {
                const error = new Error('could not find the spot');
                error.statusCode = 422;
                throw error;
            }
            res.status(200).json({ spotbyId :spotbyId});
        })
    }
    catch(error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        console.log(error);
    }
};

// Search for parking spots based on criteria
export const searchSpots = (req, res) => {
    // Implementation for searching parking spots based on given criteria
};

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

