const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let db;

async function connectDB() {
    if (db) return db;

    const client = new MongoClient(uri);

    await client.connect();

    console.log("✅ MongoDB Connected");

    db = client.db(dbName);

    return db;
}

function getDB() {
    if (!db) {
        throw new Error("Database not connected.");
    }

    return db;
}

module.exports = {
    connectDB,
    getDB
};