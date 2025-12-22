"use strict";

export async function initCategoriesTable() {
    const path = initRemoveHash(false);
    const [, game, index] = (await checkBugPath(path)).split(/[/.]/);
    Promise.all([
        fetchData(`json/glitch-tree.json`),
        fetchData(`json/categories.json`)
    ]).then(([TREE, CATEGORIES]) => {
        buildTable(game, index, TREE, CATEGORIES);
    });
}

function buildTable(game, index, TREE, CATEGORIES) {
    const currentPage = TREE[game][index];
    const tagList = currentPage.categories.tags;

    const tableId = document.getElementById("bugsCategoriesTable");
    const table = document.createElement('table');

    // Body rows
    const thSameGame = buildRowSameGame(game, TREE[game], index)
    table.appendChild(thSameGame);

    tagList.forEach(tag => {
        const thSameCategoryRows = buildRowCategory(game, index, TREE, CATEGORIES["tags"][tag]);
        table.appendChild(thSameCategoryRows)
    });

    if (currentPage.categories.related) {
        const thRelatedRows = buildRowRelated(game, index, TREE, CATEGORIES["related"], currentPage.categories.related);
        table.appendChild(thRelatedRows)
    }

    tableId.appendChild(table);
}

function buildRowSameGame(game, gameBugs, selectedIndex) {
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td = document.createElement('td');
    td.style.paddingBottom = "1em";
    td.colSpan = 2;
    th.colSpan = 2;
    th.textContent = `All ${names1[game]["en"]} pages:`;

    Object.keys(gameBugs).forEach((index) => {

        if (index === selectedIndex) { // if match equals current page
            const span = document.createElement("span");
            span.textContent = gameBugs[index]["title"];
            td.appendChild(span);
        } else {
            const a = document.createElement('a');
            const url = `${window.location.origin}/#/bugs/${game}/${gameBugs[index]["url-name"][0]}`
            a.classList.add("url");
            // a.target = "_blank"
            a.href = url;
            a.textContent = gameBugs[index]["title"];
            td.appendChild(a);
        }

        if (index < Object.keys(gameBugs).length - 1) {
            td.appendChild(document.createTextNode(" · "));
        }
    })
    tr.appendChild(th);
    tr.appendChild(td);
    tbody.appendChild(th);
    tbody.appendChild(tr);
    return tbody;
}

function buildRowCategory(selectedGame, selectedIndex, TREE, categories) {
    const tbody = document.createElement('tbody');
    const thFirst = document.createElement('tr');
    const th = document.createElement('th');
    if (categories["href"]) {
        th.innerHTML = `All <a class="url" target="_blank" href="${categories["href"]}">${categories["formatted_label"]}-related</a> pages:`;
    } else {
        th.innerHTML = `All <span class="highlight-txt">${categories["formatted_label"]}-related</span> pages:`;
    }
    th.colSpan = 2;
    thFirst.colSpan = 2;
    thFirst.appendChild(th);
    tbody.appendChild(thFirst);

    Object.keys(categories["tree-mapping"]).forEach(game => {
        const tr = document.createElement('tr');
        const gameCell = document.createElement('td');
        const td = document.createElement('td');
        categories["tree-mapping"][game].forEach((index) => {
            // td.style.paddingBottom = "1em";
            const obj = TREE[game][index];
            gameCell.textContent = game;
            if (selectedGame === game && index === Number(selectedIndex)) { // if match equals current page
                const span = document.createElement("span");
                span.textContent = `${obj["title"]}`;
                td.appendChild(span);
            } else {
                const a = document.createElement('a');
                const url = `${window.location.origin}/#/bugs/${game}/${obj["url-name"][0]}`
                a.classList.add("url");
                // a.target = "_blank"
                a.href = url;
                a.textContent = `${obj["title"]}`;
                td.appendChild(a);
            }
            const notLast = !(categories["tree-mapping"][game].indexOf(index) === categories["tree-mapping"][game].length - 1);
            if (notLast) {
                td.appendChild(document.createTextNode(" · "));
            }
            tr.appendChild(gameCell);
            tr.appendChild(td);
        })
        tbody.appendChild(tr);
    });
    return tbody;
}

function buildRowRelated(selectedGame, selectedIndex, TREE, categories, id) {
    const tbody = document.createElement('tbody');
    const thFirst = document.createElement('tr');
    const th = document.createElement('th');
    th.innerHTML = `Bugs with similar cause:`;
    th.colSpan = 2;
    thFirst.appendChild(th);
    tbody.appendChild(thFirst);

    Object.keys(categories[id]).forEach(game => {
        const tr = document.createElement('tr');
        const gameCell = document.createElement('td');
        const td = document.createElement('td');
        categories[id][game].forEach((index) => {
            // td.style.paddingBottom = "1em";
            const obj = TREE[game][index];
            gameCell.textContent = game;
            if (selectedGame === game && index === Number(selectedIndex)) { // if match equals current page
                const span = document.createElement("span");
                span.textContent = `${obj["title"]}`;
                td.appendChild(span);
            } else {
                const a = document.createElement('a');
                const url = `${window.location.origin}/#/bugs/${game}/${obj["url-name"][0]}`
                a.classList.add("url");
                // a.target = "_blank"
                a.href = url;
                a.textContent = `${obj["title"]}`;
                td.appendChild(a);
            }
            const notLast = !(categories[id][game].indexOf(index) === categories[id][game].length - 1);
            if (notLast) {
                td.appendChild(document.createTextNode(" · "));
            }
            tr.appendChild(gameCell);
            tr.appendChild(td);
        })
        tbody.appendChild(tr);
    });
    return tbody;
}