const XLSX = require("xlsx");
const fs = require("fs-extra");
const path = require("path");

// File Paths
const inputFile = path.join(__dirname, "../database/raw/nyaysahayak.xlsx");
const outputFile = path.join(__dirname, "../database/generated/sections.json");

// Read Excel
const workbook = XLSX.readFile(inputFile);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

// Helper function
function splitArray(value, separator = ",") {
    if (!value) return [];

    return String(value)
        .split(separator)
        .map(item => item.trim())
        .filter(item => item.length > 0);
}

const finalData = rows.map(row => ({

    _id: `IPC_${row["IPC Section"]}`,

    oldLaw: {
        act: "IPC",
        section: String(row["IPC Section"]),
        title: row["IPC Heading"] || ""
    },

    newLaw: {
        act: "BNS",
        section: String(row["BNS Section"]),
        title: row["BNS Heading"] || ""
    },

    description: {
        ipc: row["IPC Descriptions"] || "",
        bns: row["BNS description"] || ""
    },

    intent: row["intent"] || "",

    keywords: {
    primary: splitArray(row["primary_keywords"]),
    secondary: splitArray(row["secondary_keywords"]),
    all: [
        ...new Set([
            ...splitArray(row["primary_keywords"]),
            ...splitArray(row["secondary_keywords"])
        ])
    ]
},

    relatedObjects: splitArray(row["related_objects"]),

    commonQueries: splitArray(row["common_queries"], "|"),

    searchText: [
    row["searchable_title"] || "",
    ...splitArray(row["primary_keywords"]),
    ...splitArray(row["secondary_keywords"]),
    ...splitArray(row["related_objects"]),
    ...splitArray(row["common_queries"], "|")
].join(" ").toLowerCase(),

    searchPriority: row["search_priority"] || "",

    searchableTitle: row["searchable_title"] || "",

aliases: [
    String(row["IPC Section"]),
    `IPC ${row["IPC Section"]}`,
    `IPC${row["IPC Section"]}`,
    `Section ${row["IPC Section"]}`,
    `BNS ${row["BNS Section"]}`,
    `BNS${row["BNS Section"]}`
]
}));

// Create output folder if it doesn't exist
fs.ensureDirSync(path.dirname(outputFile));

// Write JSON
fs.writeJsonSync(outputFile, finalData, { spaces: 2 });

console.log("✅ JSON created successfully!");
console.log(`📄 Total Records: ${finalData.length}`);
console.log(`💾 Saved at: ${outputFile}`);