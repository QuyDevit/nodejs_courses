const mongoose = require('mongoose');

async function connnect(){

    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        console.log("Connnect successfully")
    } catch (error) {
        console.log("Connnect fail")
    }
}

module.exports = {connnect} ;