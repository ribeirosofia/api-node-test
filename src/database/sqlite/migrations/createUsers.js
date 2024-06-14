const createUsers = `
    CREATE TABLE  IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        email VARCHAR,
        password VARCHAR,
        avatar VARCHAR NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TRIGGER IF NOT EXISTS set_timestamp
    AFTER UPDATE ON users
    FOR EACH ROW
    WHEN NEW.updated_at <= OLD.updated_at
    BEGIN
        UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
`;

module.exports = createUsers;