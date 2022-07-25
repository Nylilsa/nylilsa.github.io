const names = {
	th06: ['Boss Attack Skip', 'Dialogue Pause Desync', 'Bomb Pause Desync'],
	th07: ['Merlin Glitch', 'Dialogue Pause Desync'],
	th08: ['Dialogue Pause Desync', 'Unintended Last Spell Trigger'],
	th09: ['Stage Skip'],
	th95: ['nothing so far'],
	th10: ['MarisaB 3 Power Damage', 'Corrupt replays', 'Stage 4 Desync'],
	th11: ['Negative Spell Bonus', 'ReimuA 2 Power Damage'],
	th12: ['ReimuA Bomb Desync', 'Score Display Overflow'],
	th125:['nothing so far'],
	th128:['nothing so far'],
	th13: ['Incorrect boss position during spell practice', 'Misalignment of timer'],
	th14: ['Underflow', 'Bulletless Kagerou', "Marisa's Lasers", 'Barrier Bug', 'Gohei Duplication', 'Benben Spell 2 Crash', 'Screen-flipping Effect Undo', "Item Duplication through Game's Speed", 'Timeouts on Tsukumo Sisters on Extra'],
	th143:['nothing so far'],
	th15: ['Sagume Skip', 'Red Background', "Doremy's First Non-spell Typo", 'No items after a Survival spell-card'],
	th16: ['(Sub-)shottypes Not Functioning','Stage 5 Incorrect Spellcard name', 'Stage 3 & Stage 5 crashes', 'Mai & Satono Solo Spells Issues'],
	th165:['nothing so far'],
	th17: ["YoumuEagle's Damage Cap", 'Instant Hyper Deactivation', 'Death by Intentional Hyper Break'],
	th18: ["Item Duplication through Game's Speed", 'Chimata Final Timeout Crash', 'D press Desync', 'Takane Card Cost', 'Practice mode 0 bombs', 'Centipede + Wolf cards combination']
	//th185: ['nothing so far']
}

const citations = {

	"5JhFz2rmrG": {"game": "th07", "date": "2007-04-12", "author": "simugung", "title": "Perfect Cherry Blossom, Overheat of Merlin", "url": "https://www.youtube.com/watch?v=CU2Z6VobIvc"},
    "HRlIq8klSl": {"game": "th07", "date": "2007-05-21", "author": "Leviathean", "title": "Perfect Cherry Blossom - Berserk Merlin", "url": "https://www.youtube.com/watch?v=zKfcE_dJh8Y"},
	"i1O1kChzeC": {"game": "th07", "date": "2020-12-29", "author": "ゆっきー", "title": "メルラン暴走バグ", "url": "https://www.youtube.com/watch?v=5CCtaC7BnOw"},
	"EWQEGVhayi": {"game": "th07", "date": "2022-07-10", "author": "Nylilsa", "title": "東方妖々夢～メルラン・プリズムリバー暴走バグ", "url": "https://www.youtube.com/watch?v=F4b9lnb9218"},


    "V1NCHhfu8B": {"game": "th10", "date": "2022-06-28", "author": "Nylilsa", "title": "small th10 stage 4 comparison", "url": "https://www.youtube.com/watch?v=0avljm0XfpA"},
	//"YqNJNn17o7": {"game": "th10", "date": "n.d.", "author": "ExpHP", "title": "STD instructions", "url": "https://exphp.github.io/thpages/#/std/ins?g=10"},

    "Els7ZwnHuu": {"game": "th12", "date": "n.d.", "author": "Wikipedia", "title": "Integer overflow", "url": "https://en.wikipedia.org/wiki/Integer_overflow"},

    "1TwZQlGqEN": {"game": "th14", "date": "n.d.", "author": "Wikipedia", "title": "Arithmetic Underflow", "url": "https://en.wikipedia.org/wiki/Arithmetic_underflow"},
    "tyqdbrOWJQ": {"game": "th14", "date": "2017-04-06", "author": "NNN_shooter", "title": "【TAS】TH14 DDC \"Lunatic\" SakuyaA 9,999,999,990", "url": "https://www.youtube.com/watch?v=gZgKglbe-7M"},
    "2OdweRcuyk": {"game": "th14", "date": "2017-07-28", "author": "NNN_shooter", "title": "【TAS】TH14 DDC \"Extra\" SakuyaA 9,999,999,990 No Lateral Move No Miss", "url": "https://www.youtube.com/watch?v=Oydp7bzTJrs"},
    "JGF7WX9Rou": {"game": "th14", "date": "2016-04-01", "author": "SomeGuy712x", "title": "Touhou 14 - Sakuya A, 9,999,999,990!", "url": "https://www.youtube.com/watch?v=z4meYZZLSvc"},
    "CsfBtzUZC6": {"game": "th14", "date": "2020-05-04", "author": "ack7139", "title": "[教程向] 激光折了怎么办？辉针城魔理沙rep爆炸修复与预防", "url": "https://www.bilibili.com/video/BV1vf4y1m7Ue"},
    "zh0UyZj9Z6": {"game": "th14", "date": "2020-05-04", "author": "ack7139", "title": "最简单的bug，最迷惑的效果——辉针城魔理沙激光bug初步解析", "url": "https://www.bilibili.com/read/cv5915344"},
    "8QLC9GB17N": {"game": "th14", "date": "n.d.", "author": "ack7139", "title": "thprac", "url": "https://github.com/ack7139/thprac/releases"},
    "dSOMvHmFuV": {"game": "th14", "date": "n.d.", "author": "32th System", "title": "thprac", "url": "https://github.com/touhouworldcup/thprac/releases"},
    "IiCG2n4yq1": {"game": "th14", "date": "2020-06-20", "author": "NNN_shooter", "title": "【TAS】TH14 DDC \"Lunatic\" SakuyaA No Move", "url": "https://www.youtube.com/watch?v=jrCAWSkOrc0"},
    "QOq4enyZqZ": {"game": "th14", "date": "2017-07-10", "author": "NNN_shooter", "title": "【TAS】TH14 DDC \"Extra\" ReimuA NN in 06:58.96", "url": "https://www.youtube.com/watch?v=r9DZlKJkDfo"},
    "hql00fwC48": {"game": "th14", "date": "2017-04-04", "author": "NNN_shooter", "title": "【TAS】TH14 DDC \"Lunatic\" ReimuA in 17:13.63", "url": "https://www.youtube.com/watch?v=bZfXgqf210k"},
    "RFhleEF25P": {"game": "th14", "date": "2022-06-22", "author": "Helio Knight", "title": "Baby's first DDC ReimuA Gohei dupe", "url": "https://www.youtube.com/watch?v=1qKdnwl5-OE"},
    "swrajocPpX": {"game": "th14", "date": "2017-07-01", "author": "NNN_shooter", "title": "東方輝針城speedrunで重要なお祓い棒分裂の詳細（現状判明分 + 推測）", "url": "https://nnn-shooter.hatenablog.com/entry/ar1291350"},

    "XewIFrqJCj": {"game": "th15", "date": "2022-06-25", "author": "Nylilsa", "title": "【東方紺珠伝】サグメスキップ〜霊夢と早苗", "url": "https://www.youtube.com/watch?v=u5brd2bYor4"},

	"Kjp0jGf0ml": {"game": "th16", "date": "2021-07-08", "author": "ExpHP", "title": "AnmManager and TH17 1.00b", "url": "https://gist.github.com/ExpHP/f275e0edc02603580f24a5ba3da952cc"},
	"MZa9LzonQR": {"game": "th16", "date": "2022-07-05", "author": "Nylilsa", "title": "天 クラッシュ", "url": "https://www.youtube.com/watch?v=Qxh3NDtbo8c"},
	"daGKrYh47s": {"game": "th16", "date": "2022-07-08", "author": "Helio Knight", "title": "Weird HSiFS Timer Bug", "url": "https://www.youtube.com/watch?v=2mBu4rWpP84"},

    "ZS7nE2L10d": {"game": "th17", "date": "2019-09-26", "author": "NNN_shooter", "title": "【紲星あかり解説】 東方鬼形獣 オオワシ妖夢＆妖夢全般解説+おまけ（ショット比較）", "url": "https://www.youtube.com/watch?v=Q7CN9ZGAiHY"}
}

const replays = {
	"6QslRdYpws": {"game": "th07", "date": "2020-09-13", "author": "ゆっきー", "name": "AAAAAAAA", "difficulty": "Easy", "shot": "SakuyaA", "version": "1.00b", "note": "",  "url": "https://mega.nz/file/m24HgZrL#TDgI4560scbF6s7elPRN-BydT14z4N34OrbyVGydEWg"},
	"PLv0zArCHT": {"game": "th07", "date": "2020-07-20", "author": "Plus", "name": "+", "difficulty": "Normal", "shot": "SakuyaB", "version": "1.00b", "note": "", "url": "https://mega.nz/file/e7gEDCSY#YWulV1JjBLZg9ro00y-8lwfR_n2fzyYGdmADIADhumY"},
	"26nmhATHmN": {"game": "th07", "date": "2020-09-12", "author": "Ｋ・Ｇ", "name": "KiS HaSB", "difficulty": "Hard", "shot": "SakuyaB", "version": "1.00b", "note": "", "url": "https://mega.nz/file/WvA0CIxY#XLe86njASnNSKuDDzBvXI_9snIrt9x5AifcNnrCGP1M"},
	"vSEJqDuDmA": {"game": "th07", "date": "2021-04-29", "author": "67811MKKA7", "name": "UOKIN", "difficulty": "Lunatic", "shot": "SakuyaB", "version": "1.00b", "note": "", "url": "https://mega.nz/file/HrgVlQLR#flPxml-FJlY5h7J_Kwyr60uj3u2sqGfhBQrRT4u-x44"}
}

const contributors = {
	"1AThrt4mzz": {"name": "Helio Knight", "help": "HSiFS page 3 research", "url": "https://www.youtube.com/channel/UCNbaT2iVuYKN5q94b9UlTEA"},
	"0lDi5bpXmy": {"name": "kana0603", "help": "Provided various EoSD glitches & replays", "url": "https://twitter.com/kana_th6"},
	"VSlamYrAwJ": {"name": "zero318", "help": "Massively helped with the Merlin glitch", "url": "https://github.com/zero318"}
}


const bugTracker = {
	th06: {"completed-pages": 2, "total-glitches": 15, "comment": "not likely to change unless we look at glitches in older versions"},
	th07: {"completed-pages": 2, "total-glitches": 12, "comment": "unlikely to change much unless we look at glitches in older versions"},
	th08: {"completed-pages": 1, "total-glitches": 15, "comment": "not likely to change unless we look at glitches in older versions"},
	th09: {"completed-pages": 0, "total-glitches": 9, "comment": "likely to change much"},
	th95: {"completed-pages": 0, "total-glitches": 2, "comment": "number is going to increase in the future"},
	th10: {"completed-pages": 2, "total-glitches": 17, "comment": "not likely to change"},
	th11: {"completed-pages": 1, "total-glitches": 22, "comment": "very unlikely to change much"},
	th12: {"completed-pages": 1, "total-glitches": 18, "comment": "not likely to change"},
	th125: {"completed-pages": 0, "total-glitches": 3, "comment": "number is going to increase in the future"},
	th128: {"completed-pages": 0, "total-glitches": 2, "comment": "number is going to increase in the future"},
	th13: {"completed-pages": 0, "total-glitches": 20, "comment": "not likely to change"},
	th14: {"completed-pages": 3, "total-glitches": 18, "comment": "unlikely to change much"},
	th143: {"completed-pages": 0, "total-glitches": 6, "comment": "number is going to increase in the future"},
	th15: {"completed-pages": 2, "total-glitches": 42, "comment": "probable for number to decrease slightly"},
	th16: {"completed-pages": 1, "total-glitches": 23, "comment": "unlikely to change much"},
	th165: {"completed-pages": 0, "total-glitches": 9, "comment": "number is very likely to increase"},
	th17: {"completed-pages": 2, "total-glitches": 33, "comment": "number is likely to decrease"},
	th18: {"completed-pages": 4, "total-glitches": 34, "comment": "number is very likely to increase in the future"},
}


const latestVersion = {
	th06: "1.02h",
	th07: "1.00b",
	th08: "1.00d",
	th09: "1.50a",
	th10: "1.00a",
	th11: "1.00a",
	th12: "1.00b",
	th13: "1.00c",
	th14: "1.00b",
	th15: "1.00b",
	th16: "1.00a",
	th17: "1.00b",
	th18: "1.00a",

	th95: "1.50a",
	th125: "1.00a",
	th128: "1.00a",
	th143: "1.00a",
	th165: "1.00a",
	th185: null

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
	th17: '#190E0E',
	th18: '#1DD294',
	th185: null
}