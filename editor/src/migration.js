/**
 * This script migrates the original database to a lowdb database.
 * It reads the original JSON files and maps the IDs to new random generated ones,
 * then stores the db at `client/data/db.json` in a lowdb format.
 */
const { join } = require('path');
const Editor = require('./editor/Editor');

const conferences = require('../../client/data/conferences.json').conferences;
const speakers = require('../../client/data/speakers.json').speakers;
const categories = require('../../client/data/talk_categories.json').categories;
const talks = require('../../client/data/talks.json').talks;
const ID_MAP = {
    conferences: {},
    speakers: {},
    categories: {},
    talks: {}
};

const editor = new Editor({
    dbRoot: join(__filename, '../../../client/data')
});


function migrateSimple(type, collection) {
    console.log(`Migrating ${type}...`);
    Object.entries(collection).forEach(([oldId, data]) => {
        const newId = editor.getRandomId();
        ID_MAP[type][oldId] = newId;
    
        editor.add(type, { id: newId, ...data });
    }); 
    console.log(`Migrating ${type} DONE ⭐`);
}

function migrateTalks(collection) {
    console.log(`Migrating talks...`);

    Object.entries(collection).forEach(([oldId, data]) => {
        const newId = editor.getRandomId();
        ID_MAP.talks[oldId] = newId;

        data.speakers = data.speakers.map(id => ID_MAP.speakers[id]);
        data.categories = data.categories.map(id => ID_MAP.categories[id]);
        data.conferences = data.conferences.map(id => ID_MAP.conferences[id]);
    
        editor.add('talks', { id: newId, ...data });
    }); 


    console.log(`Migrating talks DONE ⭐`);
}

migrateSimple('conferences', conferences);
migrateSimple('speakers', speakers);
migrateSimple('categories', categories);
migrateTalks(talks);