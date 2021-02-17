const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
// parse incoming string or array data
// { extended: true } informs server that there may be sub-array data nested in it
// so it needs to look as deep into the POST data as possible to parse all of the data correctly
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

const { animals } = require('./data/animals');

const filterByQuery = (query, animalsArr) => {
    let filteredResults = animalsArr;
	let personalityTraitsArr = [];

	if (query.personalityTraits) {
		if (typeof query.personalityTraits === 'string') {
			personalityTraitsArr = [query.personalityTraits];
		} else {
			personalityTraitsArr = query.personalityTraits;
		};

		personalityTraitsArr.forEach(trait => {
			filteredResults = filteredResults.filter(
				animal => animal.personalityTraits.indexOf(trait) !== -1
			);
        }); 
	};

	if (query.diet) {
		filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
	};

	if (query.species) {
		filteredResults = filteredResults.filter(animal => animal.species === query.species);
	};

	if (query.name) {
		filteredResults = filteredResults.filter(animal => animal.name === query.name);
    };

	return filteredResults;
};

const findById = (id, animalsArr) => {
	const result = animalsArr.filter(animal => animal.id === id);
	return result;
};

const createNewAnimal = (body, animalsArr) => {
	const animal = body;
	animalsArr.push(animal);
	console.log(JSON.stringify({ animals: animalsArr }, null, 4));

	fs.writeFileSync(
		path.join(__dirname, './data/animals.json'),
		JSON.stringify({ animals: animalsArr }, null , 2)
	);

	return animal;
};

app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  };
  res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
	const result = findById(req.params.id, animals);
	result ? res.json(result) : res.send(404);
});

app.post('/api/animals', (req, res) => {
	req.body.id = animals.length.toString();
	createNewAnimal(req.body, animals);

	res.json(req.body);
});

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});
