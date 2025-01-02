
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const ParkingSchema = new Schema({
    
    assetId : {
        type : Number,
        required : true,
        unique : true
    },
    name: {
        type : String,
        required: true,
    },
    totalSpaces: {
        type : String,
        required : true,
    }
    ,
    regularSpaces : {
        type : Number,
        required: true,
    },
    handicapSpaces : {
       type : Number,
       required: true,
    },
    latitude: {
        type : Number,
        required : true,
    },
    longitude : {
        type : Number,
        required : true,
    },
    access : {
        type : String,
        required: true,
    },
    isAvailable : {
        type : Boolean,
        default : true,
    },
    lastUpdated : {
        type : Date,
        default : () => Date.now(),
        immutable: true,
    }
})

const parkingSpots = mongoose.model('parkingSpot', ParkingSchema);

export default parkingSpots;