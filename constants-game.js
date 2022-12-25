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
	th185: "1.00a"
};

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
	th18: '#1DD294',
	th185: '#F58225' //color chosen randomly by me
};

class Match {
    constructor(icon, color) {
      this.icon = icon;
      this.color = color;
    }
}

const matchStyle = {
	"spring": new Match(1, '#FF9FC9'),
	"summer": new Match(1, '#50D030'),
	"autumn": new Match(1, '#FF8800'),
	"winter": new Match(1, '#465CF0'),

	"wolf": new Match('assets/th-sprites/wolf.png', '#FF4F51'),
	"otter": new Match(1, '#8DFB78'),
	"eagle": new Match(1, '#7E59D9'),
    "test": new Match(1, 2)
};