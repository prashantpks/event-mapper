const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    about:{
        type: String
    },
    photo:{
        type: String,
        required: true
    },
    my_events:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
        }
    ],
    starred_events:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
        }
    ]
  });

  module.exports = mongoose.model('user',userSchema);