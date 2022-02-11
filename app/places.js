const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({message: 'places'});
});

router.get('/:id', (req, res) => {
    res.send({message: 'place by id'});
});

router.post('/' , async (req, res, next) => {
    res.send({message: 'place was posted'});
});

router.delete('/:id', async (req, res) => {
    res.send(`place was deleted`);
});

module.exports = router;
