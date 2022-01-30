const mongoose = require('mongoose');
require('dotenv').config();

const mongooseURI = process.env.DATABASE_URL;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const connectToMongo = ()=>{
    
    mongoose.connect(mongooseURI,connectionParams)
        .then( () => {
            console.log('Connected to database ')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })
}

module.exports = connectToMongo;