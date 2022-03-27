let ext = function() {
	let yt = {
		type: "lang",
		regex: /\[yt\](.*?)\[\/yt\]/g,
		replace: '<div class="fit-wrapper" data-yt="$1"><div class="fit-wrapper2 yt"><div class="video-load"><div>Automatic video loading is <b>disabled</b>, in order to reduce network usage and loading times.<br>Click this to load the video.</div></div></div></div>'
};
	let hr_major = {
		type: "lang",
		regex: /\[hr_major\]/g,
		replace: "<hr class='hr_major'>"
	}
	let hr_minor = {
		type: "lang",
		regex: /\[hr_minor\]/g,
		replace: "<hr class='hr_minor'>"
	}
	let br = {
		type: "lang",
		regex: /\[br\]/g,
		replace: "<br>"
	}
	let ts = {
		type: "lang",
		regex: /\[timestamp=(.*?)\]/g,
		replace: "<div style='float: right'>$1</div>"
	}
	let img = {
		type: "lang",
		regex: /\[img=(.*?), hratio=(.*?)\]/g,
		replace: '<div class="fit-wrapper"><div class="fit-wrapper2" style="padding-top: $2%"><img title="$1" style="cursor:pointer;" onclick="window.open(\'$1\')" src="$1"></div></div>'
	}
	let img_small = {
		type: "lang",
		regex: /\[img=(.*?)]/g,
		replace: '<img title="$1" style="cursor:pointer; margin: 5px;" onclick="window.open(\'$1\')" src="$1">'		
	}

	let jank = document.createElement("textarea");
	jank.classList.add("clipboard-jank");
	let cnt = 0;
	let code = {
		type: "lang",
		regex: /\[code\]([^]+?)\[\/code\]/g,
		replace: function(match, content) {
			let ret = "<hljs>"+highlightCode(content)+"</hljs>";
			// This is some quality jank right here, caused by the fact that I could not find a way to make hljs not escape this html
			ret = ret.replace(/&lt;instr data-tip=<span class="hljs-string">(.*?)<\/span>&gt;(.*?)&lt;\/instr&gt;/g, (match, tip, content) => {
				return `<span data-tip=${tip.replace(/&amp;/g, "&")}>${content}</span>`
			});
			ret = ret.replace(/&lt;instr&gt;(.*?)&lt;\/instr&gt;/g, (match, content) => {
				return `<span>${content}</span>`
			});
			ret = ret.replace(/\\\\/g, "\\");
			return ret;
		}
	}

	let title = {
		type: "lang",
		regex: /\[title=(.*?)\]/gim,
		replace: function(match, content) {
			setWindowTitleDirect(content);
			return "";
		}
	}

	let c = {
		type: "lang",
		regex: /\[c=(.*?)\]([^]*?)\[\/c\]/g,
		replace: "<span style='color: $1'>$2</span>"
	}

	let replaceId = 0;
	let include = {
		type: "lang",
		regex: /\[include=(.*?)\]/g,
		replace: function(match, include) {
			let id = replaceId++;
			getInclude(include, id);
			return "<div id='included-content-"+id+"'>Loading...</div>";
		}
	}

	let colors = {
		6: "#990000",
		7: "#ff8ed2",
		8: "#333399",
		9: "#058060",
		95: "#009973",
		10: "#96b300",
		11: "#adb0e6",
		12: "#4169e1",
		125: "#7d3884",
		128: "#40ffeb",
		13: "#4a808c",
		14: "#aa7777",
		143: "#b6423c",
		15: "#6a47be",
		16: "#176e0e",
		165: "#ae11d5",
		17: "#190e0e",
		18: "#1dd294"
	}

	let game = {
		type: "lang",
		regex: /\[game=([0-9]*?)\]([^]*?)\[\/game\]/g,
		replace: function(match, game, txt) {
			if (colors[game] == "#190e0e") {
				return "<span style='background-color:#bbaabb;color:"+colors[game]+"'>"+txt+"</span>";
			}
			return "<span style='color: "+colors[game]+"'>"+txt+"</span>";
		}
	}

	let rawGame = {
		type: "lang",
		regex: /%GAMECOLOR-([0-9]*?)%/g,
		replace: function(match, game) {
			return colors[game];
		}
	}

	let html = {
		type: "lang",
		regex: /\[html\]([^]*?)\[\/html\]/g,
		replace: "$1"
	}

	let script = {
		type: "lang",
		regex: /\[script\]([^]*?)\[\/script\]/g,
		replace: function(match, content) {
			const $script = document.createElement("script");
			$script.innerHTML = content;
			$scriptContent.appendChild($script);
			return "";
		}
	}

	let ins = {
		type: "lang",
		regex: /\[ins=(.*?),(.*?)\]/g,
		replace: function(match, num, game) {
			let timeline = false;
			if (game[0] == "t") {
				timeline = true;
				game = game.substring(1);
			}
			const ins = getOpcode(parseFloat(game), parseInt(num), timeline);
			if (ins == null) return "`opcode\\_error\\_"+num+"`";
			let tip = getOpcodeTip(ins, timeline);
			return "<instr data-tip=\""+tip+"\">"+getOpcodeName(ins.number, ins.documented, timeline)+"</instr>";
		}
	}
	let ins_notip = {
		type: "lang",
		regex: /\[ins_notip=(.*?),(.*?)\]/g,
		replace: function(match, num, game) {
			let timeline = false;
			if (game[0] == "t") {
				timeline = true;
				game = game.substring(1);
			}
			const ins = getOpcode(parseFloat(game), parseInt(num), timeline);
			if (ins == null) return "`opcode\\_error\\_"+num+"`";
			return "<instr>"+getOpcodeName(ins.number, ins.documented, timeline)+"</instr>";
		}
	}

	let variable = {
		type: "lang",
		regex: /\[var=(-?.*?),(.*?)\]/g,
		replace: function(match, num, game) {
			const variable = getVar(normalizeGameVersion(game), parseInt(num));
			if (variable == null) return "<instr>variable\\_error\\_"+num+"</instr>";
			let tip = getVarTip(variable);
			return "<instr data-tip=\""+tip+"\">"+getVarName(num, variable.documented) +"</instr>";
		}
	}

	let variable_notip = {
		type: "lang",
		regex: /\[var=(-?.*?),(.*?)\]/g,
		replace: function(match, num, game) {
			const variable = getVar(normalizeGameVersion(game), parseInt(num));
			if (variable == null) return "<instr>variable\\_error\\_"+num+"</instr>";
			return "<instr>"+getVarName(num, variable.documented)+"</instr>";
		}
	}

	let tip = {
		type: "lang",
		regex: /\[tip=(.*?)\]([^]*?)\[\/tip\]/g,
		replace: `<span data-tip='$1'>$2</span>`
	}

	async function requireEclmap(game, content, id) {
		// this must always wait at least some time, to make sure that the function this was called from finished running...
		await new Promise(resolve => setTimeout(resolve, 1));
		game = parseFloat(game);
		await loadEclmap(null, "?"+game, game);
		const $replace = document.querySelector(`#require-eclmap-${id}`);
		if ($replace != null) {
			$replace.innerHTML = MD.makeHtml(content);
		}
	}

	let eclmapId = 0;
	let eclmap = {
		type: "lang",
		regex: /\[requireEclmap=([0-9]+?)\]([^]*?)\[\/requireEclmap\]/g,
		replace: function(match, num, content) {
			let id = eclmapId++;
			requireEclmap(num, content, id);
			return "<div id='require-eclmap-"+id+"'>Loading eclmap...</div>";
		}
	}

	/*let eclTooltips = {
		type: "lang",
		filter: function(text) {
			return addTooltips(text);
		}
	}*/

	/*let video = {
		type: "lang",
		regex: /\[video=(.*?), hratio=(.*?)\]/g,
		replace: '<div class="fit-wrapper" data-video="$1"><div class="fit-wrapper2" style="padding-top: $2%"><div class="video-load"><div>Automatic video loading is <b>disabled</b>, in order to reduce network usage and loading times.<br>Click this to load the video.</div></div></div></div>'
	}*/

	let flex = {
		type: "lang",
		regex: /\[flex\]([^]*?)\[\/flex\]/g,
		replace: '<div class="flexbox">$1</div>'
	}

	let flex2 = {
		type: "lang",
		regex: /\[flex=(.*?)\]([^]*?)\[\/flex\]/g,
		replace: '<div class="flexbox" style="align-items: $1">$2</div>'
	}


	async function requireAnm(name, content, id) {
		// this must always wait at least some time, to make sure that the function this was called from finished running...
		await new Promise(resolve => setTimeout(resolve, 1));
		await getAnm(name);
		const $replace = document.querySelector(`#require-anm-${id}`);
		if ($replace != null) {
			$replace.innerHTML = MD.makeHtml(content);
		}
	}

	let anmId = 0;
	let currentAnm = "";
	let anmSelect = {
		type: "lang",
		regex: /\[requireAnm=(.*?)\]([^]*?)\[\/requireAnm\]/g,
		replace: function(match, name, content) {
			let id = anmId++;
			currentAnm = name;
			requireAnm(name, content, id);
			return "<div id='require-anm-"+id+"'>Loading ANM...</div>";
		}
	}

	let anm = {
		type: "lang",
		regex: /\[anm=(.*?),(.*?),(.*?)\]/g,
		replace: function(match, anm, game, id) {
			if (!anmCache[currentAnm])
				return "anm-error";
			
			return `<div data-tip="<instr>${anm}</instr> - <instr>${id}</instr>, version ${game}" style="${getAnmImg(anmCache[currentAnm][anm][game], id)}"></div>`;
		}
	}


	let yes = {
		type: "lang",
		regex: /\[yes\]([^]*?)\[\/yes\]/g,
		replace: "<span style='color:#00ff00'>$1</span>"
	}

	let unknown = {
		type: "lang",
		regex: /\[unknown\]([^]*?)\[\/unknown\]/g,
		replace: "<span style='color:#888888'>$1?</span>"
	}

	let no = {
		type: "lang",
		regex: /\[no\]([^]*?)\[\/no\]/g,
		replace: "<span style='color:#ff0000'>~~$1~~</span>"
	}

	let specs = {
		type: "lang",
		regex: /\[specs\]/g,
		replace: "Specifications"
	}

	let what = {
		type: "lang",
		regex: /\[what\]/g,
		replace: "What happens"
	}

	let how = {
		type: "lang",
		regex: /\[how\]/g,
		replace: "How it happens"
	}

	let why = {
		type: "lang",
		regex: /\[why\]/g,
		replace: "Why it happens"
	}

	let why_idk = {
		type: "lang",
		regex: /\[why_idk\]/g,
		replace: "Theory"
	}

	let links = {
		type: "lang",
		regex: /\[links\]/g,
		replace: "Links"
	}

	let patches = {
		type: "lang",
		regex: /\[patches\]/g,
		replace: "Patches"
	}

	let rpy = {
		type: "lang",
		regex: /\[rpy\]/g,
		replace: "Replays"
	}

	let vid = {
		type: "lang",
		regex: /\[vid\]/g,
		replace: "Videos"
	}

	let misc = {
		type: "lang",
		regex: /\[misc\]/g,
		replace: "Other"
	}

	let a = {
		type: "lang",
		regex: /\[a=(.*?)\]([^]*?)\[\/a\]/g,
		replace: "<a href='$1' target='_blank'>$2</a>"
	}

	let sub = {
		type: "lang",
		regex: /\[sub\]([^]*?)\[\/sub\]/g,
		replace: "<sub>$1</sub>"
	}


	
	let repeatDuplicate = {
		type: "lang",
		regex: /\[repeatDuplicate\]/g,
		replace: "This bug and/or similarities of which also appear in the following games: "
	}

	let bugUnderflow = {
		type: "lang",
		regex: /\[bugUnderflow\]/g,
		replace: "<a href='#b=bugs/ddc_bugs/&p=1'><span style='color: "+colors[14]+"'>DDC</span></a>, <span style='color: "+colors[165]+"'>VD</span>"
	}
	
	let bugTypo = {
		type: "lang",
		regex: /\[bugTypo\]/g,
		replace: "<a href='#b=bugs/ddc_bugs/&p=1'><span style='color: "+colors[14]+"'>DDC</span></a>, <span style='color: "+colors[165]+"'>VD</span>"
	}

	let bugDesync = {
		type: "lang",
		regex: /\[bugDesync\]/g,
		replace: "<a href='#b=bugs/ddc_bugs/&p=1'><span style='color: "+colors[14]+"'>DDC</span></a>, <span style='color: "+colors[165]+"'>VD</span>"
	}

	let bugDoubleMenu = {
		type: "lang",
		regex: /\[bugDoubleMenu\]/g,
		replace: "<a href='#b=bugs/ddc_bugs/&p=1'><span style='color: "+colors[14]+"'>DDC</span></a>, <span style='color: "+colors[165]+"'>VD</span>"
	}

	let bugSpritesheet = {
		type: "lang",
		regex: /\[bugSpritesheet\]/g,
		replace: "<a href='#b=bugs/ddc_bugs/&p=1'><span style='color: "+colors[14]+"'>DDC</span></a>, <span style='color: "+colors[165]+"'>VD</span>"
	}

	let bugYoumuCharge = {
		type: "lang",
		regex: /\[bugYoumuCharge\]/g,
		replace: "<a href='#b=bugs/ddc_bugs/&p=1'><span style='color: "+colors[14]+"'>DDC</span></a>, <span style='color: "+colors[165]+"'>VD</span>"
	}

	let bugSlowdown = {
		type: "lang",
		regex: /\[bugSlowdown\]/g,
		replace: "<a href='#b=bugs/ddc_bugs/&p=1'><span style='color: "+colors[14]+"'>DDC</span></a>, <span style='color: "+colors[165]+"'>VD</span>"
	}	

	let bugUninitialisedVariable = {
		type: "lang",
		regex: /\[bugUninitialisedVariable\]/g,
		replace: "<span style='color: "+colors[125]+"'>DS</span>, <a href='#b=bugs/ddc_bugs/&p=1'><span style='color: "+colors[14]+"'>DDC</span></a>, <span style='color: "+colors[165]+"'>UM</span>"
	}	
	

	return [anmSelect, eclmap, yt, hr_major, hr_minor, br, ts, img, img_small, ins, ins_notip,  variable, variable_notip, code, title, c, include, game, rawGame, html, script, tip, /*video,*/ flex, flex2, anm, yes, unknown, no, specs, what, how, why, why_idk, links, patches, rpy, vid, misc, a, sub, repeatDuplicate, bugUnderflow, bugTypo, bugDesync, bugDoubleMenu, bugSpritesheet, bugYoumuCharge, bugSlowdown, bugUninitialisedVariable];
}
