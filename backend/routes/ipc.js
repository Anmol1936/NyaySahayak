const express = require("express");
const router = express.Router();

const { getDB } = require("../config/db");

// GET /ipc/:section
router.get("/:section", async (req, res) => {

    try {

        const db = getDB();

        const section = req.params.section;

        const result = await db.collection("sections").findOne({
            "oldLaw.section": section
        });

        if (!result) {
            return res.status(404).json({
                message: "IPC Section not found"
            });
        }

        res.json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

});

module.exports = router;