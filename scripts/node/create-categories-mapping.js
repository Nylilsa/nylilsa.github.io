const fs = require('fs');
// const { format } = require('fracturedjsonjs');
const { Formatter, EolStyle, FracturedJsonOptions } = require('fracturedjsonjs');

const TREE_OBJ = JSON.parse(fs.readFileSync("json/glitch-tree.json"));
const CATEGORIES_OBJ = JSON.parse(fs.readFileSync("json/categories.json"));

function cleanCategoriesObj() {
    const indicesTags = Object.keys(CATEGORIES_OBJ["tags"]);
    for (let i = 0; i < indicesTags.length; i++) {
        const index = indicesTags[i];
        delete CATEGORIES_OBJ["tags"][index]["tree-mapping"];
    }
    delete CATEGORIES_OBJ["related"];
    CATEGORIES_OBJ["related"] = {};
}

function mapping() {
    const thGames = Object.keys(TREE_OBJ);
    for (let i = 0; i < thGames.length; i++) {
        const game = thGames[i];
        const pageIndex = Object.keys(TREE_OBJ[game]);
        for (let j = 0; j < pageIndex.length; j++) {
            const tagList = TREE_OBJ[game][j]?.categories?.tags;
            const related = TREE_OBJ[game][j]?.categories?.related;
            if (tagList) {
                addToCategories(game, j, tagList);
            }
            if (related) {
                addToRelated(game, j, related);
            }
        }

    }
}

function addToCategories(game, pageIndex, tagList) {
    for (let i = 0; i < tagList.length; i++) {
        const tagIndex = tagList[i];
        const tagObject = CATEGORIES_OBJ["tags"][tagIndex];
        if (tagObject === undefined) {
            throw new Error(`Game ${game} page ${pageIndex} index ${tagIndex} is an invalid index.`);
        }
        tagObject["tree-mapping"] = tagObject["tree-mapping"] ?? {};
        tagObject["tree-mapping"][game] = tagObject["tree-mapping"][game] ?? [];
        tagObject["tree-mapping"][game].push(pageIndex);
    }
}

function addToRelated(game, pageIndex, relatedId) {
    const relatedObject = CATEGORIES_OBJ["related"];
    relatedObject[relatedId] = relatedObject[relatedId] ?? {};
    relatedObject[relatedId][game] = relatedObject[relatedId][game] ?? [];
    relatedObject[relatedId][game].push(pageIndex);
}

function saveJsonFiles() {
    const options = new FracturedJsonOptions();
    options.MaxInlineComplexity = 5;
    options.MaxTotalLineLength = 200;
    options.MinCompactArrayRowItems = 1;
    options.AlwaysExpandDepth = 0;

    const formatter = new Formatter();
    formatter.Options = options;

    const formattedJson = formatter.Reformat(JSON.stringify(CATEGORIES_OBJ));

    fs.writeFileSync("json/categories.json", formattedJson);
    console.log("Successfully wrote to json/categories.json")
}

function init() {
    cleanCategoriesObj();
    mapping();
    saveJsonFiles();
}

init();
console.log("finished running script");