let citeId = 0;
let MD = new showdown.Converter({
	extensions: [ext],
	noHeaderId: false,
	openLinksInNewWindow: true,
	simpleLineBreaks: true,
	strikethrough: true,
	tables: true
});

function loadMarkdown(path) { //loads page
	window.location.href = window.location.origin + '/#/' + path.replace(".md","") + initRemoveHash(true); //changes url
	const xhttp = new XMLHttpRequest(); //from this point on, calls for file and loads file
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    	document.getElementById("mdcontent").innerHTML = this.responseText;
		initMarkdown(false); //this works somehow
		jumpTo(initRemoveHash(true), 100);
		}
	}
	if (path) { //if path exists, then load .md
		xhttp.open("GET", path, true);
        xhttp.send();
		xhttp.onload = function() { // error handling
            if (xhttp.status === 404) {
                initMarkdown(true);
                return;
            }
        }
	}
	//if button is clicked, then sidebar (on mobile!) is closed automatically.
	document.getElementById('sidebar').className = 'sidebar-class-desktop';
}

function colorHex(input) { // argument is optional
	if (typeof input === 'undefined') { // checks if argument does not exist
		input = getGameFromURL();
	}
	return gameColors[input] || "#47748B";
}

function colorRGB(add, opacity, game) {
	let colourHex = colorHex(game);

	if (typeof game === 'undefined') { 
		colourHex = colorHex();
	}
 
	let rHex = "0x" + colourHex.substring(1, 3); // 0xAB
	let gHex = "0x" + colourHex.substring(3, 5); // 0xCD
	let bHex = "0x" + colourHex.substring(5, 7); // 0xEF

	let rDec = parseInt(rHex) + add;
	let gDec = parseInt(gHex) + add;
	let bDec = parseInt(bHex) + add;

	if (rDec > 255) {rDec = 255;}
	if (gDec > 255) {gDec = 255;}
	if (bDec > 255) {bDec = 255;}

	if (rDec < 0) {rDec = 0;}
	if (gDec < 0) {gDec = 0;}
	if (bDec < 0) {bDec = 0;}

	return "rgba("+rDec+", "+gDec+ ", "+bDec+", "+opacity+")";
}

function getGameFromURL() {
	const url = window.location.hash; // is #/bugs/th18/0
	let gameName;
    const tagsCheck = /tags/g.test(url);
	if (url.slice(0, 6) === "#/bugs" && !tagsCheck) {
		gameName = /\#\/bugs\/(.*?)\//i.exec(url)[1]; // ddc
	}
	return gameName;
}

function setWindowTitleDirect(str) {
	document.title = str;
}

function generateTable(input) { // generates tables of shottypes of HSifS and WBaWC
	const yes = '<img src="/assets/green-check-mark.svg" class="icon-text">';
	const no = '<img src="/assets/red-cross.svg" class="icon-text">';
	// table-shottype is ID of div in showdown-ext.js
	const content = document.getElementById('table-shottype');
	if (input.length == 20) { //hsifs
		let str = '<table><thead><tr><th class="left">Subshot</th><th>Reimu</th><th>Cirno</th><th>Aya</th><th>Marisa</th></tr></thead><tbody><tr><td class="left"><span style="color:'+matchStyle['spring'].color+'">Spring</span></td>';
		for (let i = 0; i < input.length; i++) {
			switch (i) {
				case 4: {str += '</tr><tr><td class="left"><span style="color:'+matchStyle['summer'].color+'">Summer</span></td>'; break;}
				case 8: {str += '</tr><tr><td class="left"><span style="color:'+matchStyle['autumn'].color+'">Autumn</span></td>'; break;}
				case 12: {str += '</tr><tr><td class="left"><span style="color:'+matchStyle['winter'].color+'">Winter</span></td>'; break;}
				case 16: {str += '</tr><tr><td class="left">Extra</td>'; break;}
			}
			if (input[i] == 1) {
				str += '<td>'+yes+'</td>';
			} else {
				str += '<td>'+no+'</td>';
			}
		}
		str += '</tr></tbody></table>';
		content.innerHTML += str;
		return;
	} 
	if (input.length == 9) { //wbawc
		let str = '<table><thead><tr><th class="left">Spirit</th><th>Reimu</th><th>Marisa</th><th>Youmu</th></tr></thead><tbody><tr><td class="left"><span style="color:'+matchStyle['wolf'].color+'">Wolf</span></td>';
		for (let i = 0; i < input.length; i++) {
			switch (i) {
				case 3: {str += '</tr><tr><td class="left"><span style="color:'+matchStyle['otter'].color+'">Otter</span></td>'; break;}
				case 6: {str += '</tr><tr><td class="left"><span style="color:'+matchStyle['eagle'].color+'">Eagle</span></td>'; break;}
			}
			if (input[i] == 1) {
				str += '<td>'+yes+'</td>';
			} else {
				str += '<td>'+no+'</td>';
			}
		}
		str += '</tr></tbody></table>';
		content.innerHTML += str;
		return;
	} 
}

function toggleSidebar() { //changes class of sidebar upon button press
	const sidebar = document.getElementById('sidebar'); 
	if (sidebar.className == "sidebar-class-mobile") {
		sidebar.className = 'sidebar-class-desktop';
		return;
	}
	sidebar.className = 'sidebar-class-mobile';
}

function resize() { //changes property of sidebar button and sidebar class
	const ratio = window.innerWidth / window.innerHeight;
	const sidebar = document.getElementById('sidebar'); 
	const hidden = document.getElementsByClassName('hidden'); //for toggling visibility of button (should only appear on mobile)
	const maxAspectRatio =  14 / 16; // must be same as aspect ration in style.scss

	if (ratio <= maxAspectRatio) {
		for(let i = 0; i < hidden.length; i++) {
			hidden[i].style.visibility = 'visible';
		}
	} else {
		sidebar.className = "sidebar-class-desktop";
	
		for(let i = 0; i < hidden.length; i++) {
			hidden[i].style.visibility = 'hidden';
		}
	}
}

function jumpTo(id, duration) {
    const tagsCheck = /tags/g.test(window.location.hash);
	if (id === '' || tagsCheck) { 
		return;
	}
	setTimeout(() => { 
		const top = document.getElementById(id.replace("#",""));
        if (top) {
		    window.scrollTo(0, top.offsetTop);
        }
	}, duration);
}

async function fillCite(id, key, citingFunction) {
    const cite = await citingFunction(key);
    document.querySelector(`#cite-${id}`).innerHTML = cite;
}

async function videoFunction(key) {
    const webdata = await fetch('json/webdata.json')
    .then((response) => response.json())
    .then(data => {return data});
	const content = webdata["Citations"][key];
	let datum;
	const intl = "en-US";
	const options = {calendar: 'iso8601', year: 'numeric', month: 'long', day: 'numeric'};
	const rawDatum = new Date(content.date);
	if (typeof rawDatum == "object" && rawDatum == "Invalid Date") {
		datum = content.date;
	} else {
		datum = new Intl.DateTimeFormat(intl, options).format(rawDatum);
	}
    return await citeAPA(datum, content.author, content.title, content.url);
}

async function replayFunction(key) {
    const webdata = await fetch('json/webdata.json')
    .then((response) => response.json())
    .then(data => {return data});
	const content = webdata["Replays"][key];
	const datum = dateFormat(content.date);
	return await citeReplay(content.game, datum, content.author, content.name, content.difficulty, content.shot, content.version, content.url, content.note);
}

function dateFormat(date) {
	let output;
	const intl = "en-US";
	const options = {calendar: 'iso8601', year: 'numeric', month: 'long', day: 'numeric'};
	const dateType = new Date(date);
	if (typeof dateType == "object" && dateType == "Invalid Date") {
		output = content.date;
	} else {
		output = new Intl.DateTimeFormat(intl, options).format(dateType);
	}
	return output;
}

function citeAPA(date, author, title, url) {
	return author+'. 「'+date+'」. "'+title+'" <a class="url" href="'+url+'" target="_blank">'+url+'</a>';
}

function citeReplay(game, date, author, name, difficulty, shot, version, url, note) {
	if (latestVersion[game] != version) {version = '<span class="highlight-txt" style="color:#f2c200">'+version+'</span>'}
	if (note) {note = "(Note: "+note+")"}
	return 'Replay \`'+name+'\` by "'+author+'". '+difficulty+', '+shot+', '+version+'. 「'+date+'」. <a class="url" href="'+url+'" target="_blank">Download link</a> '+note;
}

function contributorsFunction() {
	let i = 0;
	let html = '';
	for (let lambda in contributors) {
		const value = Object.values(contributors)[i];
		html += '+ <a class="url" href="'+value.url+'" target="_blank">'+value.name+'</a> - '+value.help;
		html += '\n';
		i++;
	}
	return html;
}

function progressTable() {
	const id = document.getElementById('progress-table');
	let html = '<table><thead><tr><th class="left">Game</th><th>Finished pages</th><th>Total pages</th><th>Glitches count</th><th>Progress</th><th>Comment</th></tr></thead><tbody>';
	let [i, countCompleted, countPages, countGlitches] = [0, 0, 0, 0];
	for (let lambda in bugTracker) {
		const th = Object.keys(bugTracker)[i];
		const value = Object.values(bugTracker)[i];
		let percentage = (value["completed-pages"]/value["total-glitches"]*100);
		percentage = +percentage.toFixed(2)+'%';

		countCompleted += value["completed-pages"];
		countPages += Object.keys(names[th]).length;
		countGlitches += value["total-glitches"];
		html += '<tr><td style="border-left: 2px solid '+gameColors[th]+';">'+th+'</td><td>'+value["completed-pages"]+'</td><td>'+Object.keys(names[th]).length+'</td><td>'+value["total-glitches"]+'</td><td class="left">'+percentage+'</td><td class="left">'+value.comment+'</td>'
		i++;
	}
	html += '<tr><td>Total</td><td>'+countCompleted+'</td><td>'+countPages+'</td><td>'+countGlitches+'</td><td class="left">'+(countCompleted/countGlitches*100).toFixed(2)+'%</td><td class="left">So many pages left to go through ;__;</td>'
	id.innerHTML += html;
}

function show() { //toggles all elements in navbar of Bugs if clicked on
	const selector = document.getElementsByClassName("show-selector")[0];
	const elements = document.getElementsByClassName("sidebar-bugs");
	const flag = selector.classList.contains("show-function");
	if (flag) {
		selector.classList.remove("show-function");
		selector.textContent = "Hide all";
		for(let i = 0; i < elements.length; i++) {
			if (elements[i].classList.contains("collapsed")) {
				elements[i].click();
			}
		}
	} else {
		selector.classList.add("show-function");
		selector.textContent = "Show all";
		for(let i = 0; i < elements.length; i++) {
			if (!elements[i].classList.contains("collapsed")) {
				elements[i].click();
			}
		}
	}
}

function replaceEclIns() {
	console.log(1); // TBD
}

function matchText(style, iconBool, highlightedText) {
    const icon = `<img src='${matchStyle[style].icon}' width='20' height='20'>`;
    const content = "<span style='color:"+matchStyle[style].color+"'>"+highlightedText+"</span>";
    if (iconBool) {return icon+content}
    return content;
}

function hrCustom(input) {
	if (gameColors[input]) { // if input is game
		const color = colorRGB(16, 1, input);
		return "<hr style='border-color:"+color+"'>"
	}
	return "<hr style='border-color:"+input+"'>" // if input is color
}

function gameScenes(game, flag, array) {
	const content = document.getElementById('table-scenes'); // table-scenes is ID of div in showdown-ext.js
	if (flag === 'true') {
		var yes = '<img src="/assets/green-check-mark.svg" class="icon-text">';
		var no = '<img src="/assets/red-cross.svg" class="icon-text">';
	} else {
		var no = '<img src="/assets/green-check-mark.svg" class="icon-text">';
		var yes = '<img src="/assets/red-cross.svg" class="icon-text">';
	}
	
	if (game === '143') {
		let str = '<table><thead><tr><th class="left">Scenes</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr></thead><tbody><tr><td class="left">Day 1</td>';
		const days = [1, 7, 13, 20, 27, 35, 43, 51, 58, 66]; // digit k represents first day of indexOf k.
		const maximum = 75;
		let k = 1;
		for (let i = 1; i <= maximum; i++) {
			if (i === days[k]) {
				str += '</tr><tr><td class="left">Day '+(k+1)+'</td>';
				k += 1;
			}
			if (array.includes(i)) {
				str += '<td>'+yes+'</td>';
			} else {
				str += '<td>'+no+'</td>';
			}
		}
        str += "</thead></table>"
		content.innerHTML += str;
		return;
	}
}

function tagsTable() {
    let str = '<table id="selected-container"><tbody>';
    let counterArray = countTags();
    let i = 0;
    const raritySeparator = 5;
    for (const [key, value] of Object.entries(tags)) {
        if (i === raritySeparator){str += "<tr><td></td><td></td><td class='invis left'>youtu.be/dQw4w9WgXcQ</td></tr>";}
        str += `<tr><td class="left">${counterArray[i]}</td><td class="left"><span class="tag"><a onclick="toggleTags(this)" data-key="${key}" class="tag" title="${value['description']}">${value['full']}</a></span></td><td class="left">${value['description']}</td>`;
        i++;
    }
    str += "</tbody></table>";
    return str;
}

function tagsSelector() {
    const selector = document.getElementById('bugs-tags');
    const array = JSON.parse(selector.dataset.list);
    let html = '';
    for (let i=0; i < array.length; i++) {
        html += '<span class="tag"><a onclick="toggleTags(this)" class="tag" data-key="'+array[i]+'">'+tags[array[i]].full+'</a></span>';
    }
    selector.innerHTML = html;
}

function toggleTags(element) {
    const table = document.getElementById("selected-container");
    const selector = document.getElementById('bugs-tags');
    const key = element.dataset.key;
    for (let i=0; i < table.childNodes[0].childNodes.length; i++) {
        if (i !== 3) {
            let a = table.childNodes[0].childNodes[i].childNodes[1].childNodes[0].childNodes[0];
            if (a.dataset.key === key) {
                a.classList.toggle("selected");
            }
        }
    }
    const array = JSON.parse(selector.dataset.list);
    if (array.includes(key)) {
        for(let i = 0; i < array.length; i++){ 
            if (array[i] === key) { 
                array.splice(i, 1);
            }
        }
    } else {
        array.push(key);
    }
    selector.dataset.list = JSON.stringify(array);
    tagsSelector();
}

function countTags() {
    console.time("test1");
    let tagsArray = [];
    let tagsCount = [];
    for (const [key, value] of Object.entries(tags)) {
        tagsArray.push(key);
        tagsCount.push(0);
    }
    for (const [key, value] of Object.entries(names)) {
        for (const [i, selector] of Object.entries(value)) {
            const array = selector[1];
            for (let i=0; i < array.length; i++) {
                const index = tagsArray.indexOf(array[i]);
                tagsCount[index] += 1;
            }
        }
    }
    console.timeEnd("test1");
    return tagsCount;
}

function initCanvas(gameID, difficulty) {
    let game = gameID.slice(1); 
    loadCanvas(gameID, difficulty);
    doButtonStuffButForGameSelector();
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

function doButtonStuffButForGameSelector() {
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
        const table = document.createElement("table");
        const tblBody = document.createElement("tbody");
        const headers = ["Shottype", "Difficulty", "Score", "Player", "Date"];
        const id = `${game}${gameCharacters[i]}`;
        table.setAttribute("id", `${id}table`);
        table.classList.add('all-wr-tables');
        if (i != gameCharacters.indexOf(overallWRCharacter)) {
            table.style.display = "none";
        }
        for (let j = 0; j < data[i].length; j++) { // rows
          let row = document.createElement("tr");
          const [score, player, date] = data[i][j];
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
  


///////////////////// DEBUG /////////////////////

function debug() {
    const text = '## hello, **markdown**!',
    html = MD.makeHtml(text);
	console.log(html);
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

function mode(array) {
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++) {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return [maxEl, maxCount];
}

///////////////////// INIT /////////////////////

function initSidebarContent() {
    const colDecrease = -16;
	const identifiers = document.querySelectorAll("#pageBugs li ul");
	const header = document.querySelectorAll("#pageBugs li a");
	let k = 0;
	for (let i = 0; i < identifiers.length; i++) { // does it games.length times
		const thnr = identifiers[i].id.slice(5); // bugs-th10 ---> th10
		const child = header[i+1];
		child.style.borderTopWidth = '1px';
		child.style.borderColor = colorHex(thnr);
		const content = document.getElementById('bugs-'+thnr+'');
		for (let j = 0; j < Object.keys(names[thnr]).length; j++) {
            content.innerHTML += '<li><div class="left-border-color"><a href="#/bugs/'+thnr+'/'+j+'" style="border-color: '+colorRGB(colDecrease, 1, thnr)+';">'+names[thnr][j][0]+'</a></div></li>'; 
			k += 1;
		}
	}
	//console.log(k) 
}

function initMarkdown(error) { //puts html in id 'test'
	const input = document.getElementById("mdcontent").innerHTML; //is md text
	const nav = document.querySelector("#mdcontent");
    if (!error) {
	    nav.innerHTML = MD.makeHtml(input);
        initCustomColor();
        return;
    }
    nav.innerHTML = MD.makeHtml("<h1><span style='color:red'>ERROR:</span> File at \""+initRemoveHash(false)+"\" not found.</h1><br><h3>Try reloading using <span class='highlight-txt'>Ctrl + F5</span>, or <span class='highlight-txt'>clearing browser cache</span> of this site.<br>If the problem persists, contact me on Discord: Nylilsa#9310.</h3><br><br><br><h2><a class='url' href='#/home'>Go to Home page</a></h2>");
	initCustomColor();
}

function initScrollBar() {
    const style = document.createElement("style");
	style.className = "scrollbars";
    let css = "::-webkit-scrollbar {width: 4px;}  ::-webkit-scrollbar-track {box-shadow: inset 0 0 2px grey; }::-webkit-scrollbar-thumb {background: " + colorHex(); +"";
	css += "; border-radius: 1px;}::-webkit-scrollbar-thumb:hover {background: " +colorRGB(32, 1);+ "";
	css += "; }";
    style.appendChild(document.createTextNode(css));
	if (document.getElementsByClassName('scrollbars').length >= 1) {
		document.getElementsByClassName('scrollbars')[0].innerHTML = css;
		return;
	}
    document.body.appendChild(style);
    return style.sheet;
}

function initAutoHideMenu() { // hides menu when scrolling
    const menu = document.getElementById('header');
    let previousScrollTop = document.scrollingElement.scrollTop;
    document.addEventListener('scroll', function () {
        if (document.scrollingElement.scrollTop < previousScrollTop) { // if scroll upwards
            menu.style.transform = 'translateY(0px)';
        } else {
            menu.style.transform = 'translateY(-60px)';
        }
        previousScrollTop = document.scrollingElement.scrollTop;
    }, { passive: true });
}

function initHashChange() {
    setTimeout(function(){
        window.addEventListener('hashchange', (e) => {loadMarkdown(initRemoveHash(false));}, false)}
        , 500); // delay is needed or else hashchange and init are executed at once
}
function initRemoveHash(input) { //removes #/
	let c = window.location.hash.replace("#/","") + ".md";
	let hash = '';
	if (c === '.md') {
		c = 'home.md';
	}
	if (c.includes("#")) {
		hash = c.substring(c.indexOf("#") + 1).replace(".md",""); // gets whatever is after hash
		hash = "#" + hash;
		c = c.split('#')[0] + ".md";
	}
	if (input) {
		return hash;
	}
	return c;
}

function initResize() { // calls every time window changes
	window.onresize = resize;
	resize();
};

function initRememberScroll() {
	if (initRemoveHash(true).length > 0) {
		history.scrollRestoration = 'manual';
	} else {
		history.scrollRestoration = 'auto';
	}
}

function initCustomColor() {
	initScrollBar();
	initNavColor();
}

function initNavColor() { // changes color to match the game's color
	const elements = document.getElementsByClassName('hr_major'); // get all elements
	for(let i = 0; i < elements.length; i++) {
		elements[i].style.borderColor = colorRGB(32, 1);
	}
	const mobile = document.getElementById('header');
	mobile.style.borderColor = colorRGB(-16, 1);
}

function initSwipeCheck() {
	let [touchstartX, touchendX, touchstartY, touchendY] = [0, 0, 0, 0];

	function checkDirection() {
		const limit = screen.width * 1/9;
		const swipeRight = touchendX > touchstartX;
		const swipeOnLeft = limit > touchstartX;
		const menuCheck = document.getElementById("sidebar").classList.contains("sidebar-class-desktop");

        const angle = Math.atan2((touchstartX-touchendX),(touchstartY-touchendY));
        const upperbound = (-Math.PI/2) - (Math.PI/6);
        const lowerbound = (-Math.PI/2) + (Math.PI/6);
        const angleCheck = (angle > upperbound && angle < lowerbound);
        
        const swipeToLeftCheck = (touchstartX - touchendX) > screen.width * 1/5;

		if (swipeRight && swipeOnLeft && menuCheck && angleCheck || swipeToLeftCheck && !menuCheck) {
			toggleSidebar();
		}
	}

	document.addEventListener('touchstart', e => {
	    touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
	})

	document.addEventListener('touchend', e => {
	    touchendX = e.changedTouches[0].screenX;
	    touchendY = e.changedTouches[0].screenY;
	    checkDirection();
	})
}

function init() {
	loadMarkdown(initRemoveHash(false)); //loads in md 
	initRememberScroll();
	initCustomColor();
	initSidebarContent();
    initHashChange();
	initResize();
	initAutoHideMenu();
	initSwipeCheck();
}

init();