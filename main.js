let MD = new showdown.Converter({
	extensions: [ext],
	noHeaderId: false,
	openLinksInNewWindow: true,
	simpleLineBreaks: true,
	strikethrough: true,
	tables: true
});

function loadMarkdown(path) { //loads page
	window.location.href = window.location.origin + '/#/' + path.replace(".md","") + initRemoveHash(1); //changes url
	let xhttp = new XMLHttpRequest(); //from this point on, calls for file and loads file
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    	document.getElementById("mdcontent").innerHTML = this.responseText;
		initMarkdown(); //this works somehow
		jumpTo(initRemoveHash(1));
		}
	}

	if (path) { //if path exists, then load .md
		xhttp.open("GET", path, true);
		xhttp.send();
		
	}

	//if button is clicked, then sidebar (on mobile!) is closed automatically.
	document.getElementById('sidebar').className = 'sidebar-class-desktop';

}

function colorHex(input) { // argument is optional
	if (typeof input === 'undefined') { // checks if argument does not exist
		input = getGameFromURL();
	}

	const gameColors = {
		th06: '#FF0000',
		th07: '#FF8ED2',
		th08: '#333399',
		th09: '#058060',
		th95: '#009973',
		th10: '#96B300',
		th11: '#591400',
		th12: '#4169E1',
		th125: '#7D3884',
		th128: '#00C8C8',
		th13: '#4A808C',
		th14: '#AA7777',
		th143: '#B6423C',
		th15: '#6A47BE',
		th16: '#176E0E',
		th165: '#AE11D5',
		th17: '#190E0E', //original color, but way too dark
		//th17: '#361C1C', //replacement color
		th18: '#1DD294'
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

	let output = "rgba("+rDec+", "+gDec+ ", "+bDec+", 1.0)";
	//console.log(output);
	return output;
}

function getGameFromURL() {
	let url = window.location.hash; // is #/bugs/th18/0
	let gameName;
	if (url.slice(0, 6) == "#/bugs") { // prevents page from not loading stuff if it is not true
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
	let content = document.getElementById('table-shottype');
	if (input.length == 20) { //hsifs
		str = '<table><thead><tr><th class="left">Subshot</th><th>Reimu</th><th>Cirno</th><th>Aya</th><th>Marisa</th></tr></thead><tbody><tr><td class="left">Spring</td>';
		for (let i = 0; i < input.length; i++) {
			switch (i) {
				case 4: {str += '</tr><tr><td class="left">Summer</td>'; break;}
				case 8: {str += '</tr><tr><td class="left">Autumn</td>'; break;}
				case 12: {str += '</tr><tr><td class="left">Winter</td>'; break;}
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
	} 
	if (input.length == 9) { //wbawc
		str = '<table><thead><tr><th class="left">Spirit</th><th>Reimu</th><th>Marisa</th><th>Youmu</th></tr></thead><tbody><tr><td class="left">Wolf</td>';
		for (let i = 0; i < input.length; i++) {
			switch (i) {
				case 3: {str += '</tr><tr><td class="left">Otter</td>'; break;}
				case 6: {str += '</tr><tr><td class="left">Eagle</td>'; break;}
			}
			if (input[i] == 1) {
				str += '<td>'+yes+'</td>';
			} else {
				str += '<td>'+no+'</td>';
			}
		}
		str += '</tr></tbody></table>';
		content.innerHTML += str;
	} 
}

function toggleSidebar() { //changes class of sidebar upon button press
	const sidebar = document.getElementById('sidebar'); 
	if (sidebar.className == "sidebar-class-mobile") {
		sidebar.className = 'sidebar-class-desktop';
		return;
	}
	if (sidebar.className == "sidebar-class-desktop") {
		sidebar.className = 'sidebar-class-mobile';
	}
	
}

function resize() { //changes property of sidebar button and sidebar class
	const ratio = window.innerWidth / window.innerHeight;
	const sidebar = document.getElementById('sidebar'); 
	const hidden = document.getElementsByClassName('hidden'); //for toggling visibility of button (should only appear on mobile)
	const maxAspectRatio =  14 / 16; // must be same as aspect ration in style.css

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

function jumpTo(id) {
	if (id === '') { 
		return;
	}
	setTimeout(() => { 
		const top = document.getElementById(id.replace("#","")).offsetTop;
		window.scrollTo(0, top);
	}, 100);
}

function citeFunction(key) {
	const content = citations[key];
	// DATE
	let datum
	const intl = "en-US";
	const options = {calendar: 'iso8601', year: 'numeric', month: 'long', day: 'numeric'};
	const rawDatum = new Date(content.date);
	if (typeof rawDatum == "object" && rawDatum == "Invalid Date") {
		datum = content.date;
	} else {
		datum = new Intl.DateTimeFormat(intl, options).format(rawDatum);
	}

	const author = content.author;
	const title = content.title;
	const url = content.url;

	const output = citeAPA(datum, author, title, url);
	return output;
}

function citeAPA(date, author, title, url) {
	return author+'. ('+date+'). "'+title+'" <a class="url" href="'+url+'" target="_blank">'+url+'</a>';
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

///////////////////// DEBUG /////////////////////

function debug() {
    const text = '## hello, **markdown**!',
    html = MD.makeHtml(text);
	console.log(html);
}

function show() { //debug - shows all elements in navbar if clicked on
	let elements = document.getElementsByClassName('list-unstyled');
	for(let i = 0; i < elements.length; i++) {
		elements[i].classList.add("show");
	}
}

///////////////////// INIT /////////////////////

function initSidebarContent() {
	const colDecrease = -16;
	const identifiers = document.querySelectorAll("#pageBugs li ul");
	const header = document.querySelectorAll("#pageBugs li a");
	let k = 0;
	for (let i = 0; i < identifiers.length; i++) { // does it games.length times
		const thnr = identifiers[i].id.slice(5); // bugs-th10 ---> th10
		const child = header[i];
		child.style.borderTopWidth = '1px';
		child.style.borderColor = colorHex(thnr);
		const content = document.getElementById('bugs-'+thnr+'');
		k += 1;

		for (let j = 0; j < names[thnr].length; j++) {
			content.innerHTML += '<li><div class="left-border-color"><a href="#/bugs/'+thnr+'/'+j+'" onclick="loadMarkdown(\'bugs/'+thnr+'/'+j+'.md\')" style="border-color: '+colorRGB(colDecrease, thnr)+';">'+names[thnr][j]+'</a></div></li>'; 
			k += 1;
		}
	}
	//console.log(k) // shows number of pages ive written so far
}

function initJson() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "citations.json", true); // has to be TRUE
	xhttp.send(null);
	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState === 4 && xhttp.status === 200) {
		citations = JSON.parse(xhttp.responseText); // globally defined
		//loadCitation(citations);
	  }
	}
}

function initMarkdown() { //puts html in id 'test'
	let input = document.getElementById("mdcontent").innerHTML; //is md text
	let $nav = document.querySelector("#mdcontent");
	let html = "";
	html += MD.makeHtml(input);
	$nav.innerHTML = html;
	initCustomColor(); // changes color of divs based on page
}

function initScrollBar() {
    // Create the <style>
    const style = document.createElement("style");

	style.className = "scrollbars";
    let css = "::-webkit-scrollbar {width: 4px;}  ::-webkit-scrollbar-track {box-shadow: inset 0 0 2px grey; }::-webkit-scrollbar-thumb {background: " + colorHex(); +"";
	css += "; border-radius: 1px;}::-webkit-scrollbar-thumb:hover {background: " +colorRGB(32);+ "";
	css += "; }";

    // WebKit hack :
    style.appendChild(document.createTextNode(css));

	// if class exists, do not append but instead change color
	if (document.getElementsByClassName('scrollbars').length >= 1) {
		document.getElementsByClassName('scrollbars')[0].innerHTML = css;
		return;
	}
    // Add the <style> element to the page

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
		window.addEventListener('hashchange', initCustomColor(), false); // if page is reloaded then execute function
    }, { passive: true });
}


function initRemoveHash(input) { //removes #/
	let c = window.location.hash.replace("#/","") + ".md";
	let hash = '';
	if (c == '.md') {
		c = 'home.md';
	} 
	if (c.includes("#")) {
		hash = c.substring(c.indexOf("#") + 1).replace(".md",""); // gets whatever is after hash
		hash = "#" + hash;
		c = c.split('#')[0] + ".md";
	}
	if (input % 2 == 0) {
		return c;
	} else {
		return hash;
	}
	
}

function initResize() { // calls every time window changes
	window.onresize = resize;
	resize();
};

function initRememberScroll() {
	if (initRemoveHash(1).length > 0) {
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
	let elements = document.getElementsByClassName('hr_major'); // get all elements
	for(let i = 0; i < elements.length; i++) {
		elements[i].style.borderColor = colorRGB(32);
	}
	let mobile = document.getElementById('header');
	mobile.style.borderColor = colorRGB(-16);
}

function init() {
	//initJson();
	loadMarkdown(initRemoveHash(0)); //loads in md 
	initRememberScroll();
	initCustomColor();
	initSidebarContent();
	initResize();
	initAutoHideMenu();
	//debug();
}

init();