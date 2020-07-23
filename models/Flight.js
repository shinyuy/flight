const mongoose = require("mongoose");
const Schema = mongoose.Schema

const FlightSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    country: {
        required: true,
        type: String
    },
    number: {
        required: true,
        type: String
    }, 
    departure: {
        type: Date, 
        default: new Date()
    },
    boardingStatus: {
        type: String
    },
    destination: {
        required: true,
        type: String
    },
    images:{
        type: Array,
        required: true,
        default: []
    }
},
{
        timestamps: true
    }
)

module.exports = mongoose.model("Flight", FlightSchema)