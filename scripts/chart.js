"use strict";

export class Points {
    constructor(date, score, player) {
      this.x = date;
      this.y = score;
      this.player = player;
    }
}

export class Data {
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

export function callChartJS(fetchedData, gameCharacters, englishName, difficulty, time, game, func) {
    let colors;
    if ((game != "th16" && game != "th128") || difficulty == 'Extra') {
        colors = colorsForChart[game]['colors'];
    } else {
        colors = colorsForChart[`${game}other`]['colors'];
    }
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
    if(chartChecker.length != 1) { // removes old and allows for new to be generated
        chartChecker[0].parentNode.removeChild(chartChecker[0])
    }
    let dataset = [];
    for(let i=0; i<fetchedData.length; i++) {
        const arr = [];
        fetchedData[i].forEach(subelement => {
            const dateObject = subelement[2].replaceAll("/", "-");
            arr.push(new Points(dateObject, subelement[0], subelement[1]))
        });
        const character = gameCharacters[fetchedData.indexOf(fetchedData[i])];
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
                createLegend(chart, args, options, gameCharacters, colors, game, difficulty, func);
            }
        }
    ],
        options: {
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
                        callback: function(value, index, values) {
                            return roundedTicks(value, index, values, game);
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
                    text: `${englishName} WR History ${difficulty}`,
                },
                subtitle: {
                    display: true,
                    text: 'Click on a category in the legend to toggle its visibility'
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const char = context[0]['dataset']['label'];
                            return "Category: "+char;
                        },
                        beforeLabel: function(context) {
                            const score = context['formattedValue'];
                            return "Score: "+score;
                        },
                        label: function(context) {
                            const player = context['raw']['player'];
                            return "By: "+player;
                        },
                        afterLabel: function(context) {
                            const date = context['label'].split(",", 2).join(",");
                            return "Date: "+date;
                        }
                    }
                }
            }
        },
    });
}

export function toggleLegend(chart, items, game, difficulty) {
    const top = document.getElementById("legend-toggle-all");
    const li = document.createElement('li');
    const flag = top.classList.contains("show-function");
    while (top.firstChild) {
        top.firstChild.remove();
    }
    const textContainer = document.createElement('p');
    textContainer.classList.add("legend-item");
    textContainer.style.color = "#666";
    textContainer.style.margin = 0;
    textContainer.style.padding = 0;
    let text;
    if (flag) {
        text = document.createTextNode("Show all categories");
    } else {
        text = document.createTextNode("Hide all categories");
    }
    top.style.alignItems = 'center';
    top.style.cursor = 'pointer';
    top.style.justifyContent = 'center';
    top.style.display = 'grid';
    top.style.padding = '8px';
    li.style.display = 'flex';
    li.style.justifyContent = 'center';
    li.style.gridColumn = '1/-1';
    li.onclick = () => {
        const arrayOfLength = (length) => {return Array.from({length}, (_, i) => i)}
        const arr1 = arrayOfLength(items.length);
        sessionStorage.selected = flag ? "[]" : JSON.stringify(arr1);
        for (let i=0; i<items.length; i++) {
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
    if(game == "th17" || (game == "th16" && difficulty != "Extra")) {
        extraLegendButtons(top, game, items, chart);
    }
}

export function extraLegendButtons(top, game, items, chart) {
    let sub;
    let n;
    let colors;
    if (game == "th17") {
        sub = ["Wolf", "Otter", "Eagle"];
        colors = colorsForChart[game]['colors'];
        top.style.gridTemplateColumns = `repeat(auto-fill, 33%)`;
        n = 3;
    }
    if (game == "th16") {
        sub = ["Spring", "Summer", "Autumn", "Winter"];
        colors = colorsForChart[`${game}other`]['colors'];
        top.style.gridTemplateColumns = `repeat(auto-fill, 25%)`;
        n = 4;
    }
    for (let i=0; i<sub.length; i++) {
        const boxSpan = document.createElement('span');
        const flag = top.classList.contains(`show-${sub[i].toLocaleLowerCase()}`);
        let text;
        if (flag) {
            text = document.createTextNode(`Show all ${sub[i]}s`);
        } else {
            text = document.createTextNode(`Hide all ${sub[i]}s`);
        }
        const li = document.createElement("li");
        li.style.paddingTop = '8px';
        li.style.display = 'flex';
        li.style.justifyContent = 'center';
        li.style.alignItems = 'center';
        li.onclick = () => {
            const flag = top.classList.contains(`show-${sub[i].toLocaleLowerCase()}`);
            let indexes = [i, i + n, i + 2*n];
            if (game == "th17") {
                indexes = [i, i + n, i + 2*n];
            }
            if (game == "th16") {
                indexes = [i, i + n, i + 2*n, i + 3*n];
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
            for (let j=0; j<selectedCharacters.length; j++) {
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
        boxSpan.style.background = `${colors[i]}80`;
        boxSpan.style.borderColor = colors[i];
        boxSpan.style.borderWidth = 1+'px';
        boxSpan.style.borderStyle  = "solid";
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '12px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '40px';
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

export function runOnce() {
    let hasRun = false;
    return function(func) {
        if (!hasRun) {
            hasRun = true;
            func();
        }
    };
}

export function createLegend(chart, args, options, gameCharacters, colors, game, difficulty, runOnlyOnce) {
    const deselected = JSON.parse(sessionStorage.selected)
    const ul = getOrCreateLegendList(game, options.containerID, gameCharacters);
    while (ul.firstChild) {
        ul.firstChild.remove();
    }
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    toggleLegend(chart, items, game, difficulty);
    runOnlyOnce(toggleBetweenDiffs);
    function toggleBetweenDiffs() {
        for (let j=0; j < deselected.length; j++) {
            const index = deselected[j];
            chart.setDatasetVisibility(index, !chart.isDatasetVisible(index));
        }
        chart.update();
    }
    for (let i=0; i<items.length; i++) {
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
        boxSpan.style.borderStyle  = "solid";
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
            boxSpan.style.background = `repeating-linear-gradient(135deg, ${c}, ${c} ${bgLineWidth}px, #0000 ${bgLineWidth}px, #0000 ${2*bgLineWidth}px)`;
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

export function getOrCreateLegendList(game, id, gameCharacters) {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
    let computedCharacters = (100 / gameCharacters.length)+'%';
    if (!listContainer) {
        listContainer = document.createElement('ul');
        if (gameCharacters.length > 4) {
            computedCharacters = '16.6666%';
        }
        if (game == 'th16' || game == 'th08') {
            computedCharacters = '25%';
        }
        if (game == 'th17') {
            computedCharacters = '33.333%';
        }
        gridLegend(listContainer, computedCharacters);
        legendContainer.appendChild(listContainer);
    }
    return listContainer;
}

export function gridLegend(element, value) {
    element.style.display = 'grid';
    element.style.justifyItems = 'stretch';
    element.style.justifyContent = 'center';
    element.style.gridTemplateColumns = `repeat(auto-fill, minmax(max(${value}, 200px), 1fr))`;
    element.style.padding = `0`;
}

export function roundedTicks(value, index, values, game) {
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
    if (game == "th01") {selector = "Millions"}
    if (game == "th02") {selector = "Millions"}
    if (game == "th03") {selector = "Millions"; decimals = 0}
    if (game == "th04") {selector = "Millions"; decimals = 0}
    if (game == "th05") {selector = "Millions"; decimals = 0}
    if (game == "th06") {selector = "Millions"; decimals = 0}
    if (game == "th09") {selector = "Millions"; decimals = 0}
    if (game == "th10") {selector = "Billions"; decimals = 3}
    if (game == "th128") {selector = "Millions"; decimals = 0}
    return (value / largeNumbers[selector]["number"]).toFixed(decimals) + largeNumbers[selector]["suffix"];
}

export function initCanvas(gameID, difficulty) {
    const func = runOnce();
    let game = gameID.slice(1); 
    if (localStorage.selectedGame && game === '') {
        game = localStorage.selectedGame;
    }
    if (game === '') { 
		game = "th11"; //default if url is invalid
	}
    localStorage.selectedGame = game;
    sessionStorage.selected = "[]";
    loadCanvas(game, difficulty, func);
    doButtonStuffButForGameSelector(game);
    fetch('json/gameinfo.json')
    .then((response2) => response2.json())
    .then(data => {
        const allDifficulties = data['Difficulty'][game];
        doButtonStuffButForGameDifficulty(allDifficulties, game);
    });
}

export function loadCanvas(game, difficulty = "Lunatic", func) {
    const twoYears = 63072000000;
    const now = new Date().getTime();
    let time;
    let fetchedData = [];
    fetch('json/wrprogression.json')
    .then((response) => response.json())
    .then(dataWR => {
        fetch('json/gameinfo.json')
        .then((response2) => response2.json())
        .then(data => {
            let gameCharacters;
            const englishName = data['Names'][game]['en'];
            const releaseDate = new Date(data['LatestReleaseDate'][game]).getTime();
            const maxValue = [];
            if (releaseDate > now - twoYears) {
                time = 'month';
            } else {
                time = 'year';
            }
            if ((game != "th16" && game != "th128") || difficulty == 'Extra') {
                gameCharacters = data['Characters'][game];
            } else {
                gameCharacters = data['Characters'][`${game}other`];
            }
            gameCharacters.forEach(char => {
                const history = dataWR[game][difficulty][char];
                const maxScoreOfShot = history[history.length-1][0];
                maxValue.push(maxScoreOfShot);
                fetchedData.push(history);
            })
            const overallWRCharacter = gameCharacters[maxValue.indexOf(Math.max.apply(null, maxValue))]
            generateWRTable(fetchedData, gameCharacters, game, overallWRCharacter, difficulty);
            callChartJS(fetchedData, gameCharacters, englishName, difficulty, time, game, func);
            createDropdown(dataWR);
        });
        // catchErrors(dataWR);
    });
    return;
}

export function createDropdown(dataWR) {
    const dropdown = document.getElementById('nameDropdown');
    const scoresTable = document.getElementById('scoresTable');
    const scoreInfo = document.getElementById('scoreInfo');
    let names = [];
    Object.entries(dataWR).forEach(a => {
        const diffs = a[1];
        Object.entries(diffs).forEach(b => {
            const shots = b[1];
            Object.entries(shots).forEach(c => {
                const entries = c[1];
                entries.forEach(d => {
                    const name = d[1];
                    names.push(name);
                    // console.log(name)
                });
            });
        });
    });
    const uniqueArray = [...new Set(names)].sort()

    uniqueArray.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        dropdown.appendChild(option);
    });

    if (localStorage.selectedWRName) {
        const a = document.querySelector(`[value="${localStorage.selectedWRName}"]`);
        a.selected = "selected";
        makeTable(localStorage.selectedWRName);
    }

    dropdown.addEventListener('change', (event) => {
        const selectedName = event.target.value;
        localStorage.selectedWRName = selectedName;
        makeTable(selectedName);
    });
    function makeTable(selectedName) {
        const selectedEntries = [];
        scoresTable.innerHTML = ''; // Clear previous results
        if (selectedName) {
            Object.entries(dataWR).forEach(a => {
                const diffs = a[1];
                Object.entries(diffs).forEach(b => {
                    const shots = b[1];
                    Object.entries(shots).forEach(c => {
                        const entries = c[1];
                        entries.forEach(d => {
                            if (d[1] === selectedName) {
                                d.push(c[0])
                                d.push(b[0])
                                d.push(a[0])
                                selectedEntries.push(d)
                            }
                        });
                    });
                });
            });

            selectedEntries.sort((entry1, entry2) => {
                const date1 = new Date(entry1[2]);
                const date2 = new Date(entry2[2]);
                return date2 - date1;
            });

            const table = document.createElement("table");
            const tblBody = document.createElement("tbody");
            const headers = ["#", "Game", "Difficulty", "Shottype/Route", "Score", "Player", "Date"];

            for (let j = 0; j < selectedEntries.length; j++) { // rows
                let row = document.createElement("tr");
                const [score, name, date, shot, diff, game] = selectedEntries[j];
                const dateFormatted = dateFormat(date);
                let scoreWithCommas = score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if (j == 0) { // header column
                    for (let k = 0; k < headers.length; k++) {
                        const cell = document.createElement("th");
                        const cellText = document.createTextNode(`${headers[k]}`);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                        if (k == (headers.length-1)) {
                            tblBody.appendChild(row);
                            row = document.createElement("tr");
                        }
                    }
                }
                for (let k = 0; k < headers.length; k++) { // entry columns
                    let cellText;
                    const cell = document.createElement("td");
                    switch (k) {
                        case 0: {cellText = document.createTextNode(j+1); break;}
                        case 1: {cellText = document.createTextNode(`${names1[game]["abbreviation"]}`); break;}
                        case 2: {cellText = document.createTextNode(`${diff}`); break;}
                        case 3: {cellText = document.createTextNode(shot); break;}
                        case 4: {cellText = document.createTextNode(`${scoreWithCommas}`); break;}
                        case 5: {cellText = document.createTextNode(`${name}`); break;}
                        case 6: {cellText = document.createTextNode(`${dateFormatted}`); break;}
                        default: {console.error(`Oops, something went wrong.`)}
                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                tblBody.appendChild(row);
                table.appendChild(tblBody);
                table.classList.add("wr-player-table");
                table.style.marginInline = "auto";
                scoresTable.appendChild(table);
            }
            scoreInfo.style.display = 'block';
        } else {
            scoreInfo.style.display = 'none';
        }
    }
}

export function doButtonStuffButForGameDifficulty(allDifficulties, game) {
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
            loadCanvas(initRemoveHash(true).slice(1) || game, difficulty, func);
            const allElements = document.querySelectorAll('*');
            allElements.forEach((element) => {
                element.classList.remove('selected-full');
            });
            this.setAttribute("class", "selected-full");
            const top = document.getElementById("legend-toggle-all");
            top.className = '';
            
        }
        diffSelector.appendChild(createButton);
    });

}

export function doButtonStuffButForGameSelector(game) {
    const parent = document.getElementsByClassName("card-game");
    for(let i = 0; i < parent.length; i++) {
        const button = parent[i];
        const btndata = button.dataset.game;
        button.style.backgroundColor = gameColors[btndata];
        button.title = `${names1[btndata]["jp"]} 〜 ${names1[btndata]["en"]}`
        button.children[0].style.backgroundImage = `url(assets/thcovers/${btndata}.jpg)`;
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
    const array = ['th01', 'th02', 'th03', 'th04', 'th05', 'th06', 'th07', 'th08', 'th09', 'th10', 'th11', 'th12', 'th128', 'th13', 'th14', 'th15', 'th16', 'th17', 'th18'];
    const width = selector.scrollWidth;
    const index = array.indexOf(game);
    const max = array.length;
    const number = index / max * width;
    selector.scrollLeft = number;
}

export function doButtonStuff(id) {
    const button = document.getElementById(id);
    button.addEventListener("click", selectGame);
    function selectGame() {
        const otherTables = document.getElementsByClassName("all-wr-tables");
        const otherButtons = document.getElementsByClassName("wr-shottype-buttons");
        Array.prototype.forEach.call(otherTables, function(child) {
            child.style.display = "none";
        });
        Array.prototype.forEach.call(otherButtons, function(child) {
            child.style.backgroundColor = "";
            child.style.color = "";
            child.style.border = "";
        });
        const selectedTable = document.getElementById(`${id}table`);
        selectedTable.style.display = "";
        this.style.color = "#ddd";
    }
}

export function generateWRButtons(gameCharacters, game, overallWRCharacter, difficulty) {
	const section = document.getElementById("wr-table-buttons");
    const length = section.children.length;
    if(length > 0) { // removes old and allows for new to be generated
        for(let i=0; i<length; i++) {
            section.removeChild(section.children[0]);
        }
    }
    for (let i = 0; i < gameCharacters.length; i++) {
		const button = document.createElement("button");
        const id = `${game}${gameCharacters[i]}`;
        button.setAttribute("id", id);
        button.setAttribute("class", "wr-shottype-buttons");
        button.innerText = gameCharacters[i];
        if (gameCharacters[i] == overallWRCharacter) {
            button.style.color = "#ddd";
        }
		if (game == "th03") {
			section.style.gridTemplateColumns = "repeat(3, 1fr)";
			section.style.gridTemplateRows =  " repeat(3, 1fr)" ;
			section.style.gridAutoFlow = "row";
		}
		if (game == "th08") {
			section.style.gridTemplateColumns = "repeat(8, 1fr)";
			section.style.gridTemplateRows =  " repeat(2, 1fr)" ;
			section.style.gridAutoFlow = "row";
            section.classList.add("grid-th08");
			if (i < 4) {
				button.style.gridColumn = "span 2";
			}
		}
		if (game == "th09") {
			section.style.gridTemplateColumns = "repeat(7, 1fr)";
			section.style.gridTemplateRows =  " repeat(2, 1fr)" ;
			section.style.gridAutoFlow = "row";
            section.classList.add("grid-th09");
		}
		if (game == "th07" || game == "th12" || (game == "th128" && difficulty != "Extra") || game == "th14") {
            section.style.gridTemplateColumns = "repeat(6, 1fr)";
			section.style.gridTemplateRows =  " repeat(1, 1fr)" ;
			section.style.gridAutoFlow = "row";
            section.classList.add("grid-6-ab");
		}
		if (game == "th10" || game == "th11") {
            section.style.gridTemplateColumns = "repeat(6, 1fr)";
			section.style.gridTemplateRows =  " repeat(1, 1fr)" ;
			section.style.gridAutoFlow = "row";
            section.classList.add("grid-6-abc");
		}
		if (game == "th128" && difficulty == "Extra") {
            section.style.gridTemplateColumns = "";
			section.style.gridTemplateRows =  "" ;
			section.style.gridAutoFlow = "row";
		}
		if (game == "th16" && difficulty != "Extra") {
            section.style.gridTemplateColumns = "repeat(4, 1fr)";
			section.style.gridTemplateRows =  " repeat(4, 1fr)" ;
			section.style.gridAutoFlow = "row";
            section.classList.add("grid-th16");
		}
		if (game == "th16" && difficulty == "Extra") {
			section.style.gridTemplateColumns = "repeat(4, 1fr)";
			section.style.gridTemplateRows =  "" ;
			section.style.gridAutoFlow = "row";
            section.classList.remove("grid-th16");
		}
		if (game == "th17") {
			section.style.gridTemplateColumns = "repeat(3, 1fr)";
			section.style.gridTemplateRows =  " repeat(3, 1fr)" ;
			section.style.gridAutoFlow = "row";
		}
        section.appendChild(button);
        doButtonStuff(id);
    }
}

export function generateWRTable(data, gameCharacters, game, overallWRCharacter, difficulty, flag = true) {
    const section = document.getElementById("wr-tables");
    const length = section.children.length;
    if(length > 0) { // removes old and allows for new to be generated
        for(let i=0; i<length; i++) {
            section.removeChild(section.children[0]);
        }
    }
    generateWRButtons(gameCharacters, game, overallWRCharacter, difficulty);
    for (let i = 0; i < data.length; i++) { // tables
        let reverse;
        if (flag) {reverse = data[i].length - 1;} else {reverse = 0}
        const table = document.createElement("table");
        const tblBody = document.createElement("tbody");
        let selector = "Shottype";
        if (game == "th01" || game == "th128") {selector = "Route"}
        const headers = ["#", "Difficulty", selector, "Score", "Player", "Date", "Score gain"];
        const id = `${game}${gameCharacters[i]}`;
        table.setAttribute("id", `${id}table`);
        table.classList.add('all-wr-tables');
        if (i != gameCharacters.indexOf(overallWRCharacter)) {
            table.style.display = "none";
        }
        for (let j = 0; j < data[i].length; j++) { // rows
            let row = document.createElement("tr");
            const index = Math.abs(j - reverse);
            const [score, player, date, url] = data[i][index];
		    const dateFormatted = dateFormat(date);
            const nextScore = data[i][index-1]?.[0] ?? 0;
            const scoreDifference = (score - nextScore).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let scoreWithCommas = score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (j == 0) { // header column
                for (let k = 0; k < headers.length; k++) {
                    const cell = document.createElement("th");
                    const cellText = document.createTextNode(`${headers[k]}`);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    if (k == (headers.length-1)) {
                        tblBody.appendChild(row);
                        row = document.createElement("tr");
                    }
                }
            }
            for (let k = 0; k < headers.length; k++) { // entry columns
                let cellText;
                const cell = document.createElement("td");
                switch (k) {
                    case 0: {cellText = document.createTextNode(j+1); break;}
                    case 1: {cellText = document.createTextNode(`${difficulty}`); break;}
                    case 2: {cellText = document.createTextNode(gameCharacters[i]); break;}
                    case 3: {cellText = document.createTextNode(`${scoreWithCommas}`); break;}
                    case 4: {cellText = document.createTextNode(`${player}`); break;}
                    case 5: {cellText = document.createTextNode(`${dateFormatted}`); break;}
                    case 6: {cellText = document.createTextNode(`+${scoreDifference}`); break;}
                    default: {console.error(`Oops, something went wrong.`)}
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

export function catchErrors(data) {
    console.time("Time");
    let [a, b, c, d, e] = [[], [], [], [], []];
    for (const [key, valueee] of Object.entries(data)) {
        for (const [key3, value] of Object.entries(valueee)) { // cycles through all categories
            for (const [key2, value2] of Object.entries(value)) { // cycles through all shots of category
                let newScore = 0;
                let newDate = 0;
                value2.forEach(element => { //wr entry of shot
                    a.push(key+key3+key2)
                    b.push(element[1])
                    c.push(element[2])
                    d.push(element[0])
                    e.push(key)
                    const flagScore = (parseInt(element[0]) >= newScore);
                    newScore = parseInt(element[0]);
                    const flagDate = (new Date(element[2]).getTime() >= newDate);
                    newDate = new Date(element[2]).getTime();
                    if (!flagScore || !flagDate) {console.error(`Error: Score before ${newScore} from ${element[1]} shot ${key2} is incorrect`)}
                })
            }
        }
    }
    console.log(mode(a));
    console.log(mode(b));
    console.log(mode(c));
    console.log(mode(d));
    console.log(frequencyList(e));
    console.log(a.length);
    console.timeEnd("Time");
}

export function frequencyList(arr) {
    const result = {};
    for (const item of arr) {
        if (result[item]) {
            result[item]++;
        } else {
            result[item] = 1;
        }
    }
    return result;
  }
