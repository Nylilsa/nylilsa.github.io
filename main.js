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

function colorRGB(add, game) {
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

	return "rgba("+rDec+", "+gDec+ ", "+bDec+", 1.0)";
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
		const top = document.getElementById(id.replace("#","")).offsetTop;
		window.scrollTo(0, top);
	}, duration);
}

function citeFunction(key) {
	const content = citations[key];
	let datum;
	const intl = "en-US";
	const options = {calendar: 'iso8601', year: 'numeric', month: 'long', day: 'numeric'};
	const rawDatum = new Date(content.date);
	if (typeof rawDatum == "object" && rawDatum == "Invalid Date") {
		datum = content.date;
	} else {
		datum = new Intl.DateTimeFormat(intl, options).format(rawDatum);
	}
	return citeAPA(datum, content.author, content.title, content.url);
}

function replayFunction(key) {
	const content = replays[key];
	let datum;
	const intl = "en-US";
	const options = {calendar: 'iso8601', year: 'numeric', month: 'long', day: 'numeric'};
	const rawDatum = new Date(content.date);
	if (typeof rawDatum == "object" && rawDatum == "Invalid Date") {
		datum = content.date;
	} else {
		datum = new Intl.DateTimeFormat(intl, options).format(rawDatum);
	}
	return citeReplay(content.game, datum, content.author, content.name, content.difficulty, content.shot, content.version, content.url, content.note);
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
		countPages += names[th].length;
		countGlitches += value["total-glitches"];

		html += '<tr><td style="border-left: 2px solid '+gameColors[th]+';">'+th+'</td><td>'+value["completed-pages"]+'</td><td>'+names[th].length+'</td><td>'+value["total-glitches"]+'</td><td class="left">'+percentage+'</td><td class="left">'+value.comment+'</td>'
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

function matchText(style, iconBool, highlightedText) { // TODO: make function be able to appear in a variety of options (e.g. suppose text says PIV and Point Item Value - make function such that both texts are supported with icon and color changes)
    console.log(matchStyle[style])
    const icon = `<img src='/assets/th-sprites/${style}.png' width='20' height='20'>`;
    const content = "<span style='color:"+matchStyle[style].color+"'>"+highlightedText+"</span>";
    if (iconBool) {return icon+content}
    return content;
}

function hrCustom(input) {
	if (gameColors[input]) { // if input is game
		const color = colorRGB(16, input);
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


///////////////////// UNUSED /////////////////////

function parseMarkdown(markdownText) { //parses markdown - unused atm
	const htmlText = markdownText
		.replace(/\[no\]([^]*?)\[\/no\]/g, '<span style="color:#ff0000">~~$1~~</span>') //red color
		.replace(/\[yes\]([^]*?)\[\/yes\]/g, '<span style="color:#00ff00">$1</span>') //green color
		.replace(/\~\~([^]*?)\~\~/g, '<span style="text-decoration: line-through">$1</span>') //strikethrough
		.replace(/\[specs\]/g, 'Specifications')
		.replace(/\[what\]/g, 'What happens')
		.replace(/\[how\]/g, 'How it happens')
		.replace(/\[why\]/g, 'Why it happens')
		.replace(/\[br\]/g, '<br>')
		.replace(/\[hr\]/g, '<hr>')
		.replace(/\[links\]/g, 'Links')
		.replace(/\[rpy\]/g, 'Replays')
		.replace(/\[vid\]/g, 'Videos')
		.replace(/^## (.*$)/gim, '<h2>$1</h2>')
		.replace(/^# (.*$)/gim, '<h1>$1</h1>')
		.replace(/\[title=(.*?)\]/gim, function(match, content) {setWindowTitleDirect(content);return "";}) //no idea why it works but ty priw
		//.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
		//.replace(/\*(.*)\*/gim, '<i>$1</i>')
		//.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
		//.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
		//.replace(/\n$/gim, '<br />')
	return htmlText.trim();
}

function highlightCode(content) {
	return content.replace(/_/g, "\\_").replace(/\*/g, "\\*");
}

function invertHex(hex) {
	if (hex[0] == '#') {
		hex = hex.substring(1);
	}
	return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}

function initJson() {
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "citations.json", true); // has to be TRUE
	xhttp.send(null);
	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState === 4 && xhttp.status === 200) {
		citations = JSON.parse(xhttp.responseText); // globally defined
		//loadCitation(citations);
	  }
	}
}

///////////////////// DEBUG /////////////////////

function debug() {
    const text = '## hello, **markdown**!',
    html = MD.makeHtml(text);
	console.log(html);
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
			content.innerHTML += '<li><div class="left-border-color"><a href="#/bugs/'+thnr+'/'+j+'" style="border-color: '+colorRGB(colDecrease, thnr)+';">'+names[thnr][j][0]+'</a></div></li>'; 
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
	css += "; border-radius: 1px;}::-webkit-scrollbar-thumb:hover {background: " +colorRGB(32);+ "";
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
		elements[i].style.borderColor = colorRGB(32);
	}
	const mobile = document.getElementById('header');
	mobile.style.borderColor = colorRGB(-16);
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