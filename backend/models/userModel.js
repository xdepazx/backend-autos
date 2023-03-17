const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, 'introduzca nombre']
    },
    email: {
        type: String,
        required: [true, 'Introduzca email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Introduzca un password']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)