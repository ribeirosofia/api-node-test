const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers');
const createNotes = require('./createNotes');
const createTags = require('./createTags');
const createLinks = require('./createLinks');

const dropTables = `
    DROP TABLE IF EXISTS links;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS notes;
    DROP TABLE IF EXISTS users;
`;

async function migrationsRun() {
    const schemas = [
        createUsers,
        createNotes,
        createTags,
        createLinks
    ].join('');

    sqliteConnection()
        .then(db => db.exec(schemas))
        .catch(error => console.error(error));
}

module.exports = migrationsRun;
