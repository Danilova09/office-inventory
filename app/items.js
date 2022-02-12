const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const db = require('../mySqlDb');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        let query = 'SELECT id, title, category_id, place_id FROM items';
        let [items] = await db.getConnection().execute(query);
        return res.send({items: items});
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const [items] = await db.getConnection().execute('SELECT * FROM items WHERE id = ?', [req.params.id]);
        const item = items[0];

        if (!item) {
            return res.status(404).send({message: 'Not found'});
        }
        return res.send(item);
    } catch (e) {
        next(e);
    }
});

router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.category_id || !req.body.place_id) {
            return res.status(400).send({error: 'Fill in required fields'});
        }

        const item = {
            category_id: parseInt(req.body.category_id),
            place_id: parseInt(req.body.place_id),
            title: req.body.title,
            description: req.body.description,
            image: null,
        };

        if (req.file) {
            item.image = req.file.filename;
        }

        let query = 'INSERT INTO items (title, description, image, category_id, place_id) VALUES (?, ?, ?, ?, ?)';

        const [results] = await db.getConnection().execute(query, [
            item.title,
            item.description,
            item.image,
            item.category_id,
            item.place_id
        ]);

        const id = results.insertId;
        return res.send({message: 'Created new item', id});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const itemId = req.params.id;
        await db.getConnection().execute(`DELETE FROM items WHERE id = ${itemId}`);
        res.send(`item was deleted`);
    } catch (e) {
        next(e);
    }
});

module.exports = router;