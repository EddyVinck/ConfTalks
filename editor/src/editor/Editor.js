const { join } = require('path');
const inquirer = require('inquirer');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const { actionQuestions } = require('./questions/actions');
const { confirmQuestions } = require('./questions/confirm');
const { addCategoryQuestions } = require('./questions/add-category');
const { addConferenceQuestions } = require('./questions/add-conference');
const { addSpeakerQuestions } = require('./questions/add-speaker');
const { addTalkQuestions } = require('./questions/add-talk');

class Editor {
    constructor({ dbRoot = '' }) {
        this.dbRoot = dbRoot;
        this.db = lowdb(new FileSync(join(this.dbRoot, 'db.json')));
        this.db.defaults({ conferences: [], speakers: [], categories: [], talks: []}).write();
    }

    async start() {
        const ACTION_MAP = {
            addCategory: {
                type: 'categories',
                questions: addCategoryQuestions(this.db)
            },
            addConference: {
                type: 'conferences',
                questions: addConferenceQuestions(this.db)
            },
            addSpeaker: {
                type: 'speakers',
                questions: addSpeakerQuestions(this.db)
            },
            addTalk: {
                type: 'talks',
                questions: addTalkQuestions(this.db)
            }
        };

        const { action } = await inquirer.prompt(actionQuestions());
        const { type, questions } = ACTION_MAP[action];
        const data = await this.promptQuestions(questions);

        if (data) {
            this.add(type, data);
        }

        await this.start();
    }

    async promptQuestions(questions) {
        const answer = await inquirer.prompt(questions);
        const { confirm } = await inquirer.prompt(confirmQuestions(answer));

        if (!confirm) {
            return this.promptQuestions(questions);
        }

        return answer;
    }

    add(type, data) {
        const id = data.id || this.getRandomId();

        return this.db.get(type).push({ id, ...data }).write();
    }

    getRandomId() {
        return Math.random().toString(36).substr(2, 7);
    }
}


module.exports = Editor;