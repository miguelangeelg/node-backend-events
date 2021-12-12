/*
 Rutas de eventos
 host + /api/events
*/
const express = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = express.Router();
const {check}  = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const { isDate } = require("../helpers/isDate");

// Validate token for every routes
router.use(validateJWT);

// Get events
router.get('/' , getEvents);

// Create event
router.post('/', 
[
    check('title', 'Title required').not().isEmpty(),
    check('start', 'Start required').custom(isDate),
    check('end', 'End required').custom(isDate),
    validateFields
],  createEvent);

// Update event
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);


module.exports = router;