const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers');

async function migrationsRun(){
    const schemas = [
        createUsers  
    ].join('');
    try {
        const db = await sqliteConnection();
        await db.exec(schemas);
        console.log("Database migration ran successfully");
    } catch (error) {
        console.error("Error running migrations:", error);
    }
}

module.exports = migrationsRun;