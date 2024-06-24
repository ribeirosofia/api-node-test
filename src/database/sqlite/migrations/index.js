const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers');

const dropTables = `
    DROP TABLE IF EXISTS links;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS notes;
    DROP TABLE IF EXISTS users;
`;

async function migrationsRun() {
    const schemas = [
        createUsers,
    ].join('');

    sqliteConnection()
        .then(db => db.exec(schemas))
        .catch(error => console.error(error));
}

module.exports = migrationsRun;
