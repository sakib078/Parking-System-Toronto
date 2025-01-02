
import { error } from 'console';
import parkingSpots from '../models/ParkingSpot.js';

import { promises as fs } from 'fs';

export const importData = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const jsonData = await fs.readFile(req.file.path, 'utf8');
    const parkingData = JSON.parse(jsonData);

    console.log(parkingData);

    const processedData = parkingData.map(spot => ({
      assetId: spot['Parking Lot Asset ID'],
      name: spot['Park Name'],
      totalSpaces: spot['Total Spaces'],
      regularSpaces: spot['Parking Spaces'],
      handicapSpaces: spot['Handicap Parking Spaces'],
      latitude: spot.Latitude,
      longitude: spot.Longitude,
      access: spot.Access || 'Unknown'
    }));

    await parkingSpots.insertMany(processedData);

    // Delete the uploaded file after processing
    await fs.unlink(req.file.path);

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ error: 'Failed to import data' });
  }
};


// export const getAllParkingSpots = async (req, res) => {

//   try {

//     await parkingSpots.find().then(spots => {
//       res.status(200).json(spots);
//     })
   
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Failed to fetch parking spots' });
//   }
// };

export const createParkingSpot = async (req, res) => {
  try {
    const newParkingSpot = new parkingSpots(req.body);
    await newParkingSpot.save();
    res.status(201).json(newParkingSpot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create parking spot' });
  }
};

export const updateParkingSpot = async (req, res) => {
  try {
    const updatedSpot = await parkingSpots.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSpot) {
      return res.status(404).json({ error: 'Parking spot not found' });
    }
    res.status(200).json(updatedSpot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update parking spot' });
  }
};

export const deleteParkingSpot = async (req, res) => {
  try {
    const deletedSpot = await parkingSpots.findByIdAndDelete(req.params.id);
    if (!deletedSpot) {
      return res.status(404).json({ error: 'Parking spot not found' });
    }
    res.status(200).json({ message: 'Parking spot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete parking spot' });
  }
};
