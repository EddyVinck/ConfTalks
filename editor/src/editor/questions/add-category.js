const { getRandomEntity } = require('../utils/get-random-entity');

function addCategoryQuestions(db) {
    const example = getRandomEntity(db, 'categories', c => c.alternative_spelling.length > 1);

    return [
        {
            type: 'input',
            name: 'name',
            message: `What is the name of the category? (e.g. ${example.name})`,
            validate: value => {
                if (!value) {
                    return 'The provided value is empty!'
                } else if (db.get('categories').find({ name: value }).value()) {
                    return 'The category is already in the database!';
                }

                return true;
            }
        },
        {
            type: 'input',
            name: 'alternative_spelling',
            message: `Are there alternative spellings for this topic? Provide a comma separated list (e.g. ${example.alternative_spelling.join(', ')})`,
            filter: value => value.split(',').map(v => v.trim()),
            validate: value => {
                if (!value) {
                    return 'The provided value is empty!'
                }

                return true;
            }
        }
    ];
}

module.exports = {
    addCategoryQuestions
};
