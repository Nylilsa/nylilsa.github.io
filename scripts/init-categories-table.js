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
    thead.appendChild(buildTitle(currentPage));
    table.appendChild(thead);

    // Body rows
    const tbody = document.createElement("tbody");
    const thSameGame = buildRowSameGame(game, TREE[game], index)
    tbody.appendChild(thSameGame);

    tagList.forEach(tag => {
        const thSameCategory = buildRowCategory(game, index, TREE, CATEGORIES["tags"][tag]);
        tbody.appendChild(thSameCategory);
    });
    
    if (currentPage.categories.related) {
        const thRelated = buildRowRelated(game, index, TREE, CATEGORIES["related"], currentPage.categories.related);
        tbody.appendChild(thRelated);
    }

    table.appendChild(tbody);
    tableId.appendChild(table);
}

function buildTitle(currentPage) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = currentPage.title;
    th.colSpan = 2;
    tr.appendChild(th);
    return tr;
}

function buildRowSameGame(game, gameBugs, selectedIndex) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td = document.createElement('td');
    td.style.paddingBottom = "1em";
    th.style.width = "11.36%";
    th.textContent = `All ${game} pages:`;

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
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td = document.createElement('td');
    td.style.paddingBottom = "1em";

    th.innerHTML = `All <span class="highlight-txt">${categories["formatted_label"]}</span> pages:`;

    Object.keys(categories["tree-mapping"]).forEach(game => {
        categories["tree-mapping"][game].forEach((index) => {
            const obj = TREE[game][index]
            if (selectedGame === game && index === Number(selectedIndex)) { // if match equals current page
                const span = document.createElement("span");
                span.textContent = `${game} - ${obj["title"]}`;
                td.appendChild(span);
            } else {
                const a = document.createElement('a');
                const url = `${window.location.origin}/#/bugs/${game}/${obj["url-name"][0]}`
                a.classList.add("url");
                // a.target = "_blank"
                a.href = url;
                a.textContent = `${game} - ${obj["title"]}`;
                td.appendChild(a);
            }
            const notLast = !(Object.keys(categories["tree-mapping"]).indexOf(game) == Object.keys(categories["tree-mapping"]).length - 1 && categories["tree-mapping"][game].indexOf(index) === categories["tree-mapping"][game].length - 1);
            if (notLast) {
                td.appendChild(document.createTextNode(" · "));
            }
        })
    });

    tr.appendChild(th);
    tr.appendChild(td);
    return tr;
}

function buildRowRelated(selectedGame, selectedIndex, TREE, categories, id) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td = document.createElement('td');
    td.style.paddingBottom = "1em";

    th.textContent = `Same-cause bugs:`;

    Object.keys(categories[id]).forEach(game => {
        categories[id][game].forEach((index) => {
            const obj = TREE[game][index]
            if (selectedGame === game && index === Number(selectedIndex)) { // if match equals current page
                const span = document.createElement("span");
                span.textContent = `${game}: ${obj["title"]}`;
                td.appendChild(span);
            } else {
                const a = document.createElement('a');
                const url = `${window.location.origin}/#/bugs/${game}/${obj["url-name"][0]}`
                a.classList.add("url");
                // a.target = "_blank"
                a.href = url;
                a.textContent = `${game}: ${obj["title"]}`;
                td.appendChild(a);
            }
            const notLast = !(Object.keys(categories[id]).indexOf(game) == Object.keys(categories[id]).length - 1 && categories[id][game].indexOf(index) === categories[id][game].length - 1);
            if (notLast) {
                td.appendChild(document.createTextNode(" · "));
            }
        })
    });

    tr.appendChild(th);
    tr.appendChild(td);
    return tr;
}