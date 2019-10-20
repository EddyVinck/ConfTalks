const { getRandomEntity } = require('../utils/get-random-entity');

const DATE_REGEXP = /^\d{4}-\d{2}-\d{2}$/;

function addConferenceQuestions(db) {
    const example = getRandomEntity(db, 'conferences');

    return [
        {
            type: 'input',
            name: 'name',
            message: `What is the name of the conference? (e.g. ${example.name})`,
            validate: value => {
                if (!value) {
                    return 'The provided value is empty!'
                } else if (db.get('conferences').find({ name: value }).value()) {
                    return 'The conference is already in the database!';
                }

                return true;
            }
        },
        {
            type: 'input',
            name: 'start_date',
            message: `What was the start date of the conference? (use YYYY-MM-DD format, e.g. ${example.start_date})`,
            validate: value => {
                if (!value) {
                    return 'The provided value is empty!'
                } else if (!DATE_REGEXP.test(value)) {
                    return 'The provided value does not match to the YYYY-MM-DD pattern!';
                }

                return true;
            }
        },
        {
            type: 'input',
            name: 'end_date',
            message: `What was the end date of the conference? (use YYYY-MM-DD format, e.g. ${example.end_date})`,
            validate: value => {
                if (!value) {
                    return 'The provided value is empty!'
                } else if (!DATE_REGEXP.test(value)) {
                    return 'The provided value does not match to the YYYY-MM-DD pattern!';
                }

                return true;
            }
        },
        {
            type: 'input',
            name: 'locations',
            message: `Where was the conference? (e.g. ${example.locations[0]})`,
            filter: value => ([value]),
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
    addConferenceQuestions
};
