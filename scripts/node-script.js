// run this with node.js - this is not meant to be on the website itself.
// ALWAYS run this after modifying anything related to wrs

const fs = require('fs');
const PATH_PLAYERS_JSON = `json/players.json`;
const ALL_GAMES = ["th01", "th02", "th03", "th04", "th05",
    "th06", "th07", "th08", "th10", "th11",
    "th12", "th128", "th13", "th14", "th15",
    "th16", "th17", "th18"];
const PC98_GAMES = ["th01", "th02", "th03", "th04", "th05"];
const allPlayers = fetchJson(PATH_PLAYERS_JSON);
const allCategories = getVerifiedAndUnverifiedGames(ALL_GAMES);

generateMappings();
getNoEntryNames();
// splitPc98Games();

function getNoEntryNames() {
    let counter = 0;
    for (const [id, obj] of Object.entries(allPlayers)) {
        if (!(obj.verified || obj.unverified)) {
            console.log(`id ${id} player ${obj.name_en} does not have any records.`);
            counter++;
        }
    }
    console.log(`${counter} players do not have a record.`)
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
                // console.log(difficulty)
                // For every shottype
                for (const [shottype, entries] of Object.entries(shottypes)) {
                    // console.log(shottype)
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
    createFile(allPlayers, PATH_PLAYERS_JSON)
}

function getVerifiedAndUnverifiedGames(list) {
    const results = {};
    for (const GAME of list) {
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

function splitPc98Games() {
    // For every game
    for (const [gameId, gameObj] of Object.entries(allCategories)) {
        const verified = {};
        const unverified = {};
        const vArrays = ["unverified", "verified"];
        console.log(gameId);
        // For every status
        for (let i = 0; i < vArrays.length; i++) {
            const vValue = vArrays[i];
            const difficulties = gameObj[vValue];
            // For every difficulty
            for (const [difficulty, shottypes] of Object.entries(difficulties)) {
                verified[difficulty] = verified[difficulty] ?? {}
                unverified[difficulty] = unverified[difficulty] ?? {}
                // For every shottype
                for (const [shottype, entries] of Object.entries(shottypes)) {
                    verified[difficulty][shottype] = verified[difficulty][shottype] ?? []
                    unverified[difficulty][shottype] = unverified[difficulty][shottype] ?? []
                    // For every entry
                    for (const [entry, data] of Object.entries(entries)) {
                        // For every player
                        if (data.sources.length == 0) { // has no source
                            unverified[difficulty][shottype].push(data)
                        } else { // has source
                            verified[difficulty][shottype].push(data)
                        }
                    }
                }
            }
        }
        createFile(verified, `json/${gameId}verified.json`)
        createFile(unverified, `json/${gameId}unverified.json`)
    }
}

function createFile(data, path) {
    fs.writeFileSync(path, JSON.stringify(data));
    console.log(`created file at ${path}`);
}