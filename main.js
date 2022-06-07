let MD = new showdown.Converter({
	extensions: [ext],
	noHeaderId: false,
	openLinksInNewWindow: true,
	simpleLineBreaks: true,
	strikethrough: true,
	tables: true
});

function loadMarkdown(path) { //loads page
	window.location.href = window.location.origin + '/#/' + path.replace(".md",""); //changes url
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
	const names = {
		th06: ['Boss Attack Skip', 'Dialogue Pause Desync', 'Bomb Pause Desync'],
		th07: ['Merlin Glitch', 'Dialogue Pause Desync'],
		th08: ['Dialogue Pause Desync', 'Unintended Last Spell Trigger'],
		th09: ['Stage Skip'],
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
	const colDecrease = -16;

	const identifiers = document.querySelectorAll("#pageBugs li ul");
	let k = 0;
	for (let i = 0; i < identifiers.length; i++) { // does it games.length times
		thnr = identifiers[i].id.slice(5) // bugs-th10 ---> th10
		let content = document.getElementById('bugs-'+thnr+'');

		content.innerHTML += '<li><div class="left-border-color"><a href="#/bugs/'+thnr+'/'+0+'" onclick="loadMarkdown(\'bugs/'+thnr+'/'+0+'.md\')" style="border-color: '+colorRGB(colDecrease, thnr)+'; border-top-width: 1px;">'+names[thnr][0]+'</a></div></li>';
		k += 1;

		for (let j = 1; j < names[thnr].length; j++) {
			content.innerHTML += '<li><div class="left-border-color"><a href="#/bugs/'+thnr+'/'+j+'" onclick="loadMarkdown(\'bugs/'+thnr+'/'+j+'.md\')" style="border-color: '+colorRGB(colDecrease, thnr)+';">'+names[thnr][j]+'</a></div></li>'; 
			k += 1;
		}
	}
	//console.log(k) // shows number of pages ive written so far
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
    }, { passive: true });
}


function initRemoveHash() { //removes #/
	let c = window.location.hash.replace("#/","")+ ".md";
	if (c == '.md') {
		return 'home.md';
	} 
	return c;
}

function initResize() { // calls every time window changes
	window.onresize = resize;
	resize();
};

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
	loadMarkdown(initRemoveHash()); //loads in md 
	initCustomColor();
	initSidebarContent();
	initResize();
	initAutoHideMenu()
	//debug();
}

window.addEventListener('hashchange', initCustomColor(), false); // if page is reloaded then execute function

init();






