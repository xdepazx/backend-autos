const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const loginUser = asyncHandler (async (req, res ) => {
    const {email, password} = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error ('favor de verificar datos')
    }

    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error ('Credenciales Incorrectas')
    }
})

const registerUser = asyncHandler (async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error ('Verificar datos')
    }

    const userExiste = await User.findOne({email})
    if (userExiste) {
        res.status(400)
        throw new Error ('Ese email ya fue registrado')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('No se pudo crear usuario, datos incorrectos')
    }
    res.json({message: 'Registrar usuario'})
})

const getMisDatos = asyncHandler (async (req, res) => {
    res.json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    loginUser,
    registerUser,
    getMisDatos
}