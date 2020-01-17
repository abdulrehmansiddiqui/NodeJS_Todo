const mongoose = require('mongoose')

const cameraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        unique: true,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})

mongoose.model('Camera', cameraSchema);