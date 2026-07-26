require("dotenv").config();
console.log("URI Loaded:", !!process.env.MONGODB_URI);
console.log("DB Name:", process.env.DB_NAME);

const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);

async function importData() {
    try {
        await client.connect();

        console.log("✅ Connected to MongoDB Atlas");

        const db = client.db(dbName);
        const collection = db.collection("sections");

        // Read JSON file
        const dataPath = path.join(
            __dirname,
            "../database/generated/sections.json"
        );

        const jsonData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        console.log(`📄 Records found: ${jsonData.length}`);

        // Delete existing documents
        await collection.deleteMany({});

        console.log("🗑️ Old documents removed");

        // Insert new documents
        await collection.insertMany(jsonData);

        console.log(`🎉 ${jsonData.length} documents imported successfully!`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log("🔒 Connection closed");
    }
}

importData();