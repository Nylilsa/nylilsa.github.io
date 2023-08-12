"use strict";

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

function contributorsFunction(check) {
    let object;
    if (check == 0) {
        object = contributors;
    }
    if (check == 1) {
        object = contributorsWRs;
    }
	let i = 0;
	let html = '';
	for (let lambda in object) {
		const value = Object.values(object)[i];
		html += '+ <a class="url" href="'+value.url+'" target="_blank">'+value.name+'</a> - '+value.help;
		html += '\n';
		i++;
	}
	return html;
}

function progressTable() {
	const id = document.getElementById('progress-table');
    if (!id) {return;}
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

function gameScenes(game, flag, array) {
	const content = document.getElementById('table-scenes'); // table-scenes is ID of div in showdown-ext.js
	let yes;
    let no;
    if (flag === 'true') {
		yes = '<img src="/assets/green-check-mark.svg" class="icon-text">';
		no = '<img src="/assets/red-cross.svg" class="icon-text">';
	} else {
		no = '<img src="/assets/green-check-mark.svg" class="icon-text">';
		yes = '<img src="/assets/red-cross.svg" class="icon-text">';
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