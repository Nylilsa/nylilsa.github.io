

function initCanvas(gameID, difficulty) {
    let game = gameID.slice(1); 
    if (game === '') { 
		game = "th11"; //default if url is invalid
	}
    loadCanvas(gameID, difficulty);
    doButtonStuffButForGameSelector(game);
    fetch('json/gameinfo.json')
        .then((response2) => response2.json())
        .then(data => {
            const allDifficulties = data['Difficulty'][game];
            doButtonStuffButForGameDifficulty(allDifficulties);
        });
    
}

function loadCanvas(gameID, difficulty) {
    const twoYears = 63072000000;
    const now = new Date().getTime();
    var time = 1;
    let game = gameID.slice(1); 
    var fetchedData = [];
	if (game === '') { 
		game = "th11"; //default if url is invalid
	}
    if (difficulty === undefined) { 
		var difficulty = "Lunatic"; //default if url is invalid
	}
    fetch('json/wrprogression.json')
    .then((response) => response.json())
    .then(dataWR => {
        fetch('json/gameinfo.json')
        .then((response2) => response2.json())
        .then(data => {
            const englishName = data['Names'][game]['en'];
            const releaseDate = new Date(data['LatestReleaseDate'][game]).getTime();
            const maxValue = [];
            if (releaseDate > now - twoYears) {
                time = 'month';
            } else {
                time = 'year';
            }
            if ((game != "th16" && game != "th128") || difficulty == 'Extra') {
                var gameCharacters = data['Characters'][game];
            } else {
                var gameCharacters = data['Characters'][`${game}other`];
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
            loadCanvas(initRemoveHash(true), difficulty);
            const allElements = document.querySelectorAll('*');
            allElements.forEach((element) => {
                element.classList.remove('selected-full');
              });
            this.setAttribute("class", "selected-full");
        }
        diffSelector.appendChild(createButton);
    });

}

function doButtonStuffButForGameSelector(game) {
    const parent = document.getElementsByClassName("card-game");
    for(i = 0; i < parent.length; i++) {
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
    const width = selector.scrollWidth;
    const index = Object.keys(gameColors).indexOf(game);
    const max = Object.keys(gameColors).length;
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
		if (game == "th17") {
			section.style.gridTemplateColumns = "repeat(3, 1fr)";
			section.style.gridTemplateRows =  " repeat(3, 1fr)" ;
			section.style.gridAutoFlow = "row";
		}
        section.appendChild(button);
        doButtonStuff(id);
    }
}

function generateWRTable(data, gameCharacters, game, overallWRCharacter, difficulty) {
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
        if (true) {reverse = data[i].length - 1;} else {reverse = 0}
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
                var newScore = 0;
                var newDate = 0;
                value2.forEach(element => { //wr entry of shot
                    arr.push(key+key3+key2)
                    //arr.push(element[1])
                    //arr.push(element[2])
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

class Points {
    constructor(date, score, player) {
      this.x = date;
      this.y = score;
      this.player = player;
    }
}

class Data {
    constructor(data, label) {
        this.label = label;
        this.data = data;
        this.borderWidth = 1;
        this.stepped = true;
    }
}

function callChartJS(fetchedData, gameCharacters, englishName, difficulty, time, game) {
    const wrapper = document.getElementById("wr-chart-wrapper");
    const ctx = document.createElement("canvas");
    ctx.setAttribute("class", 'wr-chart');
    wrapper.appendChild(ctx);
    const chartChecker = document.getElementsByClassName('wr-chart');
    if(chartChecker.length != 1) { // removes old and allows for new to be generated
        chartChecker[0].parentNode.removeChild(chartChecker[0])
    }
    let dataset = [];
    fetchedData.forEach((element) => {
        const arr = [];
        element.forEach(subelement => {
            const dateObject = subelement[2].replaceAll("/", "-");
            arr.push(new Points(dateObject, subelement[0], subelement[1]))
        });
        const character = gameCharacters[fetchedData.indexOf(element)];
        const playerData = new Data(arr, character); //wip
        dataset.push(playerData);
    });
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: dataset,
        },   
        options: {
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
                legend: {
                  position: 'bottom',
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
        }
    });
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