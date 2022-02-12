const express = require('express');
const router = express.Router();
const db = require('../mySqlDb');


router.get('/', async (req, res, next) => {
    try {
        let [places] = await db.getConnection().execute('SELECT * FROM places');
        res.send({places: places});
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const [places] = await db.getConnection().execute('SELECT * FROM places WHERE id = ?', [req.params.id]);
        const place = places[0];

        if (!place) {
            return res.status(404).send({error: `place with id=${req.params.id} doesn't exist`});
        }
        return  res.send({place: place});
    } catch (e) {
        next(e);
    }
});

router.post('/' , async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({message: 'Title is required'});
        }

        const place = {
            title: req.body.title,
            description: req.body.description,
        };

        let query = 'INSERT INTO places (title, description) VALUES (?, ?)';

        const [results] = await db.getConnection().execute(query, [
            place.title,
            place.description,
        ]);

        const id = results.insertId;

        return res.send({message: `Created new place with id=${id}`});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res) => {
    const placeId = req.params.id;
    await db.getConnection().execute(`DELETE FROM places WHERE id = ${placeId}`);
    res.send(`place was deleted`);
});

module.exports = router;
