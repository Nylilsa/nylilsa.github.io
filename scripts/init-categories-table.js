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
    table.style.width = "100%";

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
    const thChild = buildToggleableHeader({ targetQuery: ".categories-same-game", titleName: `All ${names1[game]["en"]} pages:` })
    td.classList.add("categories-same-game")
    td.style.paddingBottom = "1em";
    td.colSpan = 2;
    th.colSpan = 2;

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
    th.appendChild(thChild);
    tr.appendChild(td);
    tbody.appendChild(th);
    tbody.appendChild(tr);
    return tbody;
}

function buildRowCategory(selectedGame, selectedIndex, TREE, categories) {
    const tbody = document.createElement('tbody');
    const th = document.createElement('th');
    const rows = [];
    let text;
    if (categories["href"]) {
        text = `All <a class="url" target="_blank" href="${categories["href"]}">${categories["formatted_label"]}-related</a> pages:`;
    } else {
        text = `All <span class="highlight-txt">${categories["formatted_label"]}-related</span> pages:`;
    }
    const thChild = buildToggleableHeader({ targetQuery: `.${categories["class_name"]}`, titleName: text, showDefault: false })
    th.colSpan = 2;
    th.appendChild(thChild);
    tbody.appendChild(th);

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
        rows.push(tr);
    });
    const table = buildSubTable(rows);
    const wrapperTr = buildSubTableWrapper(table, { colspan: 2, tdStyle: 'padding-inline:0px; border-width:0px;', trClass: categories["class_name"] });
    tbody.appendChild(wrapperTr);
    return tbody;
}

function buildRowRelated(selectedGame, selectedIndex, TREE, categories, id) {
    const tbody = document.createElement('tbody');
    const thFirst = document.createElement('tr');
    const th = document.createElement('th');
    const rows = [];
    const text = `Bugs with similar cause:`;
    th.colSpan = 2;
    const thChild = buildToggleableHeader({ targetQuery: `.${id}`, titleName: text, showDefault: false })
    th.appendChild(thChild);
    tbody.appendChild(th);
    // thFirst.appendChild(th);
    // tbody.appendChild(thFirst);

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
        // tbody.appendChild(tr);
        rows.push(tr);
    });
    const table = buildSubTable(rows);
    const wrapperTr = buildSubTableWrapper(table, { colspan: 2, tdStyle: 'padding-inline:0px; border-width:0px;', trClass: id });
    tbody.appendChild(wrapperTr);
    return tbody;
}

// this builds the toggleable header, which creates a title and a button on the right that toggles another element on the page
function buildToggleableHeader({
    targetQuery,
    titleName,
    showDefault = true,
    labels = { show: 'Show', hide: 'Hide' },
    ancestorSelector = null,
}) {
    const span = document.createElement('span');
    const button = document.createElement('button');
    const parent = document.createElement('div');
    function updateUI() {
        button.textContent = showDefault ? labels.hide : labels.show;
        button.setAttribute('aria-expanded', String(showDefault));
    }
    parent.style.display = "grid";
    parent.style.gridTemplateColumns = "1fr auto";
    updateUI();

    // MutationObserver  apply hidden state once target appears
    (function Observer() {
        function applyInitialStateIfPresent() {
            const el = document.querySelector(targetQuery);
            if (!el) return false;
            // apply the initial state: add/remove .hidden according to showDefault
            el.classList.toggle('hidden', !showDefault);
            return true;
        }
        if (applyInitialStateIfPresent()) return;
        // observe the document for insertion of the target
        const observer = new MutationObserver((mutations, obs) => {
            if (applyInitialStateIfPresent()) {
                obs.disconnect();
            }
        });
        const ancestorNode = document.querySelector(ancestorSelector) || document.body || document.documentElement;
        observer.observe(ancestorNode, {
            childList: true,
            subtree: true
        });
        // stop after time if target never appears
        setTimeout(() => {
            try { observer.disconnect(); } catch (e) { console.error(e); }
        }, 5000);
    })();

    button.onclick = () => {
        const target = document.querySelector(targetQuery);
        target.classList.toggle("hidden");
        showDefault = !showDefault;
        updateUI();
    }
    button.style.width = "3rem"
    span.style.paddingLeft = "3rem"
    span.style.width = "100%"
    span.innerHTML = titleName;
    parent.appendChild(span);
    parent.appendChild(button);
    return parent;
}

// this function creates a table with structure: tr > td > "table > tbody > n * tr for nested tables" (only part between the "")
function buildSubTable(rows = [], { tableClass = '', tbodyClass = '' } = {}) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    if (tableClass) table.className = tableClass;
    if (tbodyClass) tbody.className = tbodyClass;
    table.style.width = '100%';
    rows.forEach(row => tbody.appendChild(row));
    table.appendChild(tbody);
    return table;
}

// this function creates a table with structure: "tr > td" > table > tbody > n * tr for nested tables (only part between the "")
function buildSubTableWrapper(table, opts = {}) {
    const { colspan = 1, tdClass, tdStyle, trClass, trStyle } = opts;
    const wrapperTr = document.createElement('tr');
    const wrapperTd = document.createElement('td');
    wrapperTd.colSpan = colspan;
    if (trClass) wrapperTr.className = trClass;
    if (tdClass) wrapperTd.className = tdClass;
    if (trStyle) wrapperTr.style.cssText = trStyle;
    if (tdStyle) wrapperTd.style.cssText = tdStyle;

    wrapperTd.appendChild(table);
    wrapperTr.appendChild(wrapperTd);
    return wrapperTr;
}
