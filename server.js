const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
// { extended: true } informs server that there may be sub-array data nested in it
// so it needs to look as deep into the POST data as possible to parse all of the data correctly
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

const { animals } = require('./data/animals');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/animals.html"));
});

app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/zookeepers.html"));
});


app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});
