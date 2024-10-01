// run this with node.js - this is not meant to be on the website itself.
// always run this after modifying anything related to wrs

const fs = require('fs');
const PATH_PLAYERS_JSON = `json/players.json`;
const ALL_GAMES = ["th01", "th02", "th03", "th04", "th05",
    "th06", "th07", "th08", "th10", "th11",
    "th12", "th128", "th13", "th14", "th15",
    "th16", "th17", "th18"];
const allPlayers = fetchJson(PATH_PLAYERS_JSON);
const allCategories = getVerifiedAndUnverifiedGames();

generateMappings();

fs.writeFileSync(PATH_PLAYERS_JSON, JSON.stringify(allPlayers));
console.log(`created file at ${PATH_PLAYERS_JSON}`);


const exampleFormat = {
    5: {
        "name_en": "REX",
        "name_jp": "レックス",
        "verified": {
            "th14": {
                "hard": ["SakuyaA"],
            },
        },
        "unverified": {
            "th14": {
                "hard": ["SakuyaA"],
            },
        },
    },
}

function generateMappings() {
    // For every game
    for (const [gameId, gameObj] of Object.entries(allCategories)) {
        const vArrays = ["unverified", "verified"];
        console.log(gameId);
        // For every status
        for (let i = 0; i < vArrays.length; i++) {
            const vValue = vArrays[i];
            const difficulties = gameObj[vValue];
            // For every difficulty
            for (const [difficulty, shottypes] of Object.entries(difficulties)) {
                console.log(difficulty)
                // For every shottype
                for (const [shottype, entries] of Object.entries(shottypes)) {
                    console.log(shottype)
                    // For every entry
                    loopEntries: for (const [entry, data] of Object.entries(entries)) {
                        // For every player
                        for (const [playerId, playerObj] of Object.entries(allPlayers)) {
                            // If id of entry matches player id
                            if (data.id == playerId) {
                                const categories = playerObj[`${vValue}`] ||= {};
                                const game = categories[gameId] ||= {};
                                const diff = game[difficulty] ||= [];
                                if (diff.includes(shottype)) {
                                    // If already exists, then look at next entries
                                    continue loopEntries;
                                } else {
                                    // Otherwise push category to player id
                                    diff.push(shottype);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function getVerifiedAndUnverifiedGames() {
    const results = {};
    for (const GAME of ALL_GAMES) {
        try {
            const verifiedData = fetchJson(`json/wr/verified/${GAME}.json`);
            const unverifiedData = fetchJson(`json/wr/unverified/${GAME}.json`);
            results[GAME] = {
                verified: verifiedData,
                unverified: unverifiedData
            };
        } catch (error) {
            throw new Error(`Error fetching data for ${GAME}:`, error);
        }
    }
    return results;
}

function fetchJson(url) {
    let temp = fs.readFileSync(url, 'utf8', (err, data) => {
        if (err) {
            throw new Error(`Error reading the file: ${err}`);
        }
    });
    return JSON.parse(temp);
}