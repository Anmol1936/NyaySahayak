const express = require("express");
const router = express.Router();

const { getDB } = require("../config/db");

router.get("/", async (req, res) => {
    try {

        const db = getDB();

        const sections = await db
            .collection("sections")
            .find({})
            .toArray();

        res.json(sections);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
});

module.exports = router;