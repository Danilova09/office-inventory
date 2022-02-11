const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({message: 'categories'});
});

router.get('/:id', (req, res) => {
    res.send({message: 'category by id'});
});

router.post('/' , async (req, res, next) => {
    res.send({message: 'category was posted'});
});

router.delete('/:id', async (req, res) => {
    res.send(`category was deleted`);
});

module.exports = router;
