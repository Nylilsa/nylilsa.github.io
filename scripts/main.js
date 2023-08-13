"use strict";

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
		initMarkdown(false); 
		jumpTo(initRemoveHash(true), 100);
		}
	}
	if (path) {
		xhttp.open("GET", path, true);
        xhttp.send();
		xhttp.onload = function() {
            if (xhttp.status === 404) {
                initMarkdown(true);
                return;
            }
        }
	}
}

function colorHex(input = getGameFromURL()) {
    const def = getComputedStyle(document.documentElement).getPropertyValue('--clr-default');
	return gameColors[input] || def || "#498b47";
}

function colorRGB(add, opacity, game) {
	let colourHex = colorHex(game);

	if (typeof game === 'undefined') { 
		colourHex = colorHex();
	}

    colourHex = colourHex.replaceAll(" ", "");
 
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

function toggleSidebar(bool) { //changes class of sidebar upon button press
	const sidebar = document.getElementById('sidebar');
	const content = document.getElementById('content');
	const header = document.getElementById('header');
	const chart = document.getElementById('wr-chart-wrapper');
	const wrButtons = document.getElementById('wr-game-buttons');
	if (bool || sidebar.className == "sidebar-class-width") {
        sidebar.style.transform = '';
        content.style.paddingLeft = '';
		header.style.paddingLeft = '';
        if (chart) {
            chart.style.maxWidth = '';
            wrButtons.style.maxWidth = '';
        }
		sidebar.className = '';
		return;
	}
    sidebar.style.transform = 'translateX(0)';
    content.style.paddingLeft = 'calc(var(--sidebar-width) + 3vmax)';
    header.style.paddingLeft = 'calc(var(--sidebar-width) + 3vmax)';
    if (chart) {
        chart.style.maxWidth = 'calc(min(1030px, calc(88vw - var(--sidebar-width) + 3vmax))';
        wrButtons.style.maxWidth = 'calc(min(1030px, calc(88vw - var(--sidebar-width) + 3vmax))';
    }
	sidebar.className = 'sidebar-class-width';
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

function showNavbarChildren() { //toggles all elements in navbar of Bugs if clicked on
    const elements = document.getElementsByClassName("sidebar-bugs");
    const collapsing = elements[0].nextElementSibling.classList.contains("collapsing");
    if (!collapsing) {
        const selector = document.querySelector(".show-selector");
        const flag = selector.classList.contains("show-function");
        if (flag) {
            selector.classList.remove("show-function");
            selector.textContent = "Hide all";
            for(let i = 0; i < elements.length; i++) {
                if (elements[i].nextElementSibling.classList.contains("collapse")) {
                    elements[i].click();
                }
            }
        } else {
            selector.classList.add("show-function");
            selector.textContent = "Show all";
            for(let i = 0; i < elements.length; i++) {
                if (!elements[i].nextElementSibling.classList.contains("collapse")) {
                    elements[i].click();
                }
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
    const borderColor = gameColors[input] ? colorRGB(16, 1, input) : input;
    return "<hr style='border-color:" + borderColor + "'>";
}

function setTheme(element) {
    const game = element.dataset.theme;
    const other = document.querySelector("[data-css]");
    other.href = `css/themes/${game}.css`
    initCustomColor();
    setTimeout(() => {
        initCustomColor();
    }, 100);
    localStorage.selectedTheme = game;
}


///////////////////// DEBUG /////////////////////

function debug() {
    const text = '## hello, **markdown**!',
    html = MD.makeHtml(text);
	console.log(html);
}

function mode(array) {
    if(array.length == 0)
        return null;
    let modeMap = {};
    let maxEl = array[0], maxCount = 1;
    for(let i = 0; i < array.length; i++) {
        let el = array[i];
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

async function checkFileExists(fileUrl) {
    try {
        const response = await fetch(fileUrl);
        return response.status === 200;
    } catch (error) {
        return false;
    }
  }

///////////////////// INIT /////////////////////

function initSidebarContent() {
    const colDecrease = -16;
    initSidebarGlitches(colDecrease);
    initSidebarThemes(colDecrease);
}

function initSidebarThemes(colDecrease) {
    const themes = document.getElementsByClassName("circle-wrapper");
    for (let i=0; i < themes.length; i++) {
        const parent = themes[i].parentElement;
        const game = parent.dataset.theme;
        let color = colorRGB(colDecrease, 1, game);
        if (game == "th17") {
            color = colorRGB(8, 1, game);
        }
        parent.style.setProperty('--clr-theme', color);

        const next = themes[i].nextElementSibling;
        next.innerText = `${names1[game]["jp"]}～${names1[game]["en"]}`;
    }
}

async function initSidebarGlitches(colDecrease) {
    try {
        const response = await fetch('json/glitch-tree.json');
        const data = await response.json();
        const identifiers = document.querySelectorAll("#page-bugs li ul");
        const header = document.querySelectorAll("#page-bugs li button");
        for (let i = 0; i < identifiers.length; i++) { // does it games.length times
            const thnr = identifiers[i].id.slice(5); // bugs-th10 ---> th10
            const child = header[i+1];
            child.style.borderTopWidth = '1px';
            child.style.borderColor = colorHex(thnr);
            const content = document.getElementById('bugs-'+thnr+'');
            for (let j = 0; j < Object.keys(data[thnr]).length; j++) {
                content.innerHTML += '<li><div class="left-border-color"><a href="#/bugs/'+thnr+'/'+j+'" style="border-color: '+colorRGB(colDecrease, 1, thnr)+';">'+data[thnr][j]['title']+'</a></div></li>'; 
            }
        }
    } catch (error) {
        console.error('Error fetching or parsing names.json:', error);
    }
}

function initMarkdown(error) { //puts html in id 'test'
	const input = document.getElementById("mdcontent").innerHTML; //is md text
	const nav = document.querySelector("#mdcontent");
    if (!error) {
	    nav.innerHTML = MD.makeHtml(input);
        initCustomColor();
        return;
    }
    nav.innerHTML = MD.makeHtml("<h1><span style='color:red'>ERROR:</span> File at \""+window.location.href+"\" not found.</h1><br><h3>Try reloading using <span class='highlight-txt'>Ctrl + F5</span>, or <span class='highlight-txt'>clearing browser cache</span> of this site.<br>If the problem persists, contact me on Discord: Nylilsa#9310.</h3><br><br><br><h2><a class='url' href='#/home'>Go to Home page</a></h2>");
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
}

function initAutoHideMenu() { // hides menu when scrolling
    const menu = document.getElementById('header');
    let previousScrollTop = document.scrollingElement.scrollTop;
    const height = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
    document.addEventListener('scroll', function () {
        if (document.scrollingElement.scrollTop < previousScrollTop) { // if scroll upwards
            menu.style.transform = 'translateY(0px)';
        } else {
            menu.style.transform = `translateY(calc(-1 * calc(${height})))`;
        }
        previousScrollTop = document.scrollingElement.scrollTop;
    }, { passive: true });
}

function initHashChange() {
    setTimeout(() => {
        window.addEventListener('hashchange', (e) => {
            toggleSidebar(true);
            initChartStuff(() => {
                loadMarkdown(initRemoveHash(false));
            })
        }, false)}
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
	const hr = document.getElementsByClassName('hr_major');
	const box = document.getElementsByClassName('box');
	const toc = document.getElementsByClassName('toc');
    const header = document.getElementById('header');
	for(let i = 0; i < hr.length; i++) {
		hr[i].style.borderColor = colorRGB(32, 1);
	}
	for(let i = 0; i < box.length; i++) {
		box[i].style.borderColor = colorRGB(-32, 1);
	}
	for(let i = 0; i < toc.length; i++) {
		toc[i].style.borderColor = colorRGB(-32, 1);
	}
	header.style.borderColor = colorRGB(-16, 1);
}

function initKeys() {
    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            toggleSidebar(true);
        }
    });
}

function initChartStuff(callback) {
    if (initRemoveHash(false) == 'wr.md') {
        Promise.all([
            import('./chart.js'),
            import('../lib/chart.js'),
        ]).then(([myChart, libChart]) => {
            Object.entries(myChart).forEach(([name, exported]) => window[name] = exported);
            Object.entries(libChart).forEach(([name, exported]) => window[name] = exported);
            return import('../lib/chartjs-adapter-date-fns.bundle.min.js');
        }).then((libChartHelper) => {
            Object.entries(libChartHelper).forEach(([name, exported]) => window[name] = exported);
        }).then(() => {
            callback();
        }).catch((error) => {
            console.error(error);
        });
        return;
    } else {
        callback();
    }
}

function initDropdownToggle() {
    const menus = document.getElementsByClassName("dropdown-toggle");
    const time = getComputedStyle(document.documentElement).getPropertyValue('--time-animation');
    const numTime = time.match(/\d+/g).map(Number)[0];
    for (let i=0; i < menus.length; i++) {
        const dropdown = menus[i];
        const child = dropdown.nextElementSibling;
        child.style.minHeight = "0";
        dropdown.onclick = () => {
            if (!child.classList.contains("collapsing")) {
                child.classList.toggle("collapse");
                child.classList.toggle("collapsing");
                setTimeout(() => {
                    child.classList.toggle("collapsing");
                    child.classList.toggle("show");
                }, numTime);
                const height = child.scrollHeight;
                if (!child.classList.contains("show")) {
                    child.style.minHeight = `${height}px`;
                } else {
                    child.style.minHeight = "0";
                }
            }
        }
    }
}

function init() {
    function commonInit() {
        loadMarkdown(initRemoveHash(false));
        initRememberScroll();
        initDropdownToggle();
        initCustomColor();
        initSidebarContent();
        initHashChange();
        initKeys();
        initAutoHideMenu();
    }
    initChartStuff(() => {
        commonInit();
    })
}

init();