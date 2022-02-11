const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({message: 'items'});
});

router.get('/:id', (req, res) => {
    res.send({message: 'item by id'});
});

router.post('/' , async (req, res, next) => {
    res.send({message: 'item was posted'});
});

router.delete('/:id', async (req, res) => {
    res.send(`item was deleted`);
});

module.exports = router;
