const mongoose = require('mongoose')

const autoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    marca: {
        type: String,
        required: [true, 'Introduce la marca']
    },
    modelo: {
        type: String,
        required: [true, 'Introduce el modelo' ]
    },
    year: {
        type: Number,
        required: [true, 'Introduce el year']
    },
    color: {
        type: String,
        required: [true, 'Introduce el color']
    }
    

}, {
    timestamps: true
})

module.exports = mongoose.model('Auto', autoSchema)