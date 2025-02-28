
import express from 'express';
import * as parkingController from '../controller/parkingController.js';

const router = express.Router();


router.get('/spots', parkingController.getSpots);
router.get('/spots/search/:name', parkingController.searchSpots);
router.get('/spots/searchNames/:query', parkingController.searchNames);
router.post('/spots/nearestSpot', parkingController.nearestSpots);
// router.get('/spots/:id', parkingController.getSpotById);
// router.post('/spots', parkingController.addSpot);
// router.patch('/spots/:id', parkingController.updateSpot);
// router.delete('/spots/:id', parkingController.deleteSpot);


// spots future implementation....
router.post('/spots/:id/book', parkingController.bookSpot);
router.post('/spots/:id/release', parkingController.releaseSpot);

export default router;
