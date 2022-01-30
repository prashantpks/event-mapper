const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
    event_name:{
        type: String,
        required: true
    },
    event_banner:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    latitude:{
        type: Number,
        required: true,
        min: -90,
        max: 90,
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
    },
    address: {
        type: String,
        required: true
    },
    organizer:{
        type: String,
        required:true,
    },
    start_time:{
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    stars: {
        type: Number,
        default: 0
    }
  });

  module.exports = mongoose.model('event',eventSchema);