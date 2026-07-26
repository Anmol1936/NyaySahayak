const { getDB } = require("../config/db");

/* =====================================================
   Helper Functions
===================================================== */

function normalizeQuery(query) {
    return query.trim().toLowerCase().replace(/\s+/g, " ");
}

function addResult(results, document, score, matchType) {

    if (!document) return;

    const existing = results.find(r => r.result._id === document._id);

    if (existing) {

        if (score > existing.score) {
            existing.score = score;
            existing.matchType = matchType;
        }

        return;
    }

    results.push({
        score,
        matchType,
        result: document
    });

}

function rankResults(results) {

    return results
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

}

function detectSearchType(query) {

    const compact = query.replace(/\s/g, "");

    if (/^\d+$/.test(query)) {
        return {
            type: "NUMBER",
            value: query
        };
    }

    if (compact.startsWith("ipc")) {
        return {
            type: "IPC",
            value: compact.replace("ipc", "")
        };
    }

    if (compact.startsWith("bns")) {
        return {
            type: "BNS",
            value: compact.replace("bns", "")
        };
    }

    return {
        type: "TEXT",
        value: query
    };

}

/* =====================================================
   Exact Section Search
===================================================== */

async function searchByIPC(db, section) {

    return await db.collection("sections").findOne({
        "oldLaw.section": section
    });

}

async function searchByBNS(db, section) {

    return await db.collection("sections").findOne({
        "newLaw.section": section
    });

}

/* =====================================================
   Alias Search
===================================================== */

async function searchByAlias(db, query) {

    return await db.collection("sections").find({
        aliases: {
            $elemMatch: {
                $regex: "^" + query + "$",
                $options: "i"
            }
        }
    }).toArray();

}

/* =====================================================
   Searchable Title
===================================================== */

async function searchByTitle(db, query) {

    return await db.collection("sections").find({
        searchableTitle: {
            $regex: query,
            $options: "i"
        }
    }).toArray();

}

/* =====================================================
   Primary Keywords
===================================================== */

async function searchByPrimaryKeywords(db, query) {

    return await db.collection("sections").find({
        "keywords.primary": {
            $elemMatch: {
                $regex: query,
                $options: "i"
            }
        }
    }).toArray();

}

/* =====================================================
   Secondary Keywords
===================================================== */

async function searchBySecondaryKeywords(db, query) {

    return await db.collection("sections").find({
        "keywords.secondary": {
            $elemMatch: {
                $regex: query,
                $options: "i"
            }
        }
    }).toArray();

}

/* =====================================================
   Related Objects
===================================================== */

async function searchByRelatedObjects(db, query) {

    return await db.collection("sections").find({
        relatedObjects: {
            $elemMatch: {
                $regex: query,
                $options: "i"
            }
        }
    }).toArray();

}

/* =====================================================
   Common Queries
===================================================== */

async function searchByCommonQueries(db, query) {

    return await db.collection("sections").find({
        commonQueries: {
            $elemMatch: {
                $regex: query,
                $options: "i"
            }
        }
    }).toArray();

}

/* =====================================================
   Search Text
===================================================== */

async function searchBySearchText(db, query) {

    return await db.collection("sections").find({
        searchText: {
            $regex: query,
            $options: "i"
        }
    }).toArray();

}


/* =====================================================
   Main Search Function
===================================================== */

async function search(query) {

    const db = getDB();

    query = normalizeQuery(query);

    const searchInfo = detectSearchType(query);

    // ================================
    // Exact Section Search
    // ================================

    if (searchInfo.type === "IPC") {

         const doc = await db.collection("sections").findOne({
            "oldLaw.section": searchInfo.value
         });

        if (doc) {
            return [{
                score: 1000,
                matchType: "IPC_SECTION",
                result: doc
            }];
        }

        return [];
    }

    if (searchInfo.type === "BNS") {

        const doc = await db.collection("sections").findOne({
            "newLaw.section": searchInfo.value
        });

        if (doc) {
            return [{
                score: 1000,
                matchType: "BNS_SECTION",
                result: doc
            }];
        }

        return [];
    }

    if (searchInfo.type === "NUMBER") {

        let doc = await db.collection("sections").findOne({
            "oldLaw.section": searchInfo.value
        });

        if (doc) {
            return [{
                score: 1000,
                matchType: "IPC_SECTION",
                result: doc
            }];
        }

        doc = await db.collection("sections").findOne({
            "newLaw.section": searchInfo.value
        });

        if (doc) {
            return [{
                score: 1000,
                matchType: "BNS_SECTION",
                result: doc
            }];
        }

        return [];
    }

    const docs = await db.collection("sections").find({}).toArray();

    const results = [];

    for (const doc of docs) {

        let score = 0;
        let matchType = "";

        // =========================
        // Section Search
        // =========================

        if (searchInfo.type === "IPC") {

            if (doc.oldLaw.section === searchInfo.value) {
                results.push({
                    score: 1000,
                    matchType: "IPC_SECTION",
                    result: doc
                });
            }

            continue;
        }

        if (searchInfo.type === "BNS") {

            if (doc.newLaw.section === searchInfo.value) {
                results.push({
                    score: 1000,
                    matchType: "BNS_SECTION",
                    result: doc
                });
            }

            continue;
        }

        if (searchInfo.type === "NUMBER") {

            if (
                doc.oldLaw.section === searchInfo.value ||
                doc.newLaw.section === searchInfo.value ||
                (doc.aliases &&
                    doc.aliases.some(
                        a => a.toLowerCase() === query
                    ))
            ) {

                results.push({
                    score: 1000,
                    matchType: "SECTION",
                    result: doc
                });

            }

            continue;
        }

        // Title
        if (
            doc.searchableTitle &&
            doc.searchableTitle.toLowerCase() === query
        ) {
            score += 900;
            if (!matchType)
                matchType = "TITLE";
        }

        // Primary Keyword
        if (
            doc.keywords.primary &&
            doc.keywords.primary.some(
                k => k.toLowerCase() === query
            )
        ) {
            score += 850;
            if (!matchType)
                matchType = "PRIMARY_KEYWORD";
        }
                // Secondary Keyword
        if (
            doc.keywords.secondary &&
            doc.keywords.secondary.some(
                k => k.toLowerCase() === query
            )
        ) {
            score += 800;
            if (!matchType)
                matchType = "SECONDARY_KEYWORD";
        }

        // Related Object
        if (
            doc.relatedObjects &&
            doc.relatedObjects.some(
                r => r.toLowerCase() === query
            )
        ) {
            score += 700;
            if (!matchType)
                matchType = "RELATED_OBJECT";
        }

        // Common Queries
        if (
            doc.commonQueries &&
            doc.commonQueries.some(
                c => c.toLowerCase().includes(query)
            )
        ) {
            score += 600;
            if (!matchType)
                matchType = "COMMON_QUERY";
        }

        // Search Text
        if (
            doc.searchText &&
            doc.searchText.toLowerCase().includes(query)
        ) {
            score += 500;
            if (!matchType)
                matchType = "SEARCH_TEXT";
        }

        if (score > 0) {

            results.push({
                score,
                matchType,
                result: doc
            });

        }

    }

    return results
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

}

module.exports = {
    search
};