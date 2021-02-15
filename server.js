const express = require('express');
const app = express();

const { animals } = require('./data/animals');

const filterByQuery = (query, animalsArr) => {
    let filteredResults = animalsArr;
    let personalityTraitsArr = [];

	if (query.personalityTraitsArr) {
		if (typeof personalityTraitsArr === 'string') {
			persnolaityTraitsArr = [query.personalityTraits];
		} else {
			personlityTraitsArr = query.personliatyArr;
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

app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  };
  res.json(results);
});

app.listen(3001, () => {
	console.log(`API server now on port 3001!`);
});
