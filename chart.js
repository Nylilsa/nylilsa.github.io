"use strict";

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

function callChartJS(fetchedData, gameCharacters, englishName, difficulty, time, game) {
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
                createLegend(chart, args, options, gameCharacters, colors, game, difficulty);
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

function toggleLegend(chart, items, game, difficulty) {
    const top = document.getElementById("legend-toggle-all");
    const li = document.createElement('li');
    const flag = top.classList.contains("show-function");
    while (top.firstChild) {
        top.firstChild.remove();
    }
    const textContainer = document.createElement('p');
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

function extraLegendButtons(top, game, items, chart) {
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
        textContainer.style.color = "#666";
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.appendChild(text);    
        li.appendChild(boxSpan);
        top.appendChild(li);
        li.appendChild(textContainer);
    }
}

function createLegend(chart, args, options, gameCharacters, colors, game, difficulty) {
    const ul = getOrCreateLegendList(game, options.containerID, gameCharacters);
    while (ul.firstChild) {
        ul.firstChild.remove();
    }
    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    toggleLegend(chart, items, game, difficulty);
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
            boxSpan.style.background = `repeating-linear-gradient(135deg, ${c}, ${c} ${bgLineWidth}px, #020c18 ${bgLineWidth}px, #020c18 ${2*bgLineWidth}px)`;
        }
        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);    
        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
    }
}

function getOrCreateLegendList(game, id, gameCharacters) {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
    let computedCharacters = (100 / gameCharacters.length)+'%';
    if (!listContainer) {
        listContainer = document.createElement('ul');
        if (gameCharacters.length > 4) {
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

function gridLegend(element, value) {
    element.style.display = 'grid';
    element.style.justifyItems = 'stretch';
    element.style.justifyContent = 'center';
    element.style.gridTemplateColumns = `repeat(auto-fill, minmax(${value}, 1fr))`;
    element.style.padding = `0`;
}

function roundedTicks(value, index, values, game) {
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


function initCanvas(gameID, difficulty) {
    let game = gameID.slice(1); 
    if (localStorage.selectedGame && game === '') {
        game = localStorage.selectedGame;
    }
    if (game === '') { 
		game = "th11"; //default if url is invalid
	}
    localStorage.selectedGame = game;
    loadCanvas(game, difficulty);
    doButtonStuffButForGameSelector(game);
    fetch('json/gameinfo.json')
    .then((response2) => response2.json())
    .then(data => {
        const allDifficulties = data['Difficulty'][game];
        doButtonStuffButForGameDifficulty(allDifficulties);
    });
}

function loadCanvas(game, difficulty = "Lunatic") {
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
            callChartJS(fetchedData, gameCharacters, englishName, difficulty, time, game);
        });
        //catchErrors(dataWR);
    });
    return;
}

function doButtonStuffButForGameDifficulty(allDifficulties) {
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
            loadCanvas(initRemoveHash(true).slice(1) || "th11", difficulty);
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

function doButtonStuffButForGameSelector(game) {
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
    const array = ['th01', 'th02', 'th03', 'th04', 'th05', 'th06', 'th07', 'th08', 'th09', 'th10', 'th11', 'th12', 'th128', 'th13', 'th14', 'th15', 'th16', 'th165', 'th17', 'th18'];
    const width = selector.scrollWidth;
    const index = array.indexOf(game);
    const max = array.length;
    const number = index / max * width;
    selector.scrollLeft = number;
}

function doButtonStuff(id) {
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
        this.style.backgroundColor = "#08101C";
        this.style.color = "#ddd";
        this.style.borderTop = "2px solid #47748B";
    }
}

function generateWRButtons(gameCharacters, game, overallWRCharacter, difficulty) {
	const section = document.getElementById("wr-buttons");
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
            button.style.backgroundColor = "#08101C";
            button.style.color = "#ddd";
            button.style.borderTop = "2px solid #47748B";
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
			if (i < 4) {
				button.style.gridColumn = "span 2";
			}
		}
		if (game == "th09") {
			section.style.gridTemplateColumns = "repeat(7, 1fr)";
			section.style.gridTemplateRows =  " repeat(2, 1fr)" ;
			section.style.gridAutoFlow = "row";
		}
		if (game == "th16" && difficulty != "Extra") {
			section.style.gridTemplateColumns = "repeat(4, 1fr)";
			section.style.gridTemplateRows =  " repeat(4, 1fr)" ;
			section.style.gridAutoFlow = "row";
		}
		if (game == "th16" && difficulty == "Extra") {
			section.style.gridTemplateColumns = "repeat(4, 1fr)";
			section.style.gridTemplateRows =  "" ;
			section.style.gridAutoFlow = "row";
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

function generateWRTable(data, gameCharacters, game, overallWRCharacter, difficulty, flag = true) {
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
        let firstElement = "Shottype";
        if (game == "th01" || game == "th128") {firstElement = "Route"}
        const headers = [firstElement, "Difficulty", "Score", "Player", "Date"];
        const id = `${game}${gameCharacters[i]}`;
        table.setAttribute("id", `${id}table`);
        table.classList.add('all-wr-tables');
        if (i != gameCharacters.indexOf(overallWRCharacter)) {
            table.style.display = "none";
        }
        for (let j = 0; j < data[i].length; j++) { // rows
          let row = document.createElement("tr");
          const index = Math.abs(j - reverse);
          const [score, player, date] = data[i][index];
		  const dateFormatted = dateFormat(date);
          const scoreWithCommas = score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (j == 0) { // header column
                for (let k = 0; k < headers.length; k++) {
                    const icon = document.createElementNS("http://www.w3.org/2000/svg","svg");
                    const cell = document.createElement("th");
                    const cellText = document.createTextNode(`${headers[k]}`);
                    switch (k) {
                        case 0: {icon.classList.add('icon', 'icon-bullet'); break;}
                        case 1: {icon.classList.add('icon', 'icon-star'); break;}
                        case 2: {icon.classList.add('icon', 'icon-trophy'); break;}
                        case 3: {icon.classList.add('icon', 'icon-user'); break;}
                        case 4: {icon.classList.add('icon', 'icon-calendar'); break;}
                        default: {console.error(`Oops, something went wrong.`)}
                    }
                    cell.appendChild(icon);
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
                    case 0: {cellText = document.createTextNode(gameCharacters[i]); break;}
                    case 1: {cellText = document.createTextNode(`${difficulty}`); break;}
                    case 2: {cellText = document.createTextNode(`${scoreWithCommas}`); break;}
                    case 3: {cellText = document.createTextNode(`${player}`); break;}
                    case 4: {cellText = document.createTextNode(`${dateFormatted}`); break;}
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



function catchErrors(data) {
    console.time("test1");
    let arr = [];
    for (const [key, valueee] of Object.entries(data)) {
        for (const [key3, value] of Object.entries(valueee)) { // cycles through all categories
            for (const [key2, value2] of Object.entries(value)) { // cycles through all shots of category
                let newScore = 0;
                let newDate = 0;
                value2.forEach(element => { //wr entry of shot
                    //arr.push(key+key3+key2)
                    //arr.push(element[1])
                    arr.push(element[2])
                    const flagScore = (parseInt(element[0]) >= newScore);
                    newScore = parseInt(element[0]);
                    const flagDate = (new Date(element[2]).getTime() >= newDate);
                    newDate = new Date(element[2]).getTime();
                    if (!flagScore || !flagDate) {console.error(`Error: Score before ${newScore} from ${element[1]} shot ${key2} is incorrect`)}
                })
            }
        }
    }
    console.log(mode(arr));
    console.log((arr).length);
    console.timeEnd("test1");
}

