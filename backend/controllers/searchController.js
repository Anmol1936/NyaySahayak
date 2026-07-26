const searchService = require("../services/searchService");

async function search(req, res) {

    try {

        const query = req.query.q;

        if (!query) {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        const results = await searchService.search(query);

        res.json(results);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

module.exports = {
    search
};