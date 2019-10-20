const { getRandomEntity } = require('../utils/get-random-entity');

const DATE_REGEXP = /^\d{4}-\d{2}-\d{2}$/;
const VIDEO_URL_REGEXP = /^http(s)?:\/\//;

function addTalkQuestions(db) {
    const example = getRandomEntity(db, 'talks');

    return [
        {
            type: 'input',
            name: 'main_title',
            message: `What is the title of the talk? (e.g. ${example.main_title})`,
            validate: value => {
                if (!value) {
                    return 'The provided value is empty!'
                } else if (db.get('talks').find({ main_title: value }).value()) {
                    return 'The talk is already in the database!';
                }

                return true;
            }
        },
        {
            type: 'checkbox',
            name: 'speakers',
            message: `Who were the speaker(s)?`,
            choices: db.get('speakers').sortBy('name').value().map(s => ({ value: s.id, name: s.name }))
        },
        {
            type: 'checkbox',
            name: 'categories',
            message: `What are the categories?`,
            choices: db.get('categories').sortBy('name').value().map(c => ({ value: c.id, name: c.name }))
        },
        {
            type: 'checkbox',
            name: 'conferences',
            message: `In which conference(s) was this talk presented?`,
            choices: db.get('conferences').sortBy('name').value().map(c => ({ value: c.id, name: c.name }))
        },
        {
            type: 'input',
            name: 'video_url',
            message: `What is the video URL? (e.g. ${example.video_url})`,
            validate: value => {
                if (!value) {
                    return 'The provided value is empty!'
                } else if (db.get('talks').find({ video_url: value }).value()) {
                    return 'This video is already in the database!';
                } else if (!VIDEO_URL_REGEXP.test(value)) {
                    return 'This video does not look like a valid URL!';
                }

                return true;
            }
        },
        {
            type: 'input',
            name: 'video_upload_date',
            message: `When was the video uploaded? (use YYYY-MM-DD format, e.g. ${example.video_upload_date})`,
            validate: value => {
                if (!value) {
                    return 'The provided value is empty!'
                } else if (!DATE_REGEXP.test(value)) {
                    return 'The provided value does not match to the YYYY-MM-DD pattern!';
                }

                return true;
            }
        }
    ];
}

module.exports = {
    addTalkQuestions
};
