const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// parse incoming string or array data
// { extended: true } informs server that there may be sub-array data nested in it
// so it needs to look as deep into the POST data as possible to parse all of the data correctly
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});
