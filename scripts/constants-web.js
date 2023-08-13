const contributors = {
	"S7daW4HHTY": {"name": "32th System", "help": "Provided various aids", "url": "https://youtube.com/32thc"},
	"1AThrt4mzz": {"name": "Helio Knight", "help": "HSiFS page 3 research", "url": "https://www.youtube.com/channel/UCNbaT2iVuYKN5q94b9UlTEA"},
	"0lDi5bpXmy": {"name": "kana0603", "help": "Provided various EoSD glitches & replays", "url": "https://twitter.com/kana_th6"},
	"VSlamYrAwJ": {"name": "zero318", "help": "Massively helped with the Merlin glitch", "url": "https://github.com/zero318"}
};

const contributorsWRs = {
	"0l": {"name": "Christian Azinn", "help": "Various PC-98 games", "url": "https://www.twitch.tv/christianazinn"},
	"1A": {"name": "Crispy", "help": "MoF Lunatic", "url": "https://twitter.com/Crispyz_th"},
	"Yg": {"name": "Dagoth2hu", "help": "PoFV all categories", "url": "https://www.youtube.com/channel/UCWHrmFVTt_YoyiHNBKs6_xw"},
	"dQ": {"name": "Diamenciory", "help": "EoSD Lunatic", "url": "https://www.youtube.com/@diamenciory1439"},
	"ki": {"name": "KirbyComment", "help": "PC-98 games all categories, HSiFS all categories", "url": "https://www.youtube.com/channel/UCVZ07KKLFIJp4bNGgjNLsIw"},
	"aw": {"name": "Levea", "help": "IN Lunatic", "url": "https://twitter.com/Levea18/"},
	"s6": {"name": "Maribel Hearn", "help": "Royalflare Archive and the WR page", "url": "https://maribelhearn.com/"},
	"S7": {"name": "morth", "help": "TD Extra", "url": "https://www.youtube.com/channel/UCpURmfyYBzoLJJLa3DDvY8g"},
	"S8": {"name": "pingval", "help": "EoSD, PCB, IN and PoFV", "url": "https://twitter.com/pingval"},
	"VS": {"name": "Rivers", "help": "IN Lunatic", "url": "https://www.twitch.tv/rivers_th08"}
};


const bugTracker = {
	th06: {"completed-pages": 2, "total-glitches": 18, "comment": "Not likely to change unless we look at glitches in older versions"},
	th07: {"completed-pages": 2, "total-glitches": 15, "comment": "Not likely to change unless we look at glitches in older versions"},
	th08: {"completed-pages": 1, "total-glitches": 15, "comment": "Not likely to change unless we look at glitches in older versions"},
	th09: {"completed-pages": 0, "total-glitches": 9, "comment": "Likely to change much"},
	th95: {"completed-pages": 0, "total-glitches": 2, "comment": "Number is going to increase"},
	th10: {"completed-pages": 4, "total-glitches": 18, "comment": "Not likely to change"},
	th11: {"completed-pages": 7, "total-glitches": 23, "comment": "Not likely to change"},
	th12: {"completed-pages": 2, "total-glitches": 18, "comment": "Not likely to change"},
	th125: {"completed-pages": 1, "total-glitches": 3, "comment": "Number is going to increase"},
	th128: {"completed-pages": 0, "total-glitches": 2, "comment": "Number is going to increase"},
	th13: {"completed-pages": 1, "total-glitches": 20, "comment": "Not likely to change"},
	th14: {"completed-pages": 3, "total-glitches": 26, "comment": "Not likely to change"},
	th143: {"completed-pages": 1, "total-glitches": 6, "comment": "Number is going to increase"},
	th15: {"completed-pages": 4, "total-glitches": 43, "comment": "Not likely to change"},
	th16: {"completed-pages": 4, "total-glitches": 27, "comment": "Not likely to change"},
	th165: {"completed-pages": 0, "total-glitches": 12, "comment": "Number is very likely to increase"},
	th17: {"completed-pages": 9, "total-glitches": 38, "comment": "Not likely to change"},
	th18: {"completed-pages": 8, "total-glitches": 41, "comment": "Number is likely to increase"},
	th185: {"completed-pages": 0, "total-glitches": 11, "comment": "Number is likely to increase"},
	th19: {"completed-pages": 0, "total-glitches": 1, "comment": "Number is going to increase when the game releases"},
};


const colorsForChart = {
    th01: {"colors": ['#36a2eb', '#ff6384']},
    th02: {"colors": ['#36a2eb', '#ff6384', '#ff9f40']},
    th03: {"colors": ['#36a2eb', '#ff6384', '#4bc0c0', '#ff9f40', '#9966ff', '#ffcd56', '#c9cbcf', '#287233', '#6C3B2A']},
    th04: {"colors": ['#dc241f', 'd0#dc241f', '#afae17', 'd0#afae17']},
    th05: {"colors": ['#dc241f', '#afae17', '#36a2eb', '#ff6384']},
    th06: {"colors": ['#dc241f', 'd0#dc241f', '#afae17', 'd0#afae17']},
	th07: {"colors": ['#dc241f', 'd0#dc241f', '#afae17', 'd0#afae17', '#BEBEBE', 'd0#BEBEBE']},
	th08: {"colors": ['#ff0081', '#a4e810', '#bd6c5e', '#ff9f40', 'd0#dc241f', 'd1#A020F0', 'd0#FFFF00', 'd1#32CD32', 'd0#888888', 'd1#e34234',  'd0#BBBBBB', 'd1#FF00FF']},
	th09: {"colors": ['#36a2eb', '#ff6384', '#4bc0c0', '#ff9f40', '#9966ff', '#ffcd56', '#c9cbcf', '#287233', '#6C3B2A', '#ff0000', '#32CD32', '#777777', '#AE11D5', '#1DD294']},
	th10: {"colors": ['#dc241f', 'd0#dc241f', 'd1#dc241f', '#afae17', 'd0#afae17', 'd1#afae17']},
	th11: {"colors": ['#dc241f', 'd0#dc241f', 'd1#dc241f', '#afae17', 'd0#afae17', 'd1#afae17']},
	th12: {"colors": ['#dc241f', 'd0#dc241f', '#afae17', 'd0#afae17', '#29b917', 'd0#29b917']},
	th128: {"colors": ['#00C8C8']},
	th128other: {"colors": ['#36a2eb', '#ff6384', '#4bc0c0', '#ff9f40', '#9966ff', '#ffcd56']},
	th13: {"colors": ['#dc241f', '#afae17', '#29b917', '#BBBBBB']},
	th14: {"colors": ['#dc241f', 'd0#dc241f', '#afae17', 'd0#afae17', '#888888', 'd0#888888']},
	th15: {"colors": ['#dc241f', '#afae17', '#29b917', '#6A47BE']},
	th16: {"colors": ['#dc241f', '#00C8C8', '#ff9f40', '#afae17']},
	th16other: {"colors": ['#FF9FC9', '#50D030', '#FF8800', '#465CF0', 'd0#FF9FC9', 'd0#50D030', 'd0#FF8800', 'd0#465CF0', 'd1#FF9FC9', 'd1#50D030', 'd1#FF8800', 'd1#465CF0', 'd2#FF9FC9', 'd2#50D030', 'd2#FF8800', 'd2#465CF0']},
	th17: {"colors": ['#FF4F51', '#8DFB78', '#7E59D9', 'd0#FF4F51', 'd0#8DFB78', 'd0#7E59D9', 'd1#FF4F51', 'd1#8DFB78', 'd1#7E59D9']},
	th18: {"colors": ['#dc241f', '#afae17', '#888888', '#29b917']},
}
