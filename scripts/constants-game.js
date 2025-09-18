const latestVersion = {
	th06: "1.02h",
	th07: "1.00b",
	th08: "1.00d",
	th09: "1.50a",
    th95: "1.50a",
	th10: "1.00a",
	th11: "1.00a",
	th12: "1.00b",
    th125: "1.00a",
	th128: "1.00a",
	th13: "1.00c",
	th14: "1.00b",
    th143: "1.00a",
	th15: "1.00b",
	th16: "1.00a",
    th165: "1.00a",
	th17: "1.00b",
	th18: "1.00a",
	th185: "1.00a",
	th19: "1.10c",
	th20: "1.00a",
};

const gameColors = {
	th01: '#B6423C',
	th02: '#7D3884',
	th03: '#FFD700',
	th04: '#90EE90',
	th05: '#AE11D5',
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
	th18: '#1DD294',
	th185: '#F58225',
	th19: '#4CD810',
	th20: '#123456', // temporary clr
};

class Match {
    constructor(icon, color) {
      this.icon = icon;
      this.color = color;
    }
}

const matchStyle = {
	"spring": new Match('assets/th-sprites/spring.png', '#FF9FC9'),
	"summer": new Match('assets/th-sprites/summer.png', '#50D030'),
	"autumn": new Match('assets/th-sprites/autumn.png', '#FF8800'),
	"winter": new Match('assets/th-sprites/winter.png', '#465CF0'),

	"wolf": new Match('assets/th-sprites/wolf.png', '#FF4F51'),
	"otter": new Match('assets/th-sprites/otter.png', '#8DFB78'),
	"eagle": new Match('assets/th-sprites/eagle.png', '#7E59D9'),
	"spec1": new Match('assets/th-sprites/special1.png', '#E1D359'),
	"spec2": new Match('assets/th-sprites/special2.png', '#E1D359'),
	"spec3": new Match('assets/th-sprites/special3.png', '#E1D359'),
	"spec4": new Match('assets/th-sprites/special4.png', '#E1D359'),
	"spec5": new Match('assets/th-sprites/special5.png', '#E1D359'),
	"spec6": new Match('assets/th-sprites/special6.png', '#E1D359'),
	"point-token": new Match('assets/th-sprites/point-token.png', '#6873D8'),
	"life-token": new Match('assets/th-sprites/life-token.png', '#F26BD3'),

	"static-red-token": new Match('assets/th-sprites/static-red-token.png', '#FF0000'),
	"static-blue-token": new Match('assets/th-sprites/static-blue-token.png', '#00FF00'),
	"static-green-token": new Match('assets/th-sprites/static-green-token.png', '#0000FF'),
	"blink-red-token": new Match('assets/th-sprites/blink-red-token.png', '#FF0000'),
	"blink-blue-token": new Match('assets/th-sprites/blink-blue-token.png', '#00FF00'),
	"blink-green-token": new Match('assets/th-sprites/blink-green-token.png', '#0000FF'),
	
    "point": new Match('assets/th-sprites/point-item.png', '#6873D8'),
    "power": new Match('assets/th-sprites/power-item.png', '#FF5555'),
    "bomb": new Match('assets/th-sprites/bomb-item.png', '#50D030'),
    "life": new Match('assets/th-sprites/life-item.png', '#F26BD3'),

    "test": new Match(1, 2)
};

const names1 = {
    "th01": {"game_number": "1", "abbreviation": "HRtP", "jp": "靈異伝", "en": "Highly Responsive to Prayers"},
    "th02": {"game_number": "2", "abbreviation": "SoEW", "jp": "封魔録", "en": "The Story of Eastern Wonderland"},
    "th03": {"game_number": "3", "abbreviation": "PoDD", "jp": "夢時空", "en": "Phantasmagoria of Dim. Dream"},
    "th04": {"game_number": "4", "abbreviation": "LLS", "jp": "幻想郷", "en": "Lotus Land Story"},
    "th05": {"game_number": "5", "abbreviation": "MS", "jp": "怪綺談", "en": "Mystic Square"},
    "th06": {"game_number": "6", "abbreviation": "EoSD", "jp": "紅魔郷", "en": "The Embodiment of Scarlet Devil"},
    "th07": {"game_number": "7", "abbreviation": "PCB", "jp": "妖々夢", "en": "Perfect Cherry Blossom"},
    "th08": {"game_number": "8", "abbreviation": "IN", "jp": "永夜抄", "en": "Imperishable Night"},
    "th09": {"game_number": "9", "abbreviation": "PoFV", "jp": "花映塚", "en": "Phantasmagoria of Flower View"},
    "th95": {"game_number": "9.5", "abbreviation": "StB", "jp": "文花帖", "en": "Shoot the Bullet"},
    "th10": {"game_number": "10", "abbreviation": "MoF", "jp": "風神録", "en": "Mountain of Faith"},
    "th11": {"game_number": "11", "abbreviation": "SA", "jp": "地霊殿", "en": "Subterranean Animism"},
    "th12": {"game_number": "12", "abbreviation": "UFO", "jp": "星蓮船", "en": "Undefined Fantastic Object"},
    "th125": {"game_number": "12.5", "abbreviation": "DS", "jp": "ダブルスポイラー", "en": "Double Spoiler"},
    "th128": {"game_number": "12.8", "abbreviation": "FW", "jp": "妖精大戦争", "en": "Fairy Wars"},
    "th13": {"game_number": "13", "abbreviation": "TD", "jp": "神霊廟", "en": "Ten Desires"},
    "th14": {"game_number": "14", "abbreviation": "DDC", "jp": "輝針城", "en": "Double Dealing Character"},
    "th143": {"game_number": "14.3", "abbreviation": "ISC", "jp": "弾幕アマノジャク", "en": "Impossible Spell Card"},
    "th15": {"game_number": "15", "abbreviation": "LoLK", "jp": "紺珠伝", "en": "Legacy of Lunatic Kingdom"},
    "th16": {"game_number": "16", "abbreviation": "HSiFS", "jp": "天空璋", "en": "Hidden Star in Four Seasons"},
    "th165": {"game_number": "16.5", "abbreviation": "VD", "jp": "秘封ナイトメアダイアリー", "en": "Violet Detector"},
    "th17": {"game_number": "17", "abbreviation": "WBaWC", "jp": "鬼形獣", "en": "Wily Beast and Weakest Creature"},
    "th18": {"game_number": "18", "abbreviation": "UM", "jp": "虹龍洞", "en": "Unconnected Marketeers"},
    "th185": {"game_number": "18.5", "abbreviation": "100BM", "jp": "バレットフィリア達の闇市場", "en": "100th Black Market"},
    "th19": {"game_number": "19", "abbreviation": "UDoALG", "jp": "獣王園", "en": "Unfinished Dream of All Living Ghost"},
    "th20": {"game_number": "20", "abbreviation": "FW", "jp": "錦上京", "en": "Fossilized Wonders"},
}