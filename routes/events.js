const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/event');
const Event = mongoose.model('events');

router.get('/', (req, res) => {
    Event.find({})
        .then((event) => {
            res.render('index', {
                event,
            });
        });
});

// router.get('/webmanifest.json', (req, res) => {
//    res.send('awesome')
// });

router.post('/', (req, res) => {
    let dateVal = new Date(req.body.date + ' ' + req.body.time + ':00').getTime();
    const newEvent = {
        title: req.body.eventName,
        date: dateVal,
    };

    new Event(newEvent).save()
        .then(() => {
            res.redirect('/');
        }).catch((err) => {
        res.status(400).send('Error', err)
    });
});


router.delete('/:id', (req, res) => {
    Event.remove({_id: req.params.id})
        .then(() => {
            res.redirect('/');
        }).catch((err) => {
        res.status(400).send('Error', err)
    });
});

module.exports = router;