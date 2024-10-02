"use strict";

const globalConfigs = {
    game: null,
    gameCharacters: null,
    selectedDifficulty: null,
    englishName: null,
    overallWRCharacter: null,
    defaultGame: "th13",
    isPc98: false,
    pc98Games: ["th01", "th02", "th03", "th04", "th05"],
}

class Points {
    constructor(date, score, player) {
        this.x = date;
        this.y = score;
        this.player = player;
    }
}

class Data {
    constructor(data, label, color, colorsWithOpacity) {
        let length;
        this.radius = 3.5;
        if (color[0] == 'd') {
            const dashedLength = [2, 4, 10, 17];
            const point = ['rect', 'triangle', 'rectRot', 'star'];
            const r = [4.5, 4.5, 4, 6];
            length = dashedLength[color[1]];
            this.pointStyle = point[color[1]];
            this.borderDash = [length, length];
            this.radius = r[color[1]];
            color = color.slice(2);
        }
        this.borderWidth = 1;
        this.label = label;
        this.data = data;
        this.stepped = true;
        this.pointBackgroundColor = colorsWithOpacity;
        this.pointBorderColor = colorsWithOpacity;
        this.borderColor = color;
    }
}

function callChartJS(fetchedData, time, func) {
    const cond = (globalConfigs.game != "th16" && globalConfigs.game != "th128") || globalConfigs.selectedDifficulty == 'Extra';
    const colors = cond ? colorsForChart[globalConfigs.game]['colors'] : colorsForChart[`${globalConfigs.game}other`]['colors'];
    const colorsWithOpacity = colors.map(color => {
        if (color[0] == 'd') {
            color = color.slice(2);
        }
        return `${color}80`;
    });
    const wrapper = document.getElementById("wr-chart-wrapper");
    const ctx = document.createElement("canvas");
    ctx.setAttribute("class", 'wr-chart');
    wrapper.appendChild(ctx);
    const chartChecker = document.getElementsByClassName('wr-chart');
    if (chartChecker.length != 1) { // removes old and allows for new to be generated
        chartChecker[0].parentNode.removeChild(chartChecker[0])
    }
    let dataset = [];
    for (let i = 0; i < fetchedData.length; i++) {
        const arr = [];
        fetchedData[i].forEach(subelement => {
            const dateObject = subelement.date.replaceAll("/", "-");
            arr.push(new Points(dateObject, subelement.score, subelement.name))
        });
        const character = globalConfigs.gameCharacters[fetchedData.indexOf(fetchedData[i])];
        const playerData = new Data(arr, character, colors[i], colorsWithOpacity[i]);
        dataset.push(playerData);
    }
    new Chart(ctx, {
        maintainAspectRatio: true,
        type: 'line',
        data: {
            labels: [],
            datasets: dataset,
        },
        plugins: [{
            id: 'htmlLegend',
            afterUpdate(chart, args, options) {
                createLegend(chart, args, options, colors, func);
            }
        }
        ],
        options: {
            animation: {
                duration: 0
            },
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: time,
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function (value) {
                            return roundedTicks(value);
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                    },
                    title: {
                        display: true,
                        text: 'Score'
                    }
                }
            },
            plugins: {
                colors: {
                    enabled: true,
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    reverse: false,
                    rtl: false,
                    labels: {
                        boxWidth: 40,
                    },
                },
                htmlLegend: {
                    // ID of the container to put the legend in
                    containerID: 'legend-container',
                },
                title: {
                    display: true,
                    text: `${globalConfigs.englishName} WR History ${globalConfigs.selectedDifficulty}`,
                },
                subtitle: {
                    display: true,
                    text: 'Click on a category in the legend to toggle its visibility'
                },
                tooltip: {
                    callbacks: {
                        title: function (context) {
                            const char = context[0]['dataset']['label'];
                            return "Category: " + char;
                        },
                        beforeLabel: function (context) {
                            const score = context['formattedValue'];
                            return "Score: " + score;
                        },
                        label: function (context) {
                            const player = context['raw']['player'];
                            return "By: " + player;
                        },
                        afterLabel: function (context) {
                            const date = context['label'].split(",", 2).join(",");
                            return "Date: " + date;
                        }
                    }
                }
            }
        },
    });
}

function toggleLegend(chart, items) {
    const top = document.getElementById("legend-toggle-all");
    const li = document.createElement('li');
    const flag = top.classList.contains("show-function");
    while (top.firstChild) {
        top.firstChild.remove();
    }
    const textContainer = document.createElement('p');
    textContainer.classList.add("legend-item");
    let text;
    if (flag) {
        text = document.createTextNode("Show all categories");
    } else {
        text = document.createTextNode("Hide all categories");
    }
    li.style.display = 'flex';
    li.style.justifyContent = 'center';
    li.style.gridColumn = '1/-1';
    li.onclick = () => {
        const arrayOfLength = (length) => { return Array.from({ length }, (_, i) => i) }
        const arr1 = arrayOfLength(items.length);
        sessionStorage.selected = flag ? "[]" : JSON.stringify(arr1);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (flag) {
                top.classList.remove("show-function");
                if (item.hidden) {
                    chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                }
            } else {
                top.classList.add("show-function");
                if (!item.hidden) {
                    chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                }
            }
        }
        chart.update();
    };
    textContainer.appendChild(text);
    li.appendChild(textContainer);
    top.appendChild(li);
    //write stuff that allows toggle Season/Animal button
    if (globalConfigs.game == "th17" || (globalConfigs.game == "th16" && globalConfigs.selectedDifficulty != "Extra")) {
        extraLegendButtons(top, items, chart);
    }
}

function extraLegendButtons(top, items, chart) {
    let sub;
    let n;
    let colors;
    if (globalConfigs.game == "th17") {
        sub = ["Wolf", "Otter", "Eagle"];
        colors = colorsForChart[globalConfigs.game]['colors'];
        top.style.gridTemplateColumns = `repeat(auto-fill, 33%)`;
        n = 3;
    }
    if (globalConfigs.game == "th16") {
        sub = ["Spring", "Summer", "Autumn", "Winter"];
        colors = colorsForChart[`${globalConfigs.game}other`]['colors'];
        top.style.gridTemplateColumns = `repeat(auto-fill, 25%)`;
        n = 4;
    }
    for (let i = 0; i < sub.length; i++) {
        const boxSpan = document.createElement('span');
        const flag = top.classList.contains(`show-${sub[i].toLocaleLowerCase()}`);
        const text = flag ? document.createTextNode(`Show all ${sub[i]}s`) : document.createTextNode(`Hide all ${sub[i]}s`);
        const li = document.createElement("li");
        li.style.paddingTop = '8px';
        li.style.display = 'flex';
        li.style.justifyContent = 'center';
        li.style.alignItems = 'center';
        li.onclick = () => {
            const flag = top.classList.contains(`show-${sub[i].toLocaleLowerCase()}`);
            let indexes = [i, i + n, i + 2 * n];
            if (globalConfigs.game == "th16") {
                indexes = [i, i + n, i + 2 * n, i + 3 * n];
            }
            for (let j = 0; j < indexes.length; j++) {
                const storedSelected = JSON.parse(sessionStorage.selected);
                const index = storedSelected.indexOf(indexes[j]);
                if (index > -1) {
                    storedSelected.splice(index, 1);
                } else {
                    storedSelected.push(indexes[j]);
                }
                sessionStorage.selected = JSON.stringify(storedSelected);
            }
            const selectedCharacters = indexes.map(j => {
                return items[j];
            })
            for (let j = 0; j < selectedCharacters.length; j++) {
                const item = selectedCharacters[j];
                if (flag) {
                    top.classList.remove(`show-${sub[i].toLocaleLowerCase()}`);
                    if (item.hidden) {
                        chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                    }
                } else {
                    top.classList.add(`show-${sub[i].toLocaleLowerCase()}`);
                    if (!item.hidden) {
                        chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                    }
                }
            }
            chart.update();
        };
        boxSpan.style.backgroundColor = `${colors[i]}80`;
        boxSpan.style.borderColor = colors[i];
        boxSpan.classList.add("toggle-buttons-large");
        const textContainer = document.createElement('p');
        textContainer.classList.add("legend-item");
        textContainer.style.color = "#666";
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.appendChild(text);
        li.appendChild(boxSpan);
        top.appendChild(li);
        li.appendChild(textContainer);
    }
}

function runOnce() {
    let hasRun = false;
    return function (func) {
        if (!hasRun) {
            hasRun = true;
            func();
        }
    };
}

function createLegend(chart, args, options, colors, runOnlyOnce) {
    const deselected = JSON.parse(sessionStorage.selected)
    const ul = getOrCreateLegendList(options.containerID);
    while (ul.firstChild) {
        ul.firstChild.remove();
    }
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    toggleLegend(chart, items);
    runOnlyOnce(toggleBetweenDiffs);
    function toggleBetweenDiffs() {
        for (let j = 0; j < deselected.length; j++) {
            const index = deselected[j];
            chart.setDatasetVisibility(index, !chart.isDatasetVisible(index));
        }
        chart.update();
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.justifyContent = 'center';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '0px';
        li.onclick = () => {
            const storedSelected = JSON.parse(sessionStorage.selected);
            const index = storedSelected.indexOf(item.datasetIndex);
            if (index > -1) {
                storedSelected.splice(index, 1);
            } else {
                storedSelected.push(item.datasetIndex);
            }
            sessionStorage.selected = JSON.stringify(storedSelected);
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
            chart.update();
        };
        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.borderStyle = "solid";
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '12px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '40px';
        if (colors[i].length == 7) {
            boxSpan.style.background = `${colors[i]}80`;
        } else {
            const dashedLength = [2, 4, 8, 12];
            const bgLineWidth = dashedLength[Number(colors[i][1])];
            const c = `${colors[i].slice(2)}80`;
            boxSpan.style.background = `repeating-linear-gradient(135deg, ${c}, ${c} ${bgLineWidth}px, #0000 ${bgLineWidth}px, #0000 ${2 * bgLineWidth}px)`;
        }
        // Text
        const textContainer = document.createElement('p');
        textContainer.classList.add("legend-item");
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);
        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        if (ul.children.length < items.length) {
            ul.appendChild(li);
        }
    }
}

function getOrCreateLegendList(id) {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
    let computedCharacters = (100 / globalConfigs.gameCharacters.length) + '%';
    if (!listContainer) {
        listContainer = document.createElement('ul');
        if (globalConfigs.gameCharacters.length > 4) {
            computedCharacters = '16.6666%';
        }
        if (globalConfigs.game == 'th16' || globalConfigs.game == 'th08') {
            computedCharacters = '25%';
        }
        if (globalConfigs.game == 'th17') {
            computedCharacters = '33.333%';
        }
        gridLegend(listContainer, computedCharacters);
        legendContainer.appendChild(listContainer);
    }
    return listContainer;
}

function gridLegend(element, value) {
    element.style.display = 'grid';
    element.style.justifyItems = 'stretch';
    element.style.justifyContent = 'center';
    element.style.gridTemplateColumns = `repeat(auto-fill, minmax(max(${value}, 200px), 1fr))`;
    element.style.padding = `0`;
}

function roundedTicks(value) {
    const largeNumbers = {
        "Millions": {
            "number": 1e6,
            "suffix": 'm'
        },
        "Billions": {
            "number": 1e9,
            "suffix": 'b'
        },
    }
    let decimals = 2;
    let selector = "Billions";
    if (globalConfigs.game == "th01") { selector = "Millions" }
    else if (globalConfigs.game == "th02") { selector = "Millions" }
    else if (globalConfigs.game == "th03") { selector = "Millions"; decimals = 0 }
    else if (globalConfigs.game == "th04") { selector = "Millions"; decimals = 0 }
    else if (globalConfigs.game == "th05") { selector = "Millions"; decimals = 0 }
    else if (globalConfigs.game == "th06") { selector = "Millions"; decimals = 0 }
    else if (globalConfigs.game == "th09") { selector = "Millions"; decimals = 0 }
    else if (globalConfigs.game == "th10") { selector = "Billions"; decimals = 3 }
    else if (globalConfigs.game == "th128") { selector = "Millions"; decimals = 0 }
    return (value / largeNumbers[selector]["number"]).toFixed(decimals) + largeNumbers[selector]["suffix"];
}

function getGame(gameID) {
    let game = gameID.slice(1);
    if (localStorage.selectedGame && game === '') {
        game = localStorage.selectedGame;
    }
    if (game === '') {
        game = globalConfigs.defaultGame;
    }
    globalConfigs.isPc98 = ["th01", "th02", "th03", "th04", "th05"].includes(game);
    return game;
}

function setGame() {
    const game = initRemoveHash(true).slice(1) || globalConfigs.game;
    globalConfigs.game = game;
}

export function initCanvas(gameID) {
    const func = runOnce();
    const game = getGame(gameID);
    if (localStorage.hideUnverified === undefined) {
        localStorage.hideUnverified = false;
    }
    globalConfigs.game = game;
    localStorage.selectedGame = game;
    sessionStorage.selected = "[]";
    loadCanvas(undefined, func);
    styleGameSelectorButtons();
    styleToggleSwitch();
    Promise.all([
        fetchData('json/gameinfo.json'),
        fetchData(`json/players.json`)
    ]).then(([data, allPlayerData]) => {
        const allDifficulties = data['Difficulty'][globalConfigs.game];
        styleGameDifficultyButtons(allDifficulties);
        createDropdown(allPlayerData);
    });
}

function loadCanvas(difficulty = "Lunatic", func) {
    globalConfigs.selectedDifficulty = difficulty;
    setGame();
    const twoYears = 63072000000;
    const now = new Date().getTime();
    let fetchedData = [];
    Promise.all([
        fetchData('json/gameinfo.json'),
        fetchData(`json/wr/unverified/${globalConfigs.game}.json`),
        fetchData(`json/wr/verified/${globalConfigs.game}.json`),
        fetchData(`json/players.json`)
    ]).then(([data, unverified, verified, allPlayerData]) => {
        globalConfigs.englishName = data['Names'][globalConfigs.game]['en'];
        const releaseDate = new Date(data['LatestReleaseDate'][globalConfigs.game]).getTime();
        const time = releaseDate > now - twoYears ? 'month' : 'year';
        if ((globalConfigs.game != "th16" && globalConfigs.game != "th128") || globalConfigs.selectedDifficulty == 'Extra') {
            globalConfigs.gameCharacters = data['Characters'][globalConfigs.game];
        } else {
            globalConfigs.gameCharacters = data['Characters'][`${globalConfigs.game}other`];
        }
        const maxValue = [];
        const hidesUnverified = JSON.parse(localStorage.hideUnverified);
        const wrData = hidesUnverified ? mergeEntries(verified) : mergeEntries(verified, unverified) ?? mergeEntries(verified);
        addNamesToData(wrData, allPlayerData);
        globalConfigs.gameCharacters.forEach(char => {
            const history = wrData[globalConfigs.selectedDifficulty][char];
            const maxScoreOfShot = history.length == 0 ? 0 : history[history.length - 1].score;
            maxValue.push(maxScoreOfShot);
            fetchedData.push(history);
        })
        globalConfigs.overallWRCharacter = globalConfigs.gameCharacters[maxValue.indexOf(Math.max.apply(null, maxValue))];
        generateWRButtons();
        generateWRTable(fetchedData);
        callChartJS(fetchedData, time, func);
    })
    return;
}

function addNamesToData(data, playerData) {
    const difficulties = Object.keys(data);
    difficulties.forEach((difficulty) => {
        const characters = Object.keys(data[difficulty]);
        characters.forEach((character) => {
            const entries = data[difficulty][character];
            entries.forEach(entry => {
                entry.name = createName(playerData[entry.id], true);
            })

        })
    })
}

function createName(obj, enableFormatting) {
    let en;
    const jp = obj?.name_jp;
    if (obj?.name_en === undefined) {
        en = "NO NAME";
        console.error(`The id ${obj?.id} does not exist`);
    } else {
        en = obj?.name_en;
    }
    if (enableFormatting && (jp === undefined || jp === "")) {
        return en;
    } else if (!enableFormatting && (jp === undefined || jp === "")) {
        return en.toLowerCase();
    } else if (enableFormatting) {
        return `${jp} (${en})`;
    } else {
        return `${jp}${en}`.toLowerCase(); // no spaces or () for name matching in search
    }
}

function mergeEntries(verified, unverified) {
    const output = {};
    const difficulties = Object.keys(verified);
    difficulties.forEach((difficulty) => {
        output[difficulty] = {};
        const characters = Object.keys(verified[difficulty]);
        characters.forEach((character) => {
            const verifiedEntry = verified[difficulty][character];
            const unverifiedEntry = unverified?.[difficulty]?.[character] ?? [];
            // this is to distinct unverified from verified entries when they have been merged
            unverifiedEntry.forEach(entry => {
                entry.isUnverified = true;
            })
            const total = [...verifiedEntry, ...unverifiedEntry];
            total.sort((a, b) => new Date(a.date) - new Date(b.date)); // sort by date
            reduceByScore(total);
            output[difficulty][`${character}`] = total;
        })
    })
    return removeInvalidEntries(output);
}

function reduceByScore(arr) {
    let highest = 0;
    let removedElements = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].score > highest) {
            highest = arr[i].score;
        } else {
            removedElements.push(arr[i]);
            arr.splice(i, 1);
            i--;
        }
    }
    return removedElements;
}

function removeInvalidEntries(data) {
    Object.keys(data).forEach((difficulty) => {
        Object.keys(data[difficulty]).forEach((character) => {
            let newScore = 0;
            let newDate = 0;
            const entry = data[difficulty][character];
            let previousEntry;
            for (let i = 0; i < entry.length; i++) {
                const flagScore = (parseInt(entry[i].score) >= newScore);
                newScore = parseInt(entry[i].score);
                const flagDate = (new Date(entry[i].date).getTime() >= newDate);
                newDate = new Date(entry[i].date).getTime();
                if (!flagScore || !flagDate) {
                    console.error(`Error: Score ${previousEntry.score} from ${previousEntry.id} shot ${character} is incorrect`)
                    entry.splice(i - 1, 1); // removes entry of previousEntry from array;
                    i--; // makes sure i value is not updated
                }
                previousEntry = entry[i];
            }
        })
    })
    return data;
}

function createDropdown(allPlayerData) {
    const filterInput = document.getElementById('filterInput');
    const dropdown = document.getElementById('nameDropdown');
    const scoresTable = document.getElementById('scoresTable');
    const scoreInfo = document.getElementById('scoreInfo');
    const nameCount = document.getElementById('nameCount');
    const sortedEntries = Object.entries(allPlayerData).sort((a, b) => {
        return a[1].name_en.localeCompare(b[1].name_en);
    });
    const sortedDataArray = sortedEntries.map(entry => ({ [entry[0]]: entry[1] }));
    for (const obj of sortedDataArray) {
        const id = Object.keys(obj)[0];
        const value = obj[id];
        const option = document.createElement('option');
        const name = createName(value, true);
        option.value = name;
        option.textContent = name;
        option.dataset.searchName = createName(value, false);
        option.dataset.id = id;
        dropdown.appendChild(option);
    }
    if (!isNaN(Number(localStorage.selectedWRId))) {
        let a = document.querySelector(`[data-id="${localStorage.selectedWRId}"]`);
        if (!a) { // if tag does not exists for whatever reason, default to 0
            localStorage.selectedWRId = 0;
            a = document.querySelector(`[data-id="${localStorage.selectedWRId}"]`);
        }
        a.selected = "selected";
        makeTable(localStorage.selectedWRId);
    }
    dropdown.addEventListener('change', (event) => {
        const selectedId = event.target.selectedOptions[0].dataset.id;
        localStorage.selectedWRId = selectedId;
        makeTable(selectedId);
    });
    filterInput.addEventListener('input', () => {
        let matches = 0;
        const filterValue = filterInput.value.toLowerCase();
        const options = dropdown.options;
        for (let i = 1; i < options.length; i++) {
            if (options[i].dataset.searchName.includes(filterValue)) {
                options[i]?.classList?.remove('hidden'); // Show matching option
                matches++;
            } else {
                options[i]?.classList?.add('hidden'); // Hide non-matching option
            }
        }
        nameCount.innerText = matches;
    });

    nameCount.innerText = Object.entries(allPlayerData).length - 1; // minus 1 bc first entry doesnt count

    async function makeTable(id) {
        id = Number(id);
        const playerInfo = (await fetchData("json/players.json"))[id];
        const fullName = createName(playerInfo, true);
        const selectedEntries = [];
        const categories = [
            { type: 'verified', data: playerInfo.verified },
            { type: 'unverified', data: playerInfo.unverified }
        ];
        for (const { type, data } of categories) {
            if (!data) continue; // Skip if there is no verified or unverified data
            for (const [gameId, difficulties] of Object.entries(data)) {
                const gameInfo = await fetchData(`json/wr/${type}/${gameId}.json`);
                for (const [difficulty, shottypes] of Object.entries(difficulties)) {
                    shottypes.forEach((shottype) => {
                        // console.log(gameId + difficulty + shottype);
                        const category = gameInfo[difficulty][shottype];
                        category.forEach((node) => {
                            if (node.id == id) {
                                node.game = gameId;
                                node.difficulty = difficulty;
                                node.shot = shottype;
                                node.verified = (type === 'verified');
                                selectedEntries.push(node);
                            }
                        });
                    });
                }
            }
        }
        // Sorts by descending date 
        selectedEntries.sort((entry1, entry2) => {
            const date1 = new Date(entry1.date);
            const date2 = new Date(entry2.date);
            return date2 - date1;
        });
        document.getElementById('wrCount').innerText = selectedEntries.length;

        const table = document.createElement("table");
        const tblBody = document.createElement("tbody");
        const headers = ["#", "Game", "Difficulty", "Shot/Route", "Score", "Player", "Date"];
        for (let j = 0; j < selectedEntries.length; j++) { // rows
            let row = document.createElement("tr");
            const entry = selectedEntries[j];
            let pathToSite;
            if (entry.verified) {
                if (globalConfigs.pc98Games.includes(entry.game) && entry.sources) { // is pc98 and has source
                    pathToSite = entry.sources[0]
                } else if (!globalConfigs.pc98Games.includes(entry.game)) {
                    const rpyName = `${entry.game}_${entry.difficulty}_${entry.shot}_${entry.score}.rpy`.toLowerCase();
                    pathToSite = `https://github.com/Nylilsa/wr-replays/raw/main/${entry.game}/${entry.difficulty}/${entry.shot}/${rpyName}`;
                }
            }
            const dateFormatted = dateFormat(entry.date);
            const scoreWithCommas = entry.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            styleUnverified(entry.verified, row);
            if (j == 0) { // header column
                for (let k = 0; k < headers.length; k++) {
                    const cell = document.createElement("th");
                    const cellText = document.createTextNode(`${headers[k]}`);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    if (k == (headers.length - 1)) {
                        tblBody.appendChild(row);
                        row = document.createElement("tr");
                    }
                }
            }
            for (let k = 0; k < headers.length; k++) { // entry columns
                let cellText;
                const cell = document.createElement("td");
                switch (k) {
                    case 0: { cellText = document.createTextNode(j + 1); break; }
                    case 1: { cellText = document.createTextNode(`${names1[entry.game]["abbreviation"]}`); break; }
                    case 2: { cellText = document.createTextNode(`${entry.difficulty}`); break; }
                    case 3: { cellText = document.createTextNode(entry.shot); break; }
                    case 4: {
                        if (entry.verified && pathToSite) {
                            cellText = document.createElement(`a`);
                            cellText.target = '_blank';
                            cellText.innerText = scoreWithCommas;
                            cellText.classList.add("url");
                            cellText.href = pathToSite;
                        } else {
                            cellText = document.createTextNode(`${scoreWithCommas}`);
                        }
                        break;
                    }
                    case 5: { cellText = document.createTextNode(`${fullName}`); break; }
                    case 6: { cellText = document.createTextNode(`${dateFormatted}`); break; }
                    default: { console.error(`Oops, something went wrong.`) }
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
            table.appendChild(tblBody);
            table.classList.add("wr-player-table");
            table.style.marginInline = "auto";
            scoresTable.replaceChildren(table);
        }
        scoreInfo.style.display = 'block';
    }
}

function styleUnverified(isUnverified, row) {
    if (!isUnverified) { return; }
    // row.style.color = "var(--clr-default)";
}

function styleToggleSwitch() {
    const selector = document.getElementById("wr-toggle-switch");
    const options = ["Show unverified records", "Hide unverified records"];
    const ids = ["show-unverified", "hide-unverified"];
    const state = JSON.parse(localStorage.hideUnverified);
    for (let i = 0; i < 2; i++) {
        const createButton = document.createElement("button");
        createButton.innerText = options[i];
        createButton.id = ids[i];
        createButton.addEventListener("click", function () {
            const func = runOnce();
            const difficulty = getDifficultyFromButtons();
            loadCanvas(difficulty, func);
            const children = selector.childNodes;
            children.forEach((element) => {
                element.classList.remove('selected-full');
            });
            createButton.setAttribute("class", "selected-full");
            if (this.id == "hide-unverified") {
                localStorage.hideUnverified = true;
            } else {
                localStorage.hideUnverified = false;
            }
        });
        selector.appendChild(createButton);
    }
    if (state) {
        selector.childNodes[1].setAttribute("class", "selected-full");
    } else {
        selector.childNodes[0].setAttribute("class", "selected-full");
    }
}

function getDifficultyFromButtons() {
    const diffSelector = document.getElementById("wr-difficulty-buttons");
    let output;
    diffSelector.childNodes.forEach((child) => {
        if (child.classList.contains("selected-full")) {
            output = child.dataset.difficulty;
        }
    })
    return output;
}

function styleGameDifficultyButtons(allDifficulties) {
    const diffSelector = document.getElementById("wr-difficulty-buttons");
    allDifficulties.forEach(difficulty => {
        const createButton = document.createElement("button");
        createButton.setAttribute("class", difficulty);
        createButton.innerText = difficulty;
        createButton.dataset.difficulty = difficulty;
        createButton.addEventListener("click", selectDifficulty);
        if (difficulty === "Lunatic") {
            createButton.setAttribute("class", "selected-full");
        }
        function selectDifficulty() {
            const func = runOnce();
            loadCanvas(difficulty, func);
            const children = diffSelector.childNodes;
            children.forEach((element) => {
                element.classList.remove('selected-full');
            });
            this.setAttribute("class", "selected-full");
            const top = document.getElementById("legend-toggle-all");
            top.className = '';
        }
        diffSelector.appendChild(createButton);
    });
}

function styleGameSelectorButtons() {
    const parent = document.getElementsByClassName("card-game");
    for (let i = 0; i < parent.length; i++) {
        const button = parent[i];
        const btndata = button.dataset.game;
        button.style.backgroundColor = gameColors[btndata];
        button.title = `${names1[btndata]["jp"]} 〜 ${names1[btndata]["en"]}`
        button.children[0].style.backgroundImage = `url(assets/thcovers/smaller/${btndata}.jpg)`;
        button.children[2].style.backgroundColor = gameColors[btndata];
        button.children[1].innerText = names1[btndata]["jp"];
        button.children[1].style.backgroundColor = colorRGB(-64, 0.2, btndata);
        button.children[4].style.backgroundColor = gameColors[btndata];
        button.addEventListener("click", selectGame);
        function selectGame() {
            window.location.hash = `#/wr#${this.dataset.game}`;
        }
    }
    const selector = document.getElementById("wr-game-buttons");
    // const array = ['th01', 'th02', 'th03', 'th04', 'th05', 'th06', 'th07', 'th08', 'th09', 'th10', 'th11', 'th12', 'th128', 'th13', 'th14', 'th15', 'th16', 'th17', 'th18'];
    const array = ['th01', 'th02', 'th03', 'th04', 'th05', 'th06', 'th07', 'th08', 'th10', 'th11', 'th12', 'th128', 'th13', 'th14', 'th15', 'th16', 'th17', 'th18'];
    // const array = ['th06', 'th07', 'th08', 'th10', 'th11', 'th12', 'th128', 'th13', 'th14', 'th15', 'th16', 'th17', 'th18'];
    const width = selector.scrollWidth;
    const index = array.indexOf(globalConfigs.game);
    const max = array.length;
    const number = index / max * width;
    selector.scrollLeft = number;
}

function setButtonLogic(id) {
    const button = document.getElementById(id);
    button.addEventListener("click", selectGame);
    function selectGame() {
        const otherTables = document.getElementsByClassName("all-wr-tables");
        const otherButtons = document.getElementsByClassName("wr-shottype-buttons");
        Array.prototype.forEach.call(otherTables, function (child) {
            child.style.display = "none";
        });
        Array.prototype.forEach.call(otherButtons, function (child) {
            child.style.backgroundColor = "";
            child.style.color = "";
            child.style.border = "";
        });
        const selectedTable = document.getElementById(`${id}table`);
        selectedTable.style.display = "";
        this.style.color = "#ddd";
    }
}

function generateWRButtons() {
    const section = document.getElementById("wr-table-buttons");
    while (section.children.length > 0) { // removes old and allows for new to be generated
        section.removeChild(section.children[0]);
    }
    for (let i = 0; i < globalConfigs.gameCharacters.length; i++) {
        const button = document.createElement("button");
        const id = `${globalConfigs.game}${globalConfigs.gameCharacters[i]}`;
        button.setAttribute("id", id);
        button.setAttribute("class", "wr-shottype-buttons");
        button.innerText = globalConfigs.gameCharacters[i];
        if (globalConfigs.gameCharacters[i] == globalConfigs.overallWRCharacter) {
            button.style.color = "#ddd";
        }
        if (globalConfigs.game == "th03") {
            section.style.gridTemplateColumns = "repeat(3, 1fr)";
            section.style.gridTemplateRows = " repeat(3, 1fr)";
            section.style.gridAutoFlow = "row";
        }
        if (globalConfigs.game == "th08") {
            section.style.gridTemplateColumns = "repeat(8, 1fr)";
            section.style.gridTemplateRows = " repeat(2, 1fr)";
            section.style.gridAutoFlow = "row";
            section.classList.add("grid-th08");
            if (i < 4) {
                button.style.gridColumn = "span 2";
            }
        }
        if (globalConfigs.game == "th09") {
            section.style.gridTemplateColumns = "repeat(7, 1fr)";
            section.style.gridTemplateRows = " repeat(2, 1fr)";
            section.style.gridAutoFlow = "row";
            section.classList.add("grid-th09");
        }
        if (globalConfigs.game == "th07" || globalConfigs.game == "th12" || (globalConfigs.game == "th128" && globalConfigs.selectedDifficulty != "Extra") || globalConfigs.game == "th14") {
            section.style.gridTemplateColumns = "repeat(6, 1fr)";
            section.style.gridTemplateRows = " repeat(1, 1fr)";
            section.style.gridAutoFlow = "row";
            section.classList.add("grid-6-ab");
        }
        if (globalConfigs.game == "th10" || globalConfigs.game == "th11") {
            section.style.gridTemplateColumns = "repeat(6, 1fr)";
            section.style.gridTemplateRows = " repeat(1, 1fr)";
            section.style.gridAutoFlow = "row";
            section.classList.add("grid-6-abc");
        }
        if (globalConfigs.game == "th128" && globalConfigs.selectedDifficulty == "Extra") {
            section.style.gridTemplateColumns = "";
            section.style.gridTemplateRows = "";
            section.style.gridAutoFlow = "row";
        }
        if (globalConfigs.game == "th16" && globalConfigs.selectedDifficulty != "Extra") {
            section.style.gridTemplateColumns = "repeat(4, 1fr)";
            section.style.gridTemplateRows = " repeat(4, 1fr)";
            section.style.gridAutoFlow = "row";
            section.classList.add("grid-th16");
        }
        if (globalConfigs.game == "th16" && globalConfigs.selectedDifficulty == "Extra") {
            section.style.gridTemplateColumns = "repeat(4, 1fr)";
            section.style.gridTemplateRows = "";
            section.style.gridAutoFlow = "row";
            section.classList.remove("grid-th16");
        }
        if (globalConfigs.game == "th17") {
            section.style.gridTemplateColumns = "repeat(3, 1fr)";
            section.style.gridTemplateRows = " repeat(3, 1fr)";
            section.style.gridAutoFlow = "row";
        }
        section.appendChild(button);
        setButtonLogic(id);
    }
}

function generateWRTable(data, flag = true) {
    const section = document.getElementById("wr-tables");
    const length = section.children.length;
    if (length > 0) { // removes old and allows for new to be generated
        for (let i = 0; i < length; i++) {
            section.removeChild(section.children[0]);
        }
    }
    for (let i = 0; i < data.length; i++) { // tables
        const reverse = flag ? data[i].length - 1 : 0;
        const table = document.createElement("table");
        const tblBody = document.createElement("tbody");
        const selector = (globalConfigs.game == "th01" || globalConfigs.game == "th128") ? "Route" : "Shottype";
        const headers = ["#", "Difficulty", selector, "Score", "Player", "Date", "Score gain"];
        const id = `${globalConfigs.game}${globalConfigs.gameCharacters[i]}`;
        table.setAttribute("id", `${id}table`);
        table.classList.add('all-wr-tables');
        if (i != globalConfigs.gameCharacters.indexOf(globalConfigs.overallWRCharacter)) {
            table.style.display = "none";
        }
        for (let j = 0; j < data[i].length; j++) { // rows
            let row = document.createElement("tr");
            const index = Math.abs(j - reverse);
            const { score, name, date, isUnverified, sources } = data[i][index];
            // const isUnverified = isUnverified?.["isUnverified"] ?? false;
            styleUnverified(isUnverified, row);
            const dateFormatted = dateFormat(date);
            const nextScore = data[i][index - 1]?.score ?? 0;
            const scoreDifference = (score - nextScore).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let scoreWithCommas = score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (j == 0) { // header column
                for (let k = 0; k < headers.length; k++) {
                    const cell = document.createElement("th");
                    const cellText = document.createTextNode(`${headers[k]}`);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    if (k == (headers.length - 1)) {
                        tblBody.appendChild(row);
                        row = document.createElement("tr");
                    }
                }
            }
            for (let k = 0; k < headers.length; k++) { // entry columns
                let cellText;
                const cell = document.createElement("td");
                let pathToSite;
                if (!isUnverified) {
                    if (globalConfigs.isPc98) {
                        pathToSite = sources[0]
                    } else {
                        const rpyName = `${globalConfigs.game}_${globalConfigs.selectedDifficulty}_${globalConfigs.gameCharacters[i]}_${score}.rpy`.toLowerCase();
                        pathToSite = `https://github.com/Nylilsa/wr-replays/raw/main/${globalConfigs.game}/${globalConfigs.selectedDifficulty}/${globalConfigs.gameCharacters[i]}/${rpyName}`;
                    }

                }
                switch (k) {
                    case 0: { cellText = document.createTextNode(j + 1); break; }
                    case 1: { cellText = document.createTextNode(`${globalConfigs.selectedDifficulty}`); break; }
                    case 2: { cellText = document.createTextNode(globalConfigs.gameCharacters[i]); break; }
                    case 3: {
                        if (!isUnverified && pathToSite) {
                            cellText = document.createElement(`a`);
                            cellText.target = '_blank';
                            cellText.innerText = scoreWithCommas;
                            cellText.classList.add("url");
                            cellText.href = pathToSite;
                        } else {
                            cellText = document.createTextNode(`${scoreWithCommas}`);
                        }
                        break;
                    }
                    case 4: { cellText = document.createTextNode(`${name}`); break; }
                    case 5: { cellText = document.createTextNode(`${dateFormatted}`); break; }
                    case 6: { cellText = document.createTextNode(`+${scoreDifference}`); break; }
                    default: { console.error(`Oops, something went wrong.`) }
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
            table.appendChild(tblBody);
            section.appendChild(table);
        }
    }
}