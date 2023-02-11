let ext = function() {
	let yt = {
		type: "lang",
		regex: /\[yt\](.*?)\[\/yt\]/g,
		replace: '<div class="fit-wrapper" data-yt="$1"><div class="fit-wrapper2 yt"><div class="video-load"><div></div></div></div></div>'
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
	let hr_custom = {
		type: "lang",
		regex: /\[hr_custom=(.*?)\]/g,
		replace: function(match, content) {
			return hrCustom(content);
		}
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
		regex: /\[img=(.*?), hratio=(.*?), other=(.*?)\]/g,
		replace: '<div class="fit-wrapper"><img style="padding-bottom: $2%; $3" class="fit-image" title="$1" src="$1"></div>'
	}
	let img_small = {
		type: "lang",
		regex: /\[img=(.*?)]/g,
		replace: '<img title="$1" style="cursor:pointer; margin: 5px;" onclick="window.open(\'$1\')" src="$1">'		
	}

	let code = {
		type: "lang",
		regex: /\[code\]([^]+?)\[\/code\]/g,
		replace: "<pre><code class='code language-c'>$1</code></pre>"
	}

	let title = {
		type: "lang",
		regex: /\[title=(.*?)\]/gim,
		replace: function(match, content) {
			setWindowTitleDirect(content);
			setTimeout(() => {
				hljs.highlightAll();
				const elements = document.getElementsByClassName('highlight-child');
				for (let i = 0; i < elements.length; i++) {
					elements[i].parentElement.classList.add('highlight-bg');
				}
			}, 1);
			return "";
		}
	}

	let c = {
		type: "lang",
		regex: /\[c=(.*?)\]([^]*?)\[\/c\]/g,
		replace: "<div class='$1'>$2</div>"
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

	let tip = {
		type: "lang",
		regex: /\[tip=(.*?)\]([^]*?)\[\/tip\]/g,
		replace: `<span data-tip='$1'>$2</span>`
	}

	let video = {
		type: "lang",
		regex: /\[video=(.*?), hratio=(.*?), other=(.*?)\]/g,
		replace: '<div class="fit-wrapper"><iframe class="fit-image" style="padding-bottom: $2%; $3" src="$1" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media" allowfullscreen></iframe></div>'
	}

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

	let yes = {
		type: "lang",
		regex: /\[yes\]([^]*?)\[\/yes\]/g,
		replace: "<span style='color:#14d914'>$1</span>"
	}

	let unknown = {
		type: "lang",
		regex: /\[unknown\]([^]*?)\[\/unknown\]/g,
		replace: "<span style='color:#888888'>$1?</span>"
	}

	let no = {
		type: "lang",
		regex: /\[no\]([^]*?)\[\/no\]/g,
		replace: "<span style='color:#c91010'>~~$1~~</span>"
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
		replace: "<a class='url' href='$1' target='_blank'>$2</a>"
	}

	let jumpto = {
		type: "lang",
		regex: /\[jumpto=(.*?)\]([^]*?)\[\/jumpto\]/g,
		replace: function(full, anchor, text) {
			let key = anchor.substring(1);
			key = key.match(/[^#]*$/)[0]; // no idea how I managed to make this work
			return "<a class='url-toc' href="+anchor+" onclick='jumpTo(\""+key+"\", 1)'>"+text+"</a>";
		}
	}

	let sub = {
		type: "lang",
		regex: /\[sub\]([^]*?)\[\/sub\]/g,
		replace: "<sub>$1</sub>"
	}
	
	let table = {
		type: "lang",
		regex: /\[table=(.*?)\]/gim,
		// delay must exist for at least 1ms
		replace: function(match, content) {
			setTimeout(() => {  generateTable(content)}, 1);
			return "<div id='table-shottype'></div>";
		}
	}

	let box = {
		type: "lang",
		regex: /\[box=(.*?)\]([^]*?)\[\/box\]/g,
		replace: "<div class='box' style='max-width:$1px'>$2</div>"
	}

	let hl1 = {
		type: "lang",
		regex: /\[hl1\]([^]*?)\[\/hl1\]/g,
		replace: "<div class='highlight-child'>$1</div>"
	}

	let hl2 = {
		type: "lang",
		regex: /\[hl2\]([^]*?)\[\/hl2\]/g,
		replace: "<span class='highlight-txt'>$1</span>"
	}

	let key = {
		type: "lang",
		regex: /\[key=([^]*?)\]/g,
		replace: "<code class='key'>$1</code>"
	}

	let cite = {
		type: "lang",
		regex: /\[cite=([^]*?)\]/g,
		replace: function(match, content) {
			return citeFunction(content);
		}
	}

	let replay = {
		type: "lang",
		regex: /\[replay=([^]*?)\]/g,
		replace: function(match, content) {
			return replayFunction(content);
		}
	}

	let contributors = {
		type: "lang",
		regex: /\[contributors\]/g,
		replace: function() {
			setTimeout(() => {  progressTable()}, 1);
			return contributorsFunction();
		}
	}

	let tags = {
		type: "lang",
		regex: /\[tags\]/g,
		replace: function() {
			return tagsTable();
		}
	}

	let eclmap = {
		type: "lang",
		regex: /\[eclmap=(.*?)\]([^]*?)\[\/eclmap\]/g,
		replace: function() {
			setTimeout(() => {  replaceEclIns()}, 1);
			return "potato";
		}
	}

	let canvas = {
		type: "lang",
		regex: /\[canvas\]/g,
		replace: function() {
			return loadCanvas(initRemoveHash(true));
		}
	}

	let match = {
		type: "lang",
		regex: /\[style=([^]*?), icon=(true|false), highlightedText=([^]*?)\]/g,
		replace: function(match, style, icon, highlightedText) {
            icon = (icon === 'true');
			return matchText(style, icon, highlightedText);
		}
	}

	let scenes = {
		type: "lang",
		regex: /\[scenes=([^]*?), (true|false), (\[[0-9].*\])\]/g,
		replace: function(notrelevant, game, flag, array) {
			array = array.slice(1, -1).split(",").map(Number);
			setTimeout(() => {  gameScenes(game, flag, array)}, 1);
			return "<div id='table-scenes'></div>";
		}
	}

	let check = {
		type: "lang",
		regex: /\:YES\:/g,
		replace: "<img src='/assets/green-check-mark.svg' class='icon-text'>"
	}

	let cross = {
		type: "lang",
		regex: /\:NO\:/g,
		replace: "<img src='/assets/red-cross.svg' class='icon-text'>"
	}

	return [yt, hr_major, hr_minor, hr_custom, br, ts, img, img_small, code, title, c, game, rawGame, html, script, tip, video, flex, flex2, yes, unknown, no, specs, what, how, why, why_idk, links, patches, rpy, vid, misc, a, jumpto, sub, table, box, hl1, hl2, key, cite, replay, contributors, tags, canvas, match, scenes, check, cross];
}
