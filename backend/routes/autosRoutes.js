const express = require('express')
const router = express.Router()
const {getAutos, setAutos, updateAutos, deleteAutos} = require('../controllers/autoController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getAutos).post(protect, setAutos)

router.route('/:id').put(protect, updateAutos).delete(protect, deleteAutos)

module.exports = router