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
