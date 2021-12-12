const mongoose = require('mongoose');
require("dotenv").config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN), {useCreateIndex: true};
            console.log('DB ONLINE')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error in db init');
    }
}

module.exports = dbConnection;