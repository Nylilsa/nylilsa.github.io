"use strict";

let isEclListenedAdded = false;
let eclJson = null;
let figureId = 0;
let eclJsonId = 0;
let citeId = 0;
const MEDIA_QUERY_WIDTH = 500; // value must match one in css file
const MD = new showdown.Converter({
	extensions: [ext],
	noHeaderId: false,
	openLinksInNewWindow: true,
	simpleLineBreaks: true,
	strikethrough: true,
	tables: true
});

async function checkBugPath(path) {
    const check = path.slice(0, 5);
    if (check !== "bugs/") {return path}
    const data = await fetchData("json/glitch-tree.json");
    const game = path.split("/")[1];
    const longName = path.split("/")[2].replace(".md", "");
    for (const key in data[game]) {
        if (data[game].hasOwnProperty(key)) {
            const urlNames = data[game][key]["url-name"];
            if (urlNames.includes(longName)) {
                const numericPath = path.replace(longName, key)
                return numericPath;
            }
        }
    }
    return path;
}

async function loadMarkdown(path) { //loads page
    const anchor = initRemoveHash(true);
    const correctPath = await checkBugPath(path);
	window.location.href = window.location.origin + '/#/' + path.replace(".md","") + anchor //changes url
	const xhttp = new XMLHttpRequest(); //from this point on, calls for file and loads file
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    	document.getElementById("mdcontent").innerHTML = this.responseText;
		initMarkdown(false); 
		jumpTo(initRemoveHash(true), 100);
		}
	}
	if (path) {
		xhttp.open("GET", correctPath, true);
        xhttp.send();
		xhttp.onload = function() {
            if (xhttp.status === 404) {
                initMarkdown(true);
                return;
            }
        }
	}
}

function colorHex(input) {
    const def = getComputedStyle(document.documentElement).getPropertyValue('--clr-default');
	return gameColors[input] || def || "#47748b";
}

function colorRGB(add, opacity, game) {
	let clrHex = colorHex(game);

	if (typeof game === 'undefined') { 
		clrHex = colorHex();
	}

    clrHex = clrHex.replaceAll(" ", "");
 
	let rHex = "0x" + clrHex.substring(1, 3); // 0xAB
	let gHex = "0x" + clrHex.substring(3, 5); // 0xCD
	let bHex = "0x" + clrHex.substring(5, 7); // 0xEF

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

function setWindowTitleDirect(str) {
	document.title = str;
}

function toggleSidebar(direction, forceClose) { //changes class of sidebar upon button press
    const time = getComputedStyle(document.documentElement).getPropertyValue('--time-animation').match(/\d+/g).map(Number)[0];
    setTimeout(() => {
        checkElementResize();
    }, time)
	const sidebarLeft = document.getElementById('sidebar-left');
	const sidebarRight = document.getElementById('sidebar-right');
	const content = document.getElementById('content');
	const header = document.getElementById('header');
	const chart = document.getElementById('wr-chart-wrapper');
	const wrButtons = document.getElementById('wr-game-buttons');
    const fade = document.getElementById("fade");
    
    const isLeft = direction === "left";
    const sidebar = isLeft ? sidebarLeft : sidebarRight;
    const paddingSide = isLeft ? 'Left' : 'Right';
    
    sidebar.classList.toggle('sidebar-set-open');
    const isClosing = forceClose || !sidebar.classList.contains('sidebar-set-open');
    
    if (isClosing) {
        fade.classList.remove("sidebar-toggle");
        if (chart) {
            chart.style.maxWidth = '';
            wrButtons.style.maxWidth = '';
        }
        content.style[`padding${paddingSide}`] = '';
        header.style[`padding${paddingSide}`] = '';
        sidebar.style.transform = '';
        return;
    }

    // Opening logic
    sidebar.style.transform = isLeft
        ? 'translateX(0)'
        : 'translateX(calc(100vw - var(--sidebar-width)))';
    
    fade.classList.add("sidebar-toggle");
    content.style[`padding${paddingSide}`] = 'calc(var(--sidebar-width) + 3vmax)';
    // header.style[`padding${paddingSide}`] = 'calc(var(--sidebar-width))';
    
    if (chart) {
        const maxWidthVal = 'calc(max(1030px, calc(88vw - var(--sidebar-width) + 3vmax))';
        chart.style.maxWidth = maxWidthVal;
        wrButtons.style.maxWidth = maxWidthVal;
    }

}

function jumpTo(id, duration) {
	if (id === '') { 
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

const fetchData = (() => {
    const cache = new Map();
    const fetchPromises = new Map();
    return async (path) => {
        if (!cache.has(path)) {
            if (!fetchPromises.has(path)) {
                fetchPromises.set(path, fetch(path)
                    .then(response => response.json())
                    .then(data => {
                        cache.set(path, data);
                        return data;
                    }));
            }
            return fetchPromises.get(path);
        }
        return cache.get(path);
    };
})();

async function videoFunction(key) {
    const webdata = await fetchData("json/webdata.json");
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
    return citeAPA(datum, content.author, content.title, content.url);
}

async function replayFunction(key) {
    const webdata = await fetchData("json/webdata.json");
	const content = webdata["Replays"][key];
    const path = `bugs/${content.game}/${content.url}`;
	const datum = dateFormat(content.date);
	return citeReplay(content.game, datum, content.author, content.name, content.difficulty, content.shot, content.version, path, content.note);
}

function dateFormat(date) {
	const intl = "en-US";
	const options = {calendar: 'iso8601', year: 'numeric', month: 'long', day: 'numeric'};
	let dateType;
    if (date.includes('T')) {
        dateType = new Date(date);
    } else {
        const [year, month, day] = date.split('-').map(Number);
        dateType = new Date(year, month - 1, day);
    }
    const cond = typeof dateType == "object" && dateType == "Invalid Date";
    return cond ? date : new Intl.DateTimeFormat(intl, options).format(dateType);
}

function citeAPA(date, author, title, url) {
	return author+'. 「'+date+'」. "'+title+'" <a class="url" href="'+url+'" target="_blank">'+url+'</a>';
}

function citeReplay(game, date, author, name, difficulty, shot, version, url, note) {
	if (latestVersion[game] != version) {version = '<span class="highlight-txt" style="color:#f2c200">'+version+'</span>'}
	if (note) {note = "(Note: "+note+")"}
	return 'Replay <code>'+name+'</code> by "'+author+'". '+difficulty+', '+shot+', '+version+'. 「'+date+'」. <a class="url" href="'+url+'" target="_blank">Download link</a> '+note;
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

function checkElementResize(self) {
    const tooltips = self ? [self] : document.querySelectorAll(".tooltip");
    tooltips.forEach((tooltip) => {
        const element = tooltip.nextElementSibling;
        const elementPosition = element.getBoundingClientRect();
        const mdPosition =  document.getElementById("mdcontent").getBoundingClientRect();
        const parentPosition = element.parentElement.getBoundingClientRect();
        if (elementPosition.right > mdPosition.right) {
            tooltip.style.left = ``; 
            tooltip.style.right = `${parentPosition.right - mdPosition.right}px`;
            tooltip.style.translate = `0`; 
        } else if (elementPosition.left < mdPosition.left) {
            tooltip.style.left = `-${parentPosition.left - mdPosition.left}px`; 
            tooltip.style.right = ``; 
            tooltip.style.translate = `0`; 
        } else {
            tooltip.style.left = ``; 
            tooltip.style.right = ``; 
            tooltip.style.translate = ``; 
        }
    })
}

async function replaceEclIns(type, n, id) {
    if (!isEclListenedAdded) {
        isEclListenedAdded = true;
        document.body.addEventListener("mouseover", (event) => {
            const visible = document.querySelectorAll(".visible");
            let [tip, targ] = getTip(event.target, "tooltip");
            const valid = targ?.firstElementChild?.classList.contains("tooltip");
            visible.forEach(el => {el.classList.remove("visible")})
            if (tip && valid) {
                targ.firstElementChild.classList.add("visible");
                checkElementResize(targ.firstElementChild);
            }
        })
    }
    const data = await fetchData("json/ecl.json");
    const map = ["Instructions", "Globals", "Custom"];
    const ins = map[type];
    const obj = data[ins][n];
    const name = obj["Name"];
    const div = document.createElement('div');
    const el = document.querySelector(`#ecl-cite-${id}`);
    el.dataset.tooltip = "true";
    div.innerHTML = getStringFromIns(obj, n);
    div.classList.add("tooltip");
    el.innerHTML = name;
    el.style.position = "relative";
    el.appendChild(div);

    //div2 is invisible and acts as a tooltip that doesn't move around
    const div2 = document.createElement("div");
    div2.style.width = `${div.getBoundingClientRect().width}px`;
    div2.style.position = `absolute`;
    div2.style.right = `50%`;
    div2.style.translate = `50%`;
    div2.style.visibility = `hidden`;
    el.appendChild(div2);
    checkElementResize(div);
}

function getTip(elem, key) {
	do {
		if (typeof elem.dataset[key] != "undefined")
			return [elem.dataset[key], elem];
	} while (elem = elem.parentElement);
	return ["", null];
}


function getStringFromIns(obj, n) {
    const div = document.createElement("div");
    const hr = document.createElement("hr");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const span = document.createElement("span");
    let description = obj["Description"]
    const name = obj["Name"];
    const para = obj["Parameters"];
    let titleText = `${n} - ${name}`;
    if (para) {
        let parameterStrings = para.map(paramObj => {
            const paramName = Object.keys(paramObj)[0];
            const paramType = paramObj[paramName];
            return `${paramType} <code class="mono">${paramName}</code>`;
        });
        parameterStrings = parameterStrings.join(", ");
        titleText += `(${parameterStrings})`;
        for(let i=0; i < para.length; i++) {
            const value = Object.keys(para[i])[0];
            description = description.replaceAll(`$${i+1}`, `<code class="mono">${value}</code>`);
        }
    }
    span.classList.add("mono");
    span.innerHTML = titleText;
    p1.innerHTML = span.outerHTML;
    p2.innerHTML = description;
    div.appendChild(p1);
    div.appendChild(hr);
    div.appendChild(p2);
    return div.outerHTML;
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

function setTheme(theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.selectedTheme = theme;
}

///////////////////// INIT /////////////////////

function initSidebarContent() {
    const colDecrease = -16;
    initSidebarGlitches(colDecrease);
    initSidebarThemes(colDecrease);
    initSidebarListeners();
    initSidebarVisibility();
}

function initSidebarVisibility() {
    const sidebarLeft = document.getElementById("sidebar-left");
    if (window.innerWidth >= MEDIA_QUERY_WIDTH) {
        // disbable animation
        sidebarLeft.style.transition = "transform 0.01ms ease-in-out";
        // toggle sidebar without animation
        toggleSidebar('left');
        // re-enable animation, must be in setTimeout
        setTimeout(() => {
            sidebarLeft.style.transition = "";
        }, 0) 
    }
    const savedScroll = localStorage.getItem('sidebarScroll');
    if (savedScroll !== null) {
        setTimeout(() => {
            sidebarLeft.scrollTop = savedScroll;
        }, 20)
    }
}

function initSidebarListeners() {
    document.addEventListener("click", function (event) {
        if (window.innerWidth > MEDIA_QUERY_WIDTH) return;
    
        const header = document.getElementById("header");
        if (header.contains(event.target)) return;
    
        const sidebars = [
            { id: "sidebar-left", direction: "left" },
            { id: "sidebar-right", direction: "right" }
        ];
    
        sidebars.forEach(({ id, direction }) => {
            const sidebar = document.getElementById(id);
            if (!sidebar.classList.contains("sidebar-set-open")) return;
            if (!sidebar.contains(event.target)) {
                toggleSidebar(direction, true);
            }
        });
    });
    let scrollTimeout;
    document.getElementById('sidebar-left').addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const leftSidebar = document.getElementById('sidebar-left');
            console.log(leftSidebar.scrollTop);
            localStorage.setItem('sidebarScroll', leftSidebar.scrollTop);
        }, 250);
    })
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
        const data = await fetchData("json/glitch-tree.json");
        const identifiers = document.querySelectorAll("#page-bugs li ul");
        const header = document.querySelectorAll("#page-bugs li button");
        for (let i = 0; i < identifiers.length; i++) { // does it games.length times
            const thnr = identifiers[i].id.slice(5); // bugs-th10 ---> th10
            const child = header[i+1];
            const content = document.getElementById('bugs-'+thnr+'');
            content.style.setProperty('--clr-game', `${colorHex(thnr)}`);
            child.childNodes[1].data = `${names1[thnr]["jp"]}～${names1[thnr]["en"]}`;
            for (let j = 0; j < Object.keys(data[thnr]).length; j++) {
                const li = document.createElement("li");
                const div = document.createElement("div");
                const a = document.createElement("a");
                a.href = `#/bugs/${thnr}/${data[thnr][j]["url-name"][0]}`;
                a.innerText = data[thnr][j]['title'];
                div.style.position = "relative";
                div.appendChild(a);
                li.appendChild(div);
                content.appendChild(li)
            }
        }
    } catch (error) {
        console.error('Error fetching or parsing names.json:', error);
    }
}

function initMarkdown(error) { //puts html in id 'test'
	const md = document.getElementById("mdcontent");
    if (!error) {
	    md.innerHTML = MD.makeHtml(md.innerHTML);
        return;
    }
    md.innerHTML = MD.makeHtml("<h1><span style='color:red'>ERROR:</span> File at \""+window.location.href+"\" not found.</h1><br><h3>Try reloading using <span class='highlight-txt'>Ctrl + F5</span>, or <span class='highlight-txt'>clearing browser cache</span> of this site.<br>If the problem persists, contact me on Discord: Nylilsa#9310.</h3><br><br><br><h2><a class='url' href='#/home'>Go to Home page</a></h2>");
}

function initHashChange() {
    setTimeout(() => {
        window.addEventListener('hashchange', (e) => {
            if (window.innerWidth < MEDIA_QUERY_WIDTH) { 
                toggleSidebar('left', true);
            }
            initChartStuff(() => {
                loadMarkdown(initRemoveHash(false));
            })
        }, false)
    }, 500); // delay is needed or else hashchange and init are executed at once
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
    const time = getComputedStyle(document.documentElement).getPropertyValue('--time-animation')
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
        initSidebarContent();
        initHashChange();
    }
    initChartStuff(() => {
        commonInit();
    })
}

init();