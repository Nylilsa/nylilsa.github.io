const names = {
	th06: {
        0: ['Boss Attack Skip', ['skip', 'rare', 'simul'], 4, true, 'If a non-spell is finished when the timer of the boss is at the end of 00 seconds (a frame away from timing out), the Spell Card(s) that comes afterward is/are skipped.', -999999990],
        1: ['Dialogue Pause Desync', ['desync', 'uncommon'], 3, true, 'If the game is paused during dialogue, and then unpaused by pressing Z to continue playing, any replay made of such a run will desync on the stage the dialogue unpause was performed on.', -999999990],
        2: ['Bomb Pause Desync', ['desync'], 5, true, 'If the game is paused during dialogue, and then unpaused by pressing X to continue playing, any replay made of such a run will desync on the stage the unpause was performed on. The replay uses a bomb while the live playthrough does not use a bomb.', -999999990]
    },
	th07: {
        0: ['Merlin, Lyrica & Lunasa Glitch', ['rare'], 5, true, 'On the final spell-card of the Prismriver sisters, they may behave weirdly. The bosses may stick around even after the boss-fight has ended, and Merlin may even use her attack of the penultimate spell-card during the final spell-card.', -999999990],
        1: ['Dialogue Pause Desync', ['desync', 'uncommon'], 3, true, 'If the game is paused during dialogue, and then unpaused by pressing Z to continue playing, any replay made of such a run will desync on the stage the dialogue unpause was performed on.', -999999990]
    },
	th08: {
        0: ['Dialogue Pause Desync', ['desync', 'uncommon'], 3, true, 'If the game is paused during dialogue, and then unpaused by pressing Z to continue playing, any replay made of such a run will desync on the stage the dialogue unpause was performed on.', -999999990],
        1: ['Unintended Last Spell Trigger', ['desync', 'rare'], 4, false, 'It is possible to trigger the Last Spell despite not meeting the required Time. It is possible to trigger this on all spell-cards besides on Mokou due to the Time requirement being too low. The game runs normally when the Last Spell is triggered and nothing special happens.', -999999990]
    },
	th09: {
        0: ['Stage Skip', ['skip'], 4, false, 'It is possible to skip to the subsequent stage by doing some messing around with the pause menu.', -999999990]
    },
	th95: {
        0: ['N/A', [], 1, false, 'placeholder', -999999990]
    },
	th10: {
        0: ['MarisaB 3 Power Damage', ['typo', 'shot', 'common'], 1, true, 'MarisaB deals a ton of damage when being at 3.xx power, unfocused. This can happen at any time during the game, meaning you can technically do a MarisaB LNN with this glitch and it would count.', -999999990],
        1: ['Corrupt replays', ['crash', 'common'], 1, false, 'Sometimes, one of your replays does not work. The replay would display an FPS of 0 in the bottom right, or it would seemingly crash at times.', -999999990],
        2: ['Stage 4 Desync', ['desync', 'common'], 1, true, 'Replays of full runs always desync when started from Stage 4, typically making it appear as if you failed to clear the stage. This can be prevented by starting the replay from Stage 3 or earlier.', -999999990],
        3: ['Bullet hitboxes glitch', ['common'], 1, true, 'The bullets on Kanako\'s 2nd spell-card and on Kananko\'s 4th spell-card are larger than what they are supposed to be.', -999999990],
        4: ['Stage transition Desync', ['desync'], 5, true, 'The replay desyncs when starting from the stage prior to the desync. Sometimes, it is also possible for the replay to desync even when playing the replay from the start of the stage, resulting in a replay that cannot be watched unless a third party tool is used.', -999999990]
    },
	th11: {
        0: ['Negative Spell Bonus', ['overflow'], 3, false, 'It is possible to achieve a negative spell bonus. Upon capturing the spell-card with a negative value, your score decreases.', -999999990],
        1: ['ReimuA 2 Power Damage', ['typo', 'shot'], 1, true, '2 power ReimuA deals very few damage more compared to 1p ReimuA.', -999999990],
        2: ['Mid-boss skips', ['skip'], 2, true, 'It is possible to skip the mid-bosses Rin and Sanae in Stage 6 and Extra stage respectively by using a well-timed bomb as various player characters.', -999999990],
        3: ['ReimuC Desync', ['desync', 'shot', 'uncommon'], 3, true, 'Rarely, a replay using ReimuC desyncs. This only happens in stages 2 through 6 as it is caused by the Aya speed of ReimuC.', -999999990],
        4: ['Score Desync', ['desync'], 1, true, 'Quite often, the score at the end of stages 2 through 6 may end up with a slightly different value that only varies by a couple thousand points. This desync is purely about the score and has no gameplay effect.', -999999990],
        5: ['ReimuA Desync', ['shot', 'rare', 'uninit'], 4, true, 'Rarely, a replay desyncs on Stage 4. This only happens as ReimuA, and also only on the difficulty Easy mode.', -999999990],
        6: ['Stage 6 Desync', ['desync', 'common'], 1, true, 'All full-game replays desync on Stage 6 during Utsuho.', -999999990],
        7: ['Stage transition Desync', ['desync'], 5, true, 'The replay desyncs when starting from the stage prior to the desync. Sometimes, it is also possible for the replay to desync even when playing the replay from the start of the stage, resulting in a replay that cannot be watched unless a third party tool is used.', -999999990]
    },
	th12: {
        0: ['ReimuA Bomb Desync', ['typo', 'shot', 'uncommon'], 3, false, 'The game desyncs when directly starting from stages 2-6 as ReimuA. This has to do with the bomb of ReimuA.', -999999990],
        1: ['Score Display Overflow', ['overflow', 'common'], 2, true, 'The displayed score in-game overflows and becomes its value minus 4,294,967,296. The actual score is unaffected and is displayed normally on the player data and replay screens.', -999999990],
        2: ["MarisaA's Laser Damage", ['shot'], 2, true, 'Sometimes, MarisaA deals more or less damage despite being at the same power level. This can be taken advantage of by allowing MarisaA to speedkill certain attacks.', -999999990]
    },
	th125: {
        0: ['12-6 Instant death glitch', ['uninit', 'common'], 1, true, 'On scene 12-6, you will sometimes be killed instantly despite the bullets not being near you. This happens at random, including during the replay.', -999999990]
    },
	th128: {
        0: ['N/A', [], 1, false, 'placeholder', -999999990],
    },
	th13: {
        0: ['Incorrect boss position during spell practice', [], 1, true, 'The boss\'s initial position in spell practice does not match the boss\'s position outside of spell practice mode. This affects a total of 7 different spell-cards and it affects all difficulties.', -999999990],
        1: ['Misalignment of timer', ['rare'], 4, false, 'Sometimes, the timer is misaligned. The second digit of the timer becomes misaligned. The timer functions as normal. The timer fixes itself once the current attack has ended.', -999999990]
    },
	th14: {
        0: ['Score Underflow', ['overflow'], 3, true, 'The game sets your score to a score of 9,999,999,990. This can happen in all gamemodes, but it is easily done the easiest on spell practice mode.', -999999990],
        1: ['Bulletless Kagerou', ['cap'], 5, false, 'Kagerou stops shooting bullets on her second spell, third non-spell and third spell. This effect does not take place in the other stages.', -999999990],
        2: ["Marisa's Lasers", ['uninit', 'shot', 'rare'], 3, true, 'Marisa\'s laser(s) bugs out. It may burnout, it may be set at a 45° angle, it may undergo quantum tunneling and kill and enemy the opposite side of the screen. This event happens at random, meaning your replay may be desynced because of this bug.', -999999990],
        3: ['Barrier Bug', ['shot', 'simul'], 4, false, 'The player can take no damage from bullets, lasers and enemies, allowing for invincibility when SakuyaA\'s barrier is active.', -999999990],
        4: ['Gohei Duplication', ['shot'], 3, false, 'ReimuA can have multiple goheis on screen. All goheis are able to deal damage. Because of this, it is possible to speedkill by using multiple goheis.', -999999990],
        5: ['Benben Spell 2 Crash', ['crash', 'old'], 1, false, 'Benben Tsukumo\'s second spell crashes the game upon finishing the spell.', -999999990],
        6: ['Screen-flipping Effect Undo', ['old'], 4, false, 'The screen effects of Seija can be reversed.', -999999990],
        7: ["Item Duplication through Game's Speed" , ['dupe', 'uncommon'], 4, true, 'It is possible to duplicate certain items by dying during slowdown.', -999999990],
        8: ['Timeouts on Tsukumo Sisters on Extra', [], 4, false, 'Timing out certain attacks of the Tsukumo sisters on Extra mode sometimes do not end when the timer hits 0.00s.', -999999990]
    },
	th143: {
        0: ['Score Underflow', ['overflow'], 3, true, 'The game sets your score to a score of 9,999,999,990. This can only happen in scenes in which a spell-card is used, which are almost all scenes.', -999999990]
    },
	th15: {
        0: ['Sagume Skip', ['skip'], 5, true, 'Upon successfully replicating the Sagume Skip, her fight ends immediately and you are brought to her post-boss dialogue. The game runs normally after skipping Sagume. Replays are compatible. This skip is done by doing a precise and well-timed bomb.', -999999990],
        1: ['Red Background', ['shot', 'old'], 2, false, 'The background slowly turns completely red. Spell backgrounds are affected too but they do not become entirely red.', -999999990],
        2: ["Doremy's First Non-spell Typo", ['typo'], 1, true, 'The uneven wave of Doremy\'s first non-spell spins faster than intended. The pattern looks very different compared to Doremy\'s other attacks. This only affects Lunatic.', -999999990],
        3: ['Hecatia opener 50% shootdown', [], 1, false, 'When you capture Hecatia\'s first non-spell, the shooting bonus is always 50%.', -999999990],
        4: ['Reisen Desync', ['shot', 'desync', 'rare'], 4, true, 'Very rarely, when starting a replay from either Stage 3, Stage 4, Stage 5 or Stage 6, the replay desyncs. This only happens with Reisen.', -999999990]
    },
	th16: {
        0: ['(Sub-)shottypes Not Functioning', ['shot', 'uncommon'], 4, false, 'Occasionally, the player\'s (sub-)shottype does not work in which case some bullets are not shot.', -999999990],
        1: ['Stage 5 Incorrect Spellcard name', ['rare'], 4, true, 'The wrong spell card name can be displayed on the third spell. The following would be displayed: 狗符「山狗の散歩」(meaning Hound Sign "Mountain Hound\'s Walk"), instead of 舞符「ビハインドフェスティバル」(meaning Dance Sign "Behind Festival")', -999999990],
        2: ['Stage 3 & Stage 5 crashes', ['crash', 'rare'], 4, false, 'It is possible for the game to crash mid-run. This crash is only known to happen in two places of the game: in Stage 3 and in Stage 5.', -999999990],
        3: ['Mai & Satono Solo Spells Issues', ['common'], 3, false, 'Both Mai and Satono\'s 2nd solo spells, Star Festival and Behind You, have issues with their timers. ', -999999990],
        4: ["Okina's Survival Hurtbox", ['common'], 1, true, 'Okina gains a hurtbox during her survival spell-card. With her hurtbox active the player can shoot her and end the spell-card prematurely.', -999999990],
        5: ["Okina's Final Bomb/Release Damage", ['rare'], 3, true, 'Okina gains a hurtbox during her final spell-card during a bomb or release. This can usually not happen, because Okina is supposed to be immune to bombs and releases.', -999999990]
    },
	th165: {
        0: ['N/A', [], 1, false, 'placeholder', -999999990]
    },
	th17: {
        0: ["YoumuEagle's Damage Cap", ['typo', 'shot', 'common'], 1, true, 'YoumuEagle deals less damage compared to YoumuWolf and YoumuOtter. This is especially noticeable when comparing the slashes between various Youmus. This has to do with the damage cap.', -999999990],
        1: ['Instant Hyper Deactivation', ['simul', 'rare'], 4, true, 'It is possible to instantly deactivate a hyper after picking up the 5th token, giving the player 2 or 5 tokens after the text "Extra Beast Appeared!" shows up. This can happen with any sort of hyper.', -999999990],
        2: ['Death by Intentional Hyper Break', ['simul', 'uncommon'], 2, true, 'The player instantly dies whilst breaking their hyper. It is not possible to escape the death through death-bombing.', -999999990],
        3: ['Token duplication', ['dupe'], 2, true, 'Every mid-boss in WBaWC can drop a special token. When timing down a hyper that has one or more special tokens in it, then the player is rewarded with 5 tokens.', -999999990],
        4: ['Token Desync - Stage Transition Edition', ['desync', 'rare'], 3, true, 'When starting a replay from Stage 2 through Stage 6, it is possible for the replay to desync at the start of the stage. When starting from Stage 2 through Stage 6, it is possible that the replay starts off with no tokens being spawned. When letting the replay being played from the stage prior, it can be seen that there are tokens that spawn.', -999999990],
        5: ['Desync - Roaring Mode Edition', ['desync', 'common'], 2, true, 'When watching a replay, the replay may start off with extra tokens and/or extra items spawning. The replay is then guaranteed to desynchronise.', -999999990],
        6: ['Desync - Random Token Edition', ['desync', 'uncommon'], 4, true, 'When watching a replay from Stage 2 through Stage 6, the replay may desynchronise in the middle of the stage. This usually happens when having timed out a hyper in which the game gives the player different tokens, but rarely can it happen slightly differently.', -999999990],
        7: ["Saki's Survival Hurtbox", ['common'], 1, true, 'Saki gains a hurtbox during her survival spell-card. With her hurtbox active the player can shoot her and end the spell-card prematurely.', -999999990],
        8: ["Saki's Final Bomb Damage", ['rare'], 3, true, 'Saki gains a hurtbox during her final spell-card during a bomb. This can usually not happen, because Extra bosses are supposed to be immune to bombs.', -999999990]
    },
	th18: {
        0: ['Slowdown Item Duplication', ['dupe'], 3, true, 'It is possible to duplicate certain items by dying during slowdown.', -999999990],
        1: ['Chimata Final Timeout Crash', ['crash', 'uninit'], 2, false, 'The game crashes when timing out Chimata\'s final spell-card on spell-practice mode.', -999999990],
        2: ['D press Desync', ['desync', 'uncommon'], 2, true, 'In the stage the replay desyncs in the player starts off with the wrong card. This has to do with the D press during the stage transition.', -999999990],
        3: ['Takane Card Cost', ['simul'], 1, true, 'The Takane card halves the prices of all cards when equipped. The shop says the Takane card costs 80 gold. However, when buying the card, it only costs you 40 gold.', -999999990],
        4: ['Practice mode 0 bombs', ['common'], 1, false, 'Entering Practice mode you may see that your player has no bombs.', -999999990],
        5: ['Centipede + Wolf cards combination', ['simul'], 2, true, 'When equipping the Centipede and the Wolf card at the same time, the effect from the Centipede card is replaced by the effect of the Wolf card.', -999999990],
        6: ['Lily White Crash', ['crash'], 4, false, 'It is possible to cause a game crash by using the Lily White card.', -999999990],
        7: ["Dragon Eater's Cataclysm", ['overflow'], 2, true, 'Momoyo\'s 8th spell-card can freak out and spawn seemingly an infinite number of bullets.', -999999990],
        8: ["Momoyo's Final Bomb Damage", ['rare'], 3, true, 'Momoyo gains a hurtbox during her final spell-card during a bomb. This can usually not happen, because Extra bosses are supposed to be immune to bombs.', -999999990]
    },
	th185: {
        0: ['N/A', [], 1, false, 'placeholder', -999999990]
    }
};

const rarity = {
    1: {"full": "Rarity 1", "description": "Giving the game to a random player, the glitch is almost always encountered"},
    2: {"full": "Rarity 2", "description": "Giving the game to a random player, the glitch is encountered often"},
    3: {"full": "Rarity 3", "description": "Giving the game to a random player, the glitch is encountered sometimes."},
    4: {"full": "Rarity 4", "description": "Giving the game to a random player, the glitch is encountered rarely."},
    5: {"full": "Rarity 5", "description": "Giving the game to a random player, the glitch is almost never encountered."}
};

const tags = {
    "r1": {"full": "Rarity 1", "description": "Giving the game to a random player, the glitch is almost always encountered"},
    "r2": {"full": "Rarity 2", "description": "Giving the game to a random player, the glitch is encountered often"},
    "r3": {"full": "Rarity 3", "description": "Giving the game to a random player, the glitch is encountered sometimes."},
    "r4": {"full": "Rarity 4", "description": "Giving the game to a random player, the glitch is encountered rarely."},
    "r5": {"full": "Rarity 5", "description": "Giving the game to a random player, the glitch is almost never encountered."},

    "cap": {"full": "Cap", "description": "Glitch where an upper limit causes unintentional side effects."},
    "crash": {"full": "Crash", "description": "A sudden failure causing the game to close unexpectedly."},
    "desync": {"full": "Desync", "description": "Game desyncs during replay."},
    "dupe": {"full": "Duplication", "description": "Glitch where objects are duplicated."},
    "old": {"full": "Old", "description": "Glitch is only in previous version(s) of the game."},
    "overflow": {"full": "Overflow", "description": "Glitch where a value is overflowed."},
    "shot": {"full": "Shottype", "description": "Glitch is specific to the shottype."},
    "simul": {"full": "Simultaneous", "description": "Glitch caused by two or more events happening simultaneously."},
    "skip": {"full": "Skips", "description": "Glitch where attacks or sections are skipped."},
    "typo": {"full": "Typo", "description": "Glitch exists because ZUN made a typo."},
    "uninit": {"full": "Uninitialised variable", "description": "Glitch caused by the usage of uninitialised variables."}
};

const citations = {

	"5JhFz2rmrG": {"game": "th07", "date": "2007-04-12", "author": "simugung", "title": "Perfect Cherry Blossom, Overheat of Merlin", "url": "https://www.youtube.com/watch?v=CU2Z6VobIvc"},
	"HRlIq8klSl": {"game": "th07", "date": "2007-05-21", "author": "Leviathean", "title": "Perfect Cherry Blossom - Berserk Merlin", "url": "https://www.youtube.com/watch?v=zKfcE_dJh8Y"},
	"i1O1kChzeC": {"game": "th07", "date": "2020-12-29", "author": "ゆっきー", "title": "メルラン暴走バグ", "url": "https://www.youtube.com/watch?v=5CCtaC7BnOw"},
	"EWQEGVhayi": {"game": "th07", "date": "2022-07-10", "author": "Nylilsa", "title": "東方妖々夢～メルラン・プリズムリバー暴走バグ", "url": "https://www.youtube.com/watch?v=F4b9lnb9218"},
	"ENDSVfmrh8": {"game": "th07", "date": "2022-07-13", "author": "inakilbss", "title": "Perfect Cherry Blossom — Merlin Glitch + Prismrivers LNN (SakuyaA)", "url": "https://www.youtube.com/watch?v=aMRkmKmocsQ"},
	"Na19l8CMf4": {"game": "th07", "date": "2022-08-31", "author": "Nylilsa", "title": "東方妖々夢～リリカ・プリズムリバー暴走バグ", "url": "https://www.youtube.com/watch?v=tufvQ1fR3Y0"},
	"cLNCEmYPwZ": {"game": "th07", "date": "2022-08-31", "author": "Nylilsa", "title": "東方妖々夢～ルナサ・プリズムリバー暴走バグ", "url": "https://www.youtube.com/watch?v=q1-qCmcfB5A"},

	"lED2ol41Co": {"game": "th10", "date": "2013-09-14", "author": "a26866152", "title": "【TAS】東方風神録Lunatic バグマリ in 13:39.25", "url": "https://www.youtube.com/watch?v=efqy8GBUNL0"},
	"vR1jF7QiOO": {"game": "th10", "date": "2022-08-15", "author": "Nylilsa", "title": "東方風神録 〜 Lunatic 13分54秒 魔理沙/B", "url": "https://www.youtube.com/watch?v=0ETirf_ywHY"},
	"2KQJ4ddgTf": {"game": "th10", "date": "2022-05-28", "author": "Nylilsa", "title": "東方風神録 〜 Extra 6分25秒 魔理沙/B", "url": "https://www.youtube.com/watch?v=RxkHkDJvwXg"},
	"V1NCHhfu8B": {"game": "th10", "date": "2022-06-28", "author": "Nylilsa", "title": "small th10 stage 4 comparison", "url": "https://www.youtube.com/watch?v=0avljm0XfpA"},
	//"YqNJNn17o7": {"game": "th10", "date": "n.d.", "author": "ExpHP", "title": "STD instructions", "url": "https://exphp.github.io/thpages/#/std/ins?g=10"},

	"9qHKECH5FT": {"game": "th11", "date": "2008-08-22", "author": "sesamebagels", "title": "東方地霊殿 - Subterranean Animism 魔理沙+パチュリ bug", "url": "https://www.youtube.com/watch?v=2JvH6A4lGvg"},
	"r5TbjJYm6x": {"game": "th11", "date": "2010-04-22", "author": "George Gaumond", "title": "Touhou 11 Subterranean Animism bug: out of my way cat!", "url": "https://www.youtube.com/watch?v=ANspUlv_odk"},
	"1ILtinP3Fc": {"game": "th11", "date": "2022-09-04", "author": "Nylilsa", "title": "東方地霊殿～霊夢Cリプレイバグ", "url": "https://www.youtube.com/watch?v=k_WorD5Zs4o"},
	"csXlNTKmMn": {"game": "th11", "date": "2022-09-08", "author": "Nylilsa", "title": "東方地霊殿～霊夢Aリプレイバグ", "url": "https://www.youtube.com/watch?v=e9yNY1ZXTRk"},
	
	"obKhAnjBF9": {"game": "th12", "date": "2014-08-27", "author": "thplayer635", "title": "UFO Bomb Glitch ~ [Secret Scoring Knowledge]", "url": "https://www.youtube.com/watch?v=S7fX9z4rH0o"},
	"ZAaA2rM7qL": {"game": "th12", "date": "2021-03-07", "author": "ZPS", "title": "Touhou 12: Undefined Fantastic Object - Lunatic 2,195,168,090 (Scorebug) - Sanae B", "url": "https://www.youtube.com/watch?v=foWVBHsoZQU"},
	"m8F7Rxv1Ps": {"game": "th12", "date": "2022-02-21", "author": "ZPS", "title": "Touhou 12: Undefined Fantastic Object - Lunatic - 2,610,822,850 points - Sanae B - Clear", "url": "https://www.youtube.com/watch?v=LvwZCva0cOA"},
	"mhmz8e7Gue": {"game": "th12", "date": "2021-12-29", "author": "LorenzOwO", "title": "Touhou 星蓮船～UFO Lunatic SanaeB 2,676,870,230 (C)", "url": "https://www.youtube.com/watch?v=4gl4J2BoSa4"},
	"NeiE0ZVjXe": {"game": "th12", "date": "2014-09-07", "author": "kopiapoa", "title": "[TAS] TH12 - Undefined Fantastic Object \"Lunatic\" MarisaA 6,624,561,400", "url": "https://www.youtube.com/watch?v=uok1X0LjqjU"},
	"Els7ZwnHuu": {"game": "th12", "date": "n.d.", "author": "Wikipedia", "title": "Integer overflow", "url": "https://en.wikipedia.org/wiki/Integer_overflow"},
	"1bBWvqDT6t": {"game": "th12", "date": "2019-07-25", "author": "ZPS", "title": "UFO Marisa A Glitchless vs. Glitched Damage Comparison", "url": "https://www.youtube.com/watch?v=jP0mj3k1P24"},
	
	"2r2sb5fl1o": {"game": "th125", "date": "2010-03-17", "author": "Vexe1", "title": "Touhou 12.5 ~ Double Spoiler, Stage 12-6 GLITCH", "url": "https://www.youtube.com/watch?v=3KlN0x4I4HM"},
	"WowBsLKIF9": {"game": "th125", "date": "2019-06-08", "author": "ide\\_an", "title": "hanakopatch", "url": "https://bitbucket.org/ide\_an/hanakopatch/src/master/"},
	
	"1TwZQlGqEN": {"game": "th14", "date": "n.d.", "author": "Wikipedia", "title": "Integer overflow", "url": "https://en.wikipedia.org/wiki/Integer_overflow"},
	"tyqdbrOWJQ": {"game": "th14", "date": "2017-04-06", "author": "NNN_shooter", "title": "【TAS】TH14 DDC \"Lunatic\" SakuyaA 9,999,999,990", "url": "https://www.youtube.com/watch?v=gZgKglbe-7M"},
	"2OdweRcuyk": {"game": "th14", "date": "2017-07-28", "author": "NNN_shooter", "title": "【TAS】TH14 DDC \"Extra\" SakuyaA 9,999,999,990 No Lateral Move No Miss", "url": "https://www.youtube.com/watch?v=Oydp7bzTJrs"},
	"JGF7WX9Rou": {"game": "th14", "date": "2016-04-01", "author": "SomeGuy712x", "title": "Touhou 14 - Sakuya A, 9,999,999,990!", "url": "https://www.youtube.com/watch?v=z4meYZZLSvc"},
	"0Fc7nbbZRr": {"game": "th14", "date": "2021-05-19", "author": "Crispy", "title": "Touhou 14: Double Dealing Character - Underflow Bug 9,999,999,990", "url": "https://www.youtube.com/watch?v=Ji5P6nQ0zpA"},
	"7YCGPMtmPO": {"game": "th14", "date": "2016-03-15", "author": "thplayer635", "title": "scoring with sekibanki! [rollover counterstop]", "url": "https://www.youtube.com/watch?v=Pp7h7qPK-t0"},
	"CsfBtzUZC6": {"game": "th14", "date": "2020-05-04", "author": "ack7139", "title": "[教程向] 激光折了怎么办？辉针城魔理沙rep爆炸修复与预防", "url": "https://www.bilibili.com/video/BV1vf4y1m7Ue"},
	"zh0UyZj9Z6": {"game": "th14", "date": "2020-05-04", "author": "ack7139", "title": "最简单的bug，最迷惑的效果——辉针城魔理沙激光bug初步解析", "url": "https://www.bilibili.com/read/cv5915344"},
	"8QLC9GB17N": {"game": "th14", "date": "n.d.", "author": "ack7139", "title": "thprac", "url": "https://github.com/ack7139/thprac/releases"},
	"dSOMvHmFuV": {"game": "th14", "date": "n.d.", "author": "32th System", "title": "thprac", "url": "https://github.com/touhouworldcup/thprac/releases"},
	"IiCG2n4yq1": {"game": "th14", "date": "2020-06-20", "author": "NNN_shooter", "title": "【TAS】TH14 DDC \"Lunatic\" SakuyaA No Move", "url": "https://www.youtube.com/watch?v=jrCAWSkOrc0"},
	"QOq4enyZqZ": {"game": "th14", "date": "2017-07-10", "author": "NNN_shooter", "title": "【TAS】TH14 DDC \"Extra\" ReimuA NN in 06:58.96", "url": "https://www.youtube.com/watch?v=r9DZlKJkDfo"},
	"hql00fwC48": {"game": "th14", "date": "2017-04-04", "author": "NNN_shooter", "title": "【TAS】TH14 DDC \"Lunatic\" ReimuA in 17:13.63", "url": "https://www.youtube.com/watch?v=bZfXgqf210k"},
	"RFhleEF25P": {"game": "th14", "date": "2022-06-22", "author": "Helio Knight", "title": "Baby's first DDC ReimuA Gohei dupe", "url": "https://www.youtube.com/watch?v=1qKdnwl5-OE"},
	"swrajocPpX": {"game": "th14", "date": "2017-07-01", "author": "NNN_shooter", "title": "東方輝針城speedrunで重要なお祓い棒分裂の詳細（現状判明分 + 推測）", "url": "https://nnn-shooter.hatenablog.com/entry/ar1291350"},
	
	"a2p3Jtvow4": {"game": "th143", "date": "2016-05-21", "author": "thplayer635", "title": "scoring with sekibanki 2 [secret ISC scoring strat]", "url": "https://www.youtube.com/watch?v=-BScbpVxKLg"},

	"XewIFrqJCj": {"game": "th15", "date": "2022-06-25", "author": "Nylilsa", "title": "【東方紺珠伝】サグメスキップ〜霊夢と早苗", "url": "https://www.youtube.com/watch?v=u5brd2bYor4"},
	"9MaLyBEpwP": {"game": "th15", "date": "2017-06-27", "author": "fon", "title": "Touhou 15 - Legacy Mode (Lunatic) Speedrun in 23:48", "url": "https://www.youtube.com/watch?v=cCxeK1-i_nU&t=772s"},
	"SmbgA43aBj": {"game": "th15", "date": "2018-08-14", "author": "NNN_shooter", "title": "【TAS】TH15 LoLK \"Lunatic\" Sanae in 22:33.41【New Record】", "url": "https://www.youtube.com/watch?v=uf3Bj5Hrucg&t=742s"},
	"yceEQkZhex": {"game": "th15", "date": "2022-09-04", "author": "Nylilsa", "title": "東方紺珠伝～鈴仙リプレイバグ", "url": "https://www.youtube.com/watch?v=T-HlzAVw8-o"},

	"Kjp0jGf0ml": {"game": "th16", "date": "2021-07-08", "author": "ExpHP", "title": "AnmManager and TH17 1.00b", "url": "https://gist.github.com/ExpHP/f275e0edc02603580f24a5ba3da952cc"},
	"MZa9LzonQR": {"game": "th16", "date": "2022-07-05", "author": "Nylilsa", "title": "天 クラッシュ", "url": "https://www.youtube.com/watch?v=Qxh3NDtbo8c"},
	"daGKrYh47s": {"game": "th16", "date": "2022-07-08", "author": "Helio Knight", "title": "Weird HSiFS Timer Bug", "url": "https://www.youtube.com/watch?v=2mBu4rWpP84"},
	"HMaFJDVRYi": {"game": "th16", "date": "2017-09-06", "author": "3rareProject", "title": "東方天空璋　５面　スペルカード集　normal 　※バグシーン（敵消失）あり", "url": "https://www.youtube.com/watch?v=oHuGs4Um_ZE"},
	"lNMCKb4ARr": {"game": "th16", "date": "2019-05-25", "author": "F", "title": "【東方天空璋】爾子田里乃消失バグ！？", "url": "https://www.youtube.com/watch?v=Oj4_zPNCQ2c"},
	"yyf9Q3J4MF": {"game": "th16", "date": "2017-08-14", "author": "AlternateDimensions", "title": "Touhou 16 : Hidden Star in Four Seasons (HSiFS) - Mai and Satono Spell Practice Glitch", "url": "https://www.youtube.com/watch?v=8Dzxwj2nd8Y"},

	"ZS7nE2L10d": {"game": "th17", "date": "2019-09-26", "author": "NNN_shooter", "title": "【紲星あかり解説】 東方鬼形獣 オオワシ妖夢＆妖夢全般解説+おまけ（ショット比較）", "url": "https://www.youtube.com/watch?v=Q7CN9ZGAiHY"},
	"7tWc2Qfu90": {"game": "th17", "date": "2020-10-17", "author": "32th System", "title": "What is the dupe that the th17 scorerunners talk about?", "url": "https://www.youtube.com/watch?v=RsucrXjPD_8"},
	"Jwhtg37pHy": {"game": "th17", "date": "2021-03-21", "author": "Borealis", "title": "Touhou 17: Wily Beast and Weakest Creature - 11,982,030,340 (WR) Lunatic MarisaOtter Scorerun", "url": "https://www.youtube.com/watch?v=ydYqFBM_k7g&t=102s"},
	"qFHCsyy1AU": {"game": "th17", "date": "2021-11-25", "author": "RebotOva", "title": "Touhou 17 Wily Beast and Weakest Creature Scoring MarisaO 10.406.267.290 (Counterstop)",  "url": "https://www.youtube.com/watch?v=fG75_mNE5Nk&t=589s"},
	"KLamMCsoO9": {"game": "th17", "date": "2020-10-10", "author": "32th System", "title": "Why do Touhou 17 replay desync?",  "url": "https://www.youtube.com/watch?v=-FZY6jpmAsE"},
	"tkOd4IHAos": {"game": "th17", "date": "2022-09-04", "author": "Nylilsa", "title": "東方鬼形獣～リプレイバグ",  "url": "https://www.youtube.com/watch?v=-FXzOT3_trg"},

	"L4WwIST4qA": {"game": "th17", "date": "2022-06-07", "author": "Nylilsa", "title": "東方鬼形獣 〜 Extra 5分29秒 妖夢/カワウソ",  "url": "https://www.youtube.com/watch?v=spnH2stUsVw&t=288s"},
	"nR5vbyfi91": {"game": "th17", "date": "2022-06-07", "author": "Nylilsa", "title": "東方鬼形獣 〜 Extra 5分29秒 妖夢/カワウソ",  "url": "https://www.youtube.com/watch?v=spnH2stUsVw&t=302s"}
};

const replays = {

	"VPemRVi0Bq": {"game": "th06", "date": "2021-10-09", "author": "kana0603", "name": "kana0603", "difficulty": "Lunatic", "shot": "ReimuA", "version": "1.02h", "note": "Meiling's 4th spell-card skip",  "url": "https://mega.nz/file/DvJRzRLa#PbhRb99Y_cLpJ_7t496GKY_yYNcb3Jvqgr3vkmS2o60"},
	"XuaDwGpKzv": {"game": "th06", "date": "2018-05-24", "author": "kana0603", "name": "2noncncl", "difficulty": "Lunatic", "shot": "MarisaB", "version": "1.02h", "note": "Patchouli's 2nd spell-card skip",  "url": "https://mega.nz/file/PnAFBKTC#chp1zj2323Lh_POuyOyDSG1tB6uYynjtDVLl_Dw3xe4"},
	"3HBhLzC6YM": {"game": "th06", "date": "2021-03-18", "author": "kana0603", "name": "kana0603", "difficulty": "Lunatic", "shot": "ReimuB", "version": "1.02h", "note": "Rumia's 1st spell-card skip",  "url": "https://mega.nz/file/Hv5VQbzD#Yj-GXvLw3IfXAYBmF0jMOx6GWRQm6624Ge4uy4lzq80"},
	"ZLo1eqDg26": {"game": "th06", "date": "2020-03-27", "author": "kana0603", "name": "s3", "difficulty": "Lunatic", "shot": "ReimuB", "version": "1.02h", "note": "Meiling's 1st spell-card skip",  "url": "https://mega.nz/file/jqpBjSqB#m7Gi4mlIgMVmSUgmnUd737aiq-K7BWl9GZzf9iPeWuY"},
	"uPN0pnRh19": {"game": "th06", "date": "2021-03-17", "author": "kana0603", "name": "kana0603", "difficulty": "Lunatic", "shot": "ReimuB", "version": "1.02h", "note": "Patchouli's 2nd spell-card skip",  "url": "https://mega.nz/file/n6QFEJjI#9WaUHVwO9zLhEnQNXEYrAaMYoFLfkZDdaWVo2aZlIww"},
	"9CI4n4gGg9": {"game": "th06", "date": "2021-03-16", "author": "kana0603", "name": "kana0603", "difficulty": "Lunatic", "shot": "ReimuB", "version": "1.02h", "note": "Rumia's 1st spell-card skip",  "url": "https://mega.nz/file/fnYT1YyQ#pe1zi0knyvclUSqIf_nf8C8_Yk77vZC9Z9I3ylQEAV0"},
	"nNFGaBA32Y": {"game": "th06", "date": "2021-10-11", "author": "kana0603", "name": "kana0603", "difficulty": "Lunatic", "shot": "ReimuA", "version": "1.02h", "note": "Rumia's 1st spell-card skip",  "url": "https://mega.nz/file/m6wyyaoa#xTDZ0WUC8cvWBUSRyW3735ZSIEqbgigxUBcsJKdMeo8"},
	"hsyPP2YX5g": {"game": "th06", "date": "2022-09-15", "author": "kana0603", "name": "skip", "difficulty": "Lunatic", "shot": "ReimuB", "version": "1.02h", "note": "Meiling's 1st spell-card skip",  "url": "https://mega.nz/file/O3I0HJoL#RA-nWVvtKpyiO32BCWLXeOypKolVDj-tqmYCo55wlJ4"},

	"6QslRdYpws": {"game": "th07", "date": "2020-09-13", "author": "ゆっきー", "name": "AAAAAAAA", "difficulty": "Easy", "shot": "SakuyaA", "version": "1.00b", "note": "Merlin final spell-card glitch - chance is 1/1720",  "url": "https://mega.nz/file/m24HgZrL#TDgI4560scbF6s7elPRN-BydT14z4N34OrbyVGydEWg"},
	"PLv0zArCHT": {"game": "th07", "date": "2020-07-20", "author": "Plus", "name": "+", "difficulty": "Normal", "shot": "SakuyaB", "version": "1.00b", "note": "Merlin post-boss glitch - chance is 1/49", "url": "https://mega.nz/file/e7gEDCSY#YWulV1JjBLZg9ro00y-8lwfR_n2fzyYGdmADIADhumY"},
	"26nmhATHmN": {"game": "th07", "date": "2020-09-12", "author": "Ｋ・Ｇ", "name": "KiS HaSB", "difficulty": "Hard", "shot": "SakuyaB", "version": "1.00b", "note": "Merlin post-boss glitch - chance is 1/476", "url": "https://mega.nz/file/WvA0CIxY#XLe86njASnNSKuDDzBvXI_9snIrt9x5AifcNnrCGP1M"},
	"vSEJqDuDmA": {"game": "th07", "date": "2021-04-29", "author": "67811MKKA7", "name": "UOKIN", "difficulty": "Lunatic", "shot": "SakuyaB", "version": "1.00b", "note": "Merlin final spell-card glitch - chance is 1/854", "url": "https://mega.nz/file/HrgVlQLR#flPxml-FJlY5h7J_Kwyr60uj3u2sqGfhBQrRT4u-x44"},
	"g3TRR5bGdv": {"game": "th07", "date": "2022-08-31", "author": "Nylilsa", "name": "Nylilsa", "difficulty": "Lunatic", "shot": "MarisaB", "version": "1.00b", "note": "Lyrica post-boss glitch - chance is 1/60314", "url": "https://mega.nz/file/O2oF2C6J#Atn8nDFNdVIhkfGht_lQ5mbE8t60We79tn7Hv84wgVw"},
	"0m17ZCJ0ef": {"game": "th07", "date": "2022-08-31", "author": "Nylilsa", "name": "Nylilsa", "difficulty": "Lunatic", "shot": "ReimuB", "version": "1.00b", "note": "Lunasa post-boss glitch - chance is 1/40428", "url": "https://mega.nz/file/OzIVmAAZ#ko9pV5cgT4furnv0sD6eAVljbct_wdVq-ck67UH8b1Q"},
	
	"mawUVYi8SZ": {"game": "th10", "date": "2022-09-17", "author": "Nylilsa", "name": "Nylilsa", "difficulty": "Lunatic", "shot": "ReimuB", "version": "1.00a", "note": "All stages are affected", "url": "https://mega.nz/file/775FGLzA#CFgOJhRwKJi_wQ-Z9GTe7Dg2Sn0SoVO4PJ4wRFjyjdc"},
	
	"g0dRW3SG14": {"game": "th11", "date": "2022-09-13", "author": "Nylilsa", "name": "Nylilsa", "difficulty": "Lunatic", "shot": "MarisaB", "version": "1.00a", "note": "", "url": "https://mega.nz/file/2vJHjLib#EYkITCt_QX7exKZ4GK2PI87Q-KaJBzhDCzj9LxaWJEc"},
	"8yxQ1EpFJI": {"game": "th11", "date": "2022-09-04", "author": "Nylilsa", "name": "Nylilsa", "difficulty": "Lunatic", "shot": "MarisaA", "version": "1.00a", "note": "", "url": "https://mega.nz/file/mvAjVQBJ#dn_HYue8EQ-3Sww1VIROjBXYn_gGHpyxkRaU04IClyI"},
	"0M0iBCNjkv": {"game": "th11", "date": "2022-09-04", "author": "Nylilsa", "name": "Nylilsa", "difficulty": "Lunatic", "shot": "ReimuC", "version": "1.00a", "note": "", "url": "https://mega.nz/file/DiA0gb6Q#9cW9C6w5rd2qDIAuJ8n1ZzfwT5bH2GXzNYtZAgK3IUs"},
	"oeFZ1BABul": {"game": "th11", "date": "2022-09-10", "author": "Nylilsa", "name": "Nylilsa", "difficulty": "Lunatic", "shot": "ReimuC", "version": "1.00a", "note": "Desync on Stage 2 and Stage 3. Replay is unwatchable", "url": "https://mega.nz/file/H2gBiK6Q#tIh0ivUkn-alePappyklAvemD3wyZL0bqjMiiKphelk"},
	
	"0ycu2Bqisw": {"game": "th12", "date": "2022-09-13", "author": "Nylilsa", "name": "Nylilsa", "difficulty": "Lunatic", "shot": "ReimuA", "version": "1.00b", "note": "Desync on Stage 2", "url": "https://mega.nz/file/fyxVwZoC#EpvP7wjmbXmaq7-D_w3RVbk2irEHsespEiBgdJSo8AU"},
	
	"C8JIJHBmZm": {"game": "th14", "date": "2022-09-13", "author": "Nylilsa", "name": "Ny", "difficulty": "Easy", "shot": "SakuyaA", "version": "1.00b", "note": "Wakasagihime's first spell-card", "url": "https://mega.nz/file/vi4R3L7Y#ctwxxJ_v0Crp_Lz0QjvSNiwZb8mGjc5-tSjFPva3spw"},
	"UOqn0F4Txs": {"game": "th14", "date": "2022-09-14", "author": "Nylilsa", "name": "Ny", "difficulty": "Lunatic", "shot": "ReimuA", "version": "1.00b", "note": "", "url": "https://mega.nz/file/OrwBxbDJ#a9kfr04MdTxYPI8ON5Ta-5Y9JfDNlouk4_Rw9EBB2Vc"},
	
	"06bYhNkRnt": {"game": "th143", "date": "2022-09-18", "author": "Nylilsa", "name": "Nylilsa", "difficulty": "1-5", "shot": "Seija", "version": "1.00a", "note": "", "url": "https://mega.nz/file/GjIE2SxS#Dc0nfF6Y0X6qL4Gak-w2yWAbO6p0Vy8yWXNtZl2ORiA"},
	
	"fZ38TTtyHT": {"game": "th15", "date": "2022-09-13", "author": "Nylilsa", "name": "NySSN3", "difficulty": "Lunatic", "shot": "Sanae", "version": "1.00b", "note": "Non-spell 3 skip", "url": "https://mega.nz/file/XyA2gBIb#Ksa7nfNYFOZxs2QbsLj_dTzB17kOkDJnrX_Q7_tKSmw"},
	"HPKdHaqdwC": {"game": "th15", "date": "2022-08-28", "author": "Nylilsa", "name": "Nylilsa", "difficulty": "Lunatic", "shot": "Reisen", "version": "1.00b", "note": "", "url": "https://mega.nz/file/jqREQYDJ#YG4xhMGw5DZkt6wo45G0G6mzXOBldyFTWj8z883rSGY"},
	
	"bYk0oqAKP0": {"game": "th16", "date": "2022-09-13", "author": "Nylilsa", "name": "PSG0625", "difficulty": "Extra", "shot": "Reimu", "version": "1.00a", "note": "", "url": "https://mega.nz/file/u74EHIID#eDHIDNgYb7_nM-p4V0-6vGnOX1pUj1DMHF-12Rjx3Ss"},
	
	"y4dOw7rsW0": {"game": "th17", "date": "2022-09-04", "author": "Nylilsa", "name": "PSG0539", "difficulty": "Extra", "shot": "YoumuOtter", "version": "1.00b", "note": "", "url": "https://mega.nz/file/u6R33KCC#dgRUByJMFsb9wx43CBa7xaFY2QldQtQslmHQ9V8BA24"}

};

const contributors = {
	"S7daW4HHTY": {"name": "32th System", "help": "Provided various aids", "url": "https://youtube.com/32thc"},
	"1AThrt4mzz": {"name": "Helio Knight", "help": "HSiFS page 3 research", "url": "https://www.youtube.com/channel/UCNbaT2iVuYKN5q94b9UlTEA"},
	"0lDi5bpXmy": {"name": "kana0603", "help": "Provided various EoSD glitches & replays", "url": "https://twitter.com/kana_th6"},
	"VSlamYrAwJ": {"name": "zero318", "help": "Massively helped with the Merlin glitch", "url": "https://github.com/zero318"}
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
	th17: {"completed-pages": 9, "total-glitches": 37, "comment": "Not likely to change"},
	th18: {"completed-pages": 8, "total-glitches": 41, "comment": "Number is likely to increase"},
	th185: {"completed-pages": 0, "total-glitches": 11, "comment": "Number is likely to increase"},
};
