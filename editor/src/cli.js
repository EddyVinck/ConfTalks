const { join } = require('path');
const Editor = require('./editor/Editor');

const editor = new Editor({
    dbRoot: join(__filename, '../../../client/data')
});

editor.start();