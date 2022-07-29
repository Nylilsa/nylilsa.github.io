[1mdiff --git a/constants.js b/constants.js[m
[1mindex e229b06..c1da596 100644[m
[1m--- a/constants.js[m
[1m+++ b/constants.js[m
[36m@@ -63,8 +63,9 @@[m [mconst replays = {[m
 }[m
 [m
 const contributors = {[m
[31m-	"VSlamYrAwJ": {"name": "zero318", "help": "Massively helped with the Merlin glitch", "url": "https://github.com/zero318"},[m
[31m-	"1AThrt4mzz": {"name": "Helio Knight", "help": "HSiFS page 3 research", "url": "https://www.youtube.com/channel/UCNbaT2iVuYKN5q94b9UlTEA"}[m
[32m+[m	[32m"1AThrt4mzz": {"name": "Helio Knight", "help": "HSiFS page 3 research", "url": "https://www.youtube.com/channel/UCNbaT2iVuYKN5q94b9UlTEA"},[m
[32m+[m	[32m"0lDi5bpXmy": {"name": "kana0603", "help": "Provided various EoSD glitches & replays", "url": "https://twitter.com/kana_th6"},[m
[32m+[m	[32m"VSlamYrAwJ": {"name": "zero318", "help": "Massively helped with the Merlin glitch", "url": "https://github.com/zero318"}[m
 }[m
 [m
 const latestVersion = {[m
[1mdiff --git a/main.js b/main.js[m
[1mindex e17bc1d..d5aa972 100644[m
[1m--- a/main.js[m
[1m+++ b/main.js[m
[36m@@ -198,10 +198,14 @@[m [mfunction citeReplay(game, date, author, name, difficulty, shot, version, url, no[m
 }[m
 [m
 function contributorsFunction() {[m
[32m+[m	[32mlet list = [];[m
 	let i = 0;[m
 	let html = '';[m
 	for (let lambda in contributors) {[m
 		let value = Object.values(contributors)[i];[m
[32m+[m		[32mconsole.log(value);[m
[32m+[m		[32mlist.push(value);[m
[32m+[m		[32mconsole.log(list);[m
 		html += '+ <a class="url" href="'+value.url+'" target="_blank">'+value.name+'</a> - '+value.help;[m
 		html += '\n';[m
 		i++;[m
