"use strict";

function generateTable(input) { // generates tables of shottypes of HSifS and WBaWC
    const yes = '<img src="/assets/green-check-mark.svg" class="icon-text">';
    const no = '<img src="/assets/red-cross.svg" class="icon-text">';
    // table-shottype is ID of div in showdown-ext.js
    const content = document.getElementById('table-shottype');
    if (input.length == 20) { //hsifs
        let str = '<table><thead><tr><th class="left">Subshot</th><th>Reimu</th><th>Cirno</th><th>Aya</th><th>Marisa</th></tr></thead><tbody><tr><td class="left"><span style="color:' + matchStyle['spring'].color + '">Spring</span></td>';
        for (let i = 0; i < input.length; i++) {
            switch (i) {
                case 4: { str += '</tr><tr><td class="left"><span style="color:' + matchStyle['summer'].color + '">Summer</span></td>'; break; }
                case 8: { str += '</tr><tr><td class="left"><span style="color:' + matchStyle['autumn'].color + '">Autumn</span></td>'; break; }
                case 12: { str += '</tr><tr><td class="left"><span style="color:' + matchStyle['winter'].color + '">Winter</span></td>'; break; }
                case 16: { str += '</tr><tr><td class="left">Extra</td>'; break; }
            }
            if (input[i] == 1) {
                str += '<td>' + yes + '</td>';
            } else {
                str += '<td>' + no + '</td>';
            }
        }
        str += '</tr></tbody></table>';
        content.innerHTML += str;
        return;
    }
    if (input.length == 9) { //wbawc
        let str = '<table><thead><tr><th class="left">Spirit</th><th>Reimu</th><th>Marisa</th><th>Youmu</th></tr></thead><tbody><tr><td class="left"><span style="color:' + matchStyle['wolf'].color + '">Wolf</span></td>';
        for (let i = 0; i < input.length; i++) {
            switch (i) {
                case 3: { str += '</tr><tr><td class="left"><span style="color:' + matchStyle['otter'].color + '">Otter</span></td>'; break; }
                case 6: { str += '</tr><tr><td class="left"><span style="color:' + matchStyle['eagle'].color + '">Eagle</span></td>'; break; }
            }
            if (input[i] == 1) {
                str += '<td>' + yes + '</td>';
            } else {
                str += '<td>' + no + '</td>';
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
        object = {
            "S7daW4HHTY": { "name": "32th System", "help": "Provided various aids", "url": "https://youtube.com/32thc" },
            "1AThrt4mzz": { "name": "Helio Knight", "help": "HSiFS page 3 research", "url": "https://www.youtube.com/channel/UCNbaT2iVuYKN5q94b9UlTEA" },
            "0lDi5bpXmy": { "name": "kana0603", "help": "Provided various EoSD glitches & replays", "url": "https://twitter.com/kana_th6" },
            "qfrV6dZExm": { "name": "Khangaroo", "help": "Massively helped with the Gohei Dupe glitch and malfunctioning shottypes glitch", "url": "https://github.com/khang06" },
            "VSlamYrAwJ": { "name": "zero318", "help": "Massively helped with the Merlin glitch", "url": "https://github.com/zero318" },
        };
    }
    if (check == 1) {
        object = {
            "CZ": { "name": "Christian Azinn", "help": "Various PC-98 games", "url": "https://www.twitch.tv/christianazinn" },
            "Li": { "name": "Crispy", "help": "MoF Lunatic", "url": "https://twitter.com/Crispyz_th" },
            "FW": { "name": "Dagoth2hu", "help": "PoFV all categories", "url": "https://www.youtube.com/channel/UCWHrmFVTt_YoyiHNBKs6_xw" },
            "Di": { "name": "Diamenciory", "help": "EoSD Lunatic", "url": "https://www.youtube.com/@diamenciory1439" },
            "RB": { "name": "icterine", "help": "PCB categories", "url": "https://www.twitch.tv/icterine_" },
            "KC": { "name": "KirbyComment", "help": "PC-98 games all categories, HSiFS all categories", "url": "https://www.youtube.com/channel/UCVZ07KKLFIJp4bNGgjNLsIw" },
            "Le": { "name": "Levea", "help": "IN Lunatic", "url": "https://twitter.com/Levea18/" },
            "MH": { "name": "Maribel Hearn", "help": "Royalflare Archive and the WR page", "url": "https://maribelhearn.com/" },
            "mo": { "name": "morth", "help": "TD Extra", "url": "https://www.youtube.com/channel/UCpURmfyYBzoLJJLa3DDvY8g" },
            "LE": { "name": "pingval", "help": "EoSD, PCB, IN and PoFV", "url": "https://twitter.com/pingval" },
            "pe": { "name": "Rivers", "help": "IN Lunatic", "url": "https://www.twitch.tv/rivers_th08" },
        };
    }
    let i = 0;
    let html = '';
    for (let lambda in object) {
        const value = Object.values(object)[i];
        html += '+ <a class="url" href="' + value.url + '" target="_blank">' + value.name + '</a> - ' + value.help;
        html += '\n';
        i++;
    }
    return html;
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
                str += '</tr><tr><td class="left">Day ' + (k + 1) + '</td>';
                k += 1;
            }
            if (array.includes(i)) {
                str += '<td>' + yes + '</td>';
            } else {
                str += '<td>' + no + '</td>';
            }
        }
        str += "</thead></table>"
        content.innerHTML += str;
        return;
    }
}