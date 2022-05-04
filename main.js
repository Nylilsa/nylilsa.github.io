let MD = new showdown.Converter({
	extensions: [ext],
	tables: true,
	strikethrough: true,
	simpleLineBreaks: true
});


function initRemoveHash() { //removes #page=
	return window.location.hash.replace("#page=","")+ ".md";
}

function loadMarkdown(path) { //loads page
	window.location.href = window.location.origin + '/#page=' + path.replace(".md",""); //changes url
	let xhttp = new XMLHttpRequest(); //from this point on, calls for file and loads file
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    	document.getElementById("mdcontent").innerHTML = this.responseText;
		initMarkdown(); //this works somehow
		}
	}

	if (path) { //if path exists, then load .md
		xhttp.open("GET", path, true);
		xhttp.send();
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
    let style = document.createElement("style");

	style.className = "scrollbars";
    let css = "::-webkit-scrollbar {width: 8px;}  ::-webkit-scrollbar-track {box-shadow: inset 0 0 2px grey; }::-webkit-scrollbar-thumb {background: " + colorHex(); +"";
	css += "; border-radius: 1px;}::-webkit-scrollbar-thumb:hover {background: " +colorRGB();+ "";
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

function colorHex() {
	let gameName = getGameFromURL();
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
		th17: '#190E0E',
		th18: '#1DD294'
	}
	return gameColors[gameName] || "#888888"
}


function colorRGB() {
	const add = 32;
	let colourHex = colorHex();
	let rHex = "0x" + colourHex.substring(1, 3); // 0xAB
	let gHex = "0x" + colourHex.substring(3, 5); // 0xCD
	let bHex = "0x" + colourHex.substring(5, 7); // 0xEF

	let rDec = parseInt(rHex) + add;
	let gDec = parseInt(gHex) + add;
	let bDec = parseInt(bHex) + add;

	if (rDec > 255) {rDec = 255;}
	if (gDec > 255) {gDec = 255;}
	if (bDec > 255) {bDec = 255;}

	let output = "rgba("+rDec+", "+gDec+ ", "+bDec+", 1.0)"
	//console.log(output);
	return output;
}

function getGameFromURL() {
	let url = window.location.hash; // is #page=bugs/th18/0
	let gameName;
	if (url.slice(0, 11) == "#page=bugs/") { // prevents page from not loading stuff if it is not true
		gameName = /\#page\=bugs\/(.*?)\//i.exec(url)[1]; // ddc
	}
	return gameName;
}

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
	return htmlText.trim()
}

function setWindowTitleDirect(str) {
	document.title = str;
}

function generateTable(input) { // generates tables of shottypes of HSifS and WBaWC
	const yes = '✔️';
	const no = '❌';
	// tableShottype is ID of div in showdown-ext.js
	let content = document.getElementById('tableShottype');
	if (input.length == 20) { //hsifs
		str = '<table><thead><tr><th class="left">Subshot</th><th>Reimu</th><th>Cirno</th><th>Aya</th><th>Marisa</th></tr></thead><tbody><tr><td class="left">Spring</td>';
		for (let i = 0; i < input.length; i++) {
			if (i == 4) {str += '</tr><tr><td class="left">Summer</td>';}
			if (i == 8) {str += '</tr><tr><td class="left">Autumn</td>';}
			if (i == 12) {str += '</tr><tr><td class="left">Winter</td>';}
			if (i == 16) {str += '</tr><tr><td class="left">Extra</td>';}
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
			if (i == 3) {str += '</tr><tr><td class="left">Otter</td>';}
			if (i == 6) {str += '</tr><tr><td class="left">Eagle</td>';}
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


function highlightCode(content) {
	return content.replace(/_/g, "\\_").replace(/\*/g, "\\*");
}


function invertHex(hex) {
	return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}


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

function initSidebarContent() {
	const names = {
		th06: ['Boss Attack Skip'],
		th07: ['Merlin Glitch'],
		th08: ['Pausing During Dialogue Desync'],
		th09: ['nothing so far'],
		th95: ['nothing so far'],
		th10: ['MarisaB 3 Power Damage', 'Corrupt replays'],
		th11: ['Negative Spell Bonus'],
		th12: ['ReimuA Bomb Desync', 'Score Display Overflow'],
		th125:['nothing so far'],
		th128:['nothing so far'],
		th13: ['Incorrect boss position during spell practice'],//, 'Misalignment of timer'],
		th14: ['Underflow', 'Bulletless Kagerou', "Marisa's Lasers", 'Barrier Bug', 'Gohei Duplication', 'Benben Spell 2 Crash', 'Screen-flipping Effect Undo', "Item Duplication through Game's Speed"],
		th143:['nothing so far'],
		th15: ['Sagume Skip', 'Red Background', "Doremy's First Non-spell Typo", 'No items after a Survival spell-card'],
		th16: ['(Sub-)shottypes Not Functioning','Stage 5 Incorrect Spellcard name'],
		th165:['nothing so far'],
		th17: ["YoumuEagle's Damage Cap", 'Instant Hyper Deactivation', 'Death by Intentional Hyper Break'],
		th18: ["Item Duplication through Game's Speed", 'Chimata Final Timeout Crash', 'D press Desync', 'Takane Card Cost', 'Practice mode 0 bombs', 'Centipede + Wolf cards combination']
	}

	let identifiers = document.querySelectorAll("#pageBugs li ul");
	let k = 0
	for (let i = 0; i < identifiers.length; i++) { // does it games.length times
		thnr = identifiers[i].id.slice(5) // bugs-th10 ---> th10
		let content = document.getElementById('bugs-'+thnr+'');
		for (let j = 0; j < names[thnr].length; j++) {
			content.innerHTML += '<li><a href="#page=bugs/'+thnr+'/'+j+'" onclick="loadMarkdown(\'bugs/'+thnr+'/'+j+'.md\')">'+names[thnr][j]+'</a></li>'; // appends html to variable 'content' 
			k += 1
		}
	}
	//console.log(k) // shows number of pages ive written so far
}

function initSidebarColors() { // UNUSED - i want to make it so that there is a little bit of color next to the game name text
	let identifiers = document.querySelectorAll("#pageBugs li ul");
	for (let i = 0; i < identifiers.length; i++) { // does it games.length times
		height = document.querySelectorAll("a[href='#"+identifiers[i].id+"']")[0].clientHeight
		console.log(height)
	}
}

function initCustomColor() {
	initScrollBar();
	initNavColor();
}

function initNavColor() { // changes color to match the game's color
	let elements = document.getElementsByClassName('hr_major'); // get all elements
	for(let i = 0; i < elements.length; i++) {
		elements[i].style.borderColor = colorRGB();
	}
}

function init() {
	loadMarkdown(initRemoveHash()); //loads in md 
	initCustomColor();
	initSidebarContent();
	//debug();
}

window.addEventListener('hashchange', initCustomColor(), false); // if page is reloaded then execute function


init();






