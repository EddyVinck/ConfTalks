module.exports = {
    actionQuestions() {
        return [{
            type: 'list',
            name: 'action',
            message: 'Welcome to the ConfTalks Editor! What would you like to do?',
            choices: [
                { value: 'addCategory', name: 'Add a new category' },
                { value: 'addConference', name: 'Add a new conference' },
                { value: 'addSpeaker', name: 'Add a new speaker' },
                { value: 'addTalk', name: 'Add a new talk' }
            ]
        }];
    }
};
