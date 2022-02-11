const express = require('express');
const cors = require('cors');
const categories = require('./app/categories');
const places = require('./app/places');
const items = require('./app/items');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/categories', categories);
app.use('/places', places);
app.use('/items', items);
app.use(express.static('public'));

const run = async () => {
    app.listen(port, () => {
        console.log(`Server is listening port ${port}...`);
    });
}

run().catch(e => console.log(e));
