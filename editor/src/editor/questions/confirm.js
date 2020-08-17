module.exports = {
    confirmQuestions(answer) {
        return [{
            type: 'confirm',
            name: 'confirm',
            message: [
                'Are you OK with storing this data?',
                JSON.stringify(answer, null, 4)
            ].join('\n\n')
        }];
    }
};
