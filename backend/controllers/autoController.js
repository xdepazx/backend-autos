const asyncHandler = require('express-async-handler')
const Auto = require('../models/autoModel')

const getAutos = asyncHandler ( async (req, res) => {
    const autos = await Auto.find({user: req.user.id})
    res.status(200).json(autos)
})

const setAutos = asyncHandler (async (req, res) => {
    if(!req.body.marca) {
        res.status(400)
        throw new Error ('Falta informacion')
    }

    const auto = await Auto.create({
        marca: req.body.marca,
        modelo: req.body.modelo,
        year: req.body.year,
        color: req.body.color,
        user:req.user.id
    })
    res.status(201).json(auto)
})

const updateAutos = asyncHandler (async (req, res) => {
    const auto = await Auto.findById(req.params.id)
    if(!auto) {
        res.status(400)
        throw new Error ('Falta informacion')
    }

    if (auto.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('Acceso no autorizado, el auto no pertenece al usuario')
    }

    const autoModificado = await Auto.findByIdAndUpdate( req.params.id, req.body, {new: true})
    
    res.status(201).json(autoModificado)
})

const deleteAutos = asyncHandler( async (req,res) => {
    const auto = await Auto.findById(req.params.id)

    if(!auto) {
        res.status(400)
        throw new Error ('Auto no encontrado')
    }

    if(auto.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error ('Acceso no autorizado, el auto no pertenece al usuario logeado')
    }
    await auto.deleteOne()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getAutos,
    setAutos,
    updateAutos,
    deleteAutos
}