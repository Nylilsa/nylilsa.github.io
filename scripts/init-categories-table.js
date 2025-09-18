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
    // head
    const thead = document.createElement('thead');
    thead.appendChild(buildTitle(game, currentPage));
    table.appendChild(thead);

    // Body rows
    const tbody = document.createElement("tbody");
    const thSameGame = buildRowSameGame(game, TREE[game], index)
    tbody.appendChild(thSameGame);

    tagList.forEach(tag => {
        const thSameCategoryRows = buildRowCategory(game, index, TREE, CATEGORIES["tags"][tag]);
        thSameCategoryRows.forEach((row) => {
            tbody.appendChild(row);
        })
    });

    if (currentPage.categories.related) {
        const thRelatedRows = buildRowRelated(game, index, TREE, CATEGORIES["related"], currentPage.categories.related);
        thRelatedRows.forEach((row) => {
            tbody.appendChild(row);
        })
    }

    table.appendChild(tbody);
    tableId.appendChild(table);
}

function buildTitle(game, currentPage) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = `${names1[game]["en"]}: ${currentPage.title}`;
    th.colSpan = 3;
    tr.appendChild(th);
    return tr;
}

function buildRowSameGame(game, gameBugs, selectedIndex) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td = document.createElement('td');
    td.style.paddingBottom = "1em";
    td.colSpan = 2;
    th.style.width = "11.36%";
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
    return tr;
}

function buildRowCategory(selectedGame, selectedIndex, TREE, categories) {
    const elements = [];
    const thFirst = document.createElement('tr');
    const th = document.createElement('th');
    if (categories["href"]) {
        th.innerHTML = `All <a class="url" target="_blank" href="${categories["href"]}">${categories["formatted_label"]}-related</a> pages:`;
    } else {
        th.innerHTML = `All <span class="highlight-txt">${categories["formatted_label"]}-related</span> pages:`;
    }
    th.rowSpan = Object.keys(categories["tree-mapping"]).length + 1;
    thFirst.appendChild(th);
    elements.push(thFirst);

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
        elements.push(tr);
    });


    return elements;
}

function buildRowRelated(selectedGame, selectedIndex, TREE, categories, id) {
    const elements = [];
    const thFirst = document.createElement('tr');
    const th = document.createElement('th');
    th.innerHTML = `Bugs with similar cause:`;
    th.rowSpan = Object.keys(categories[id]).length + 1;
    thFirst.appendChild(th);
    elements.push(thFirst);

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
        elements.push(tr);
    });


    return elements;
}