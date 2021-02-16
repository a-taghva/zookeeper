const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

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
	const result = animalsArr.filter(animal => animal.id === id)[0];
	return result;
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

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});
