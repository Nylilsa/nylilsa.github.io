const fs = require('fs');

function init() {
    const treeObj = JSON.parse(fs.readFileSync("json/glitch-tree.json"));
    const categoriesObj = JSON.parse(fs.readFileSync("json/glitch-tree.json"));
    const thGames = Object.keys(treeObj);
    for (let i = 0; i < thGames.length; i++) {
        const game = thGames[i];
        const pageIndex = Object.keys(treeObj[game]);
        for (let j = 0; j < pageIndex.length; j++) {
            const tagList = treeObj[game][j]?.categories?.tags;
            const related = treeObj[game][j]?.categories?.related;
            if (!tagList) continue;
            console.log(game +" "+ j);
            console.log(tagList);
        }

    }


}

init();
console.log("finished running script");