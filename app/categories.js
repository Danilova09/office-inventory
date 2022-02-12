const express = require('express');
const router = express.Router();
const db = require('../mySqlDb');

router.get('/', async (req, res, next) => {
    try {
        let [categories] = await db.getConnection().execute('SELECT id, title FROM categories');
        res.send({categories: categories});
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const [categories] = await db.getConnection().execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        const category = categories[0];
        if (!category) {
            return res.status(404).send({error: `Category with id=${req.params.id} doesn't exist`});
        }
        return res.send({category: category});
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({message: 'Title is required'});
        }

        const category = {
            title: req.body.title,
            description: req.body.description,
        };

        let query = 'INSERT INTO categories (title, description) VALUES (?, ?)';

        const [results] = await db.getConnection().execute(query, [
            category.title,
            category.description,
        ]);

        const id = results.insertId;

        return res.send({message: `Created new category with id=${id}`});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        await db.getConnection().execute(`DELETE FROM categories WHERE id = ${categoryId}`);
        res.send(`category was deleted`);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
