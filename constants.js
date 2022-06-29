const names = {
	th06: ['Boss Attack Skip', 'Dialogue Pause Desync', 'Bomb Pause Desync'],
	th07: ['Merlin Glitch', 'Dialogue Pause Desync'],
	th08: ['Dialogue Pause Desync', 'Unintended Last Spell Trigger'],
	th09: ['Stage Skip'],
	th95: ['nothing so far'],
	th10: ['MarisaB 3 Power Damage', 'Corrupt replays', 'Stage 4 Desync'],
	th11: ['Negative Spell Bonus'],
	th12: ['ReimuA Bomb Desync', 'Score Display Overflow'],
	th125:['nothing so far'],
	th128:['nothing so far'],
	th13: ['Incorrect boss position during spell practice', 'Misalignment of timer'],
	th14: ['Underflow', 'Bulletless Kagerou', "Marisa's Lasers", 'Barrier Bug', 'Gohei Duplication', 'Benben Spell 2 Crash', 'Screen-flipping Effect Undo', "Item Duplication through Game's Speed"],
	th143:['nothing so far'],
	th15: ['Sagume Skip', 'Red Background', "Doremy's First Non-spell Typo", 'No items after a Survival spell-card'],
	th16: ['(Sub-)shottypes Not Functioning','Stage 5 Incorrect Spellcard name'],
	th165:['nothing so far'],
	th17: ["YoumuEagle's Damage Cap", 'Instant Hyper Deactivation', 'Death by Intentional Hyper Break'],
	th18: ["Item Duplication through Game's Speed", 'Chimata Final Timeout Crash', 'D press Desync', 'Takane Card Cost', 'Practice mode 0 bombs', 'Centipede + Wolf cards combination']
}

const citations = {
    "V1NCHhfu8B": {"game": "th10", "date": "2022-06-28", "author": "Nylilsa", "title": "small th10 stage 4 comparison", "url": "https://www.youtube.com/watch?v=0avljm0XfpA"},

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

    "ZS7nE2L10d": {"game": "th17", "date": "2019-09-26", "author": "NNN_shooter", "title": "【紲星あかり解説】 東方鬼形獣 オオワシ妖夢＆妖夢全般解説+おまけ（ショット比較）", "url": "https://www.youtube.com/watch?v=Q7CN9ZGAiHY"}
}