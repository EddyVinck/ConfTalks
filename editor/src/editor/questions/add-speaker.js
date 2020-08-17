const { getRandomEntity } = require('../utils/get-random-entity');

function addSpeakerQuestions(db) {
    const example = getRandomEntity(db, 'speakers');

    return [
        {
            type: 'input',
            name: 'name',
            message: `What is the name of the speaker? (e.g. ${example.name})`,
            validate: value => {
                if (!value) {
                    return 'The provided value is empty!'
                } else if (db.get('speakers').find({ name: value }).value()) {
                    return 'The speaker is already in the database!';
                }

                return true;
            }
        }
    ];
}

module.exports = {
    addSpeakerQuestions
};
