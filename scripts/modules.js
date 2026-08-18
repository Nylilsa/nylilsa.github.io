"use strict";

function contributorsFunction(check) {
    let object;
    if (check == 0) {
        object = {
            "S7daW4HHTY": { "name": "32th System", "help": "Provided various aids", "url": "https://youtube.com/32thc" },
            "1AThrt4mzz": { "name": "Helio Knight", "help": "HSiFS page 3 research", "url": "https://www.youtube.com/channel/UCNbaT2iVuYKN5q94b9UlTEA" },
            "0lDi5bpXmy": { "name": "kana0603", "help": "Provided various EoSD glitches & replays", "url": "https://twitter.com/kana_th6" },
            "qfrV6dZExm": { "name": "Khangaroo", "help": "Massively helped with the Gohei Dupe glitch and malfunctioning shottypes glitch", "url": "https://github.com/khang06" },
            "VSlamYrAwJ": { "name": "zero318", "help": "Massively helped with the Merlin glitch", "url": "https://github.com/zero318" },
            "Kb7rrv3ve5": { "name": "dannan18", "help": "Helped with the th14 Item Collection Bonus Persisting bug", "url": null },
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
            "mo": { "name": "morth", "help": "TD Extra", "url": "https://www.youtube.com/channel/UCpURmfyYBzoLJJLa3DDvY8g" },
            "LE": { "name": "pingval", "help": "EoSD, PCB, IN and PoFV", "url": "https://twitter.com/pingval" },
            "pe": { "name": "Rivers", "help": "IN Lunatic", "url": "https://www.twitch.tv/rivers_th08" },
        };
    }
    let lines = [];

    for (const value of Object.values(object)) {
        const link = value.url
            ? `<a class="url" href="${value.url}" target="_blank">${value.name}</a>`
            : value.name;

        lines.push(`+ ${link} - ${value.help}`);
    }

    return lines.join('\n');
}