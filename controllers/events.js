// {
//     ok: true,
//     msg: 'get events'
// }
const {response} = require('express');
const { events } = require('../models/Event');
const Event = require('../models/Event'); 
const {ObjectId} = require('mongodb')
const getEvents = async(req, res = response) => {
    const eventos = await Event.find()
    .populate('user', 'name');
    res.status(500).json({
        ok: true,
        msg: 'get events',
        events: eventos
    });
}


const createEvent = async(req, res = response) => {

    const event = new Event(req.body);

    event.user = req.uid;

    const response = await event.save();

    try {
        await event.save();
        res.status(200).json({
            ok: true,
            msg: 'create event',
            event: response
        });
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }

}

const updateEvent = async(req, res = response) => {
    const eventID = await req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById(eventID);
        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'Event does not exist for that ID :/'
            });  
        }

        if (uid !== event.user.toString()) {
            res.status(401).json({
                ok: false,
                msg: 'Dont have access to update this event'
            });  
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const response = await Event.findByIdAndUpdate(eventID, newEvent, {new: true});

        res.status(200).json({
            ok: true,
            msg: 'update event',
            response: response
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Bad Request :(',
            error: error
        });
    }

}

const deleteEvent = async(req, res = response) => {
    const eventID = await req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById(eventID);
        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'Event does not exist for that ID :/'
            });  
        }

        if (uid !== event.user.toString()) {
            res.status(401).json({
                ok: false,
                msg: 'Dont have access to update this event'
            });  
        }

        const response = await Event.findByIdAndDelete(eventID);

        res.status(200).json({
            ok: true,
            msg: 'deleted event',
            response: response
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Bad Request :(',
            error: error
        });
    }
}

module.exports ={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}