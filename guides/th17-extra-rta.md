[title=WBaWC: Extra RTA guide]
[execute]
# Wily Beast and Weakest Creature - Extra RTA guide

[hr_major]  

Author: Nylilsa

This guide focuses on speedrunning the Extra stage of Wily Beast and Weakest Creature (often abbreviated to WBaWC).
Furthermore, **this guides assumes you know the basics of the game**, such as but not limited to the controls, game's objectives, bombing/dying, Youmu as shottype, and the game's items. Though, I will revise the token system


[Introduction]
[wbawc mechanics mechanics]

## Tokens and hypers
[hr_minor]

WBaWC has a special gimmick that is about tokens and hypers. Tokens are dropped by some stage enemies and bosses, and they are also dropped if the player dies. If the player collects 5 tokens, then the player triggers a **hyper**.

If you pick up a token during a hyper, then the duration of the hyper is extended and, depending on the token you picked up, you may get some items as well (more on that later).

### Tokens

[image]


Above is an image that has all tokens in them:

There are the **animal tokens** , which are the **Wolf**, **Otter** and **Eagle** tokens. Those animal tokens change state after some time, which is made visible by their blinking outline They start blinking 45 frames before they are about to transition.
Otter to Eagle to Wolf to Otter.
Some of them have a red/blue outline. This means that **they are not mutable**. Those tokens only appear if you die or if you are on Stage 6 of the game, but it's not too relevant because we are doing Extra !
If you are close enough to the tokens, you'll notice that the tokens become a lot slower. Not only do they become slower if you are nearby, they'll also stop changing states ! But this is slightly different from how UFO handles its tokens.
You see, in UFO, a mutable UFO token has a hidden timer that counts to 0. If the counter hits 0, then the UFO changes colour. If the player is close to a mutable UFO token, then that counter *pauses*. The counter resumes the moment the player is far enough from the token, so **it's possible for the token to change colour the frame the player leaves its radius**.
In WBaWC, a mutable animal token has a hidden timer that counts to 0. If the counter hits 0, then the animal token transitions into another animal token. If the player is close to a mutable animal token, then that counter *not only pauses, but also gets set to 60*. This means that if the player is not close to the token anymore, then **it is impossible for the mutable animal token to instantly mutate**, unlike in the case of UFO. This can be used to your advantage to manipulate as many different tokens as possible at once, but more on that is discussed later.

Then there are the **item tokens** which have the blue fish around them. 
If you timeout or break a hyper that has an item token in it, then you will get its items. Also, if you pick up an item token during an active hyper, then you instantly get the items. Below I describe all the 
+ If you pick up a **power item token**, then you get 30 power items.
+ If you pick up a **point item token**, then you get 30 point items.
+ If you pick up a **life token**, then you get 1 life piece.
+ If you pick up a **bomb token**, then you 1 bomb piece.

(yeah its kinda false advertising for the life and bomb tokens, because you'd expect to get a full life/bomb based on the image you're shown xP)

Lastly, there are the **special tokens**. The special tokens have a yellow glow to them. Only one of those tokens can be gotten every stage, so for Extra you can only get one of the tokens.
If you have a special tokens during a hyper, then the hyper gives you 5 tokens in return instead of 2. 

### Hypers

When collecting 5 tokens, the player activates a hyper. A little bar appears beneath the player. If the bar runs out, then you get 2 or 5 tokens in return. If you get hit or if you try to bomb during a hyper, then the hyper is manually broken, which clears some bullets around the player and gives you some invincibility. Also, if you shoot during the hyper, then you will get PIV or Point Item Value. This is related to score, and since score is not relevant when speedrunning I won't go into much detail about it.

If you pick up 3 animal tokens of the same type, then **your hyper has a special ability**. This differs per shottype and per animal token.
Also, the **special hyper's duration is affected by your shottype**. For example, if YoumuOtter has 3 wolf tokens in its hyper, then the hyper's duration is very short. But if YoumuWolf has 3 wolf tokens in its hyper, then the hyper's duration is longer than YoumuOtter's.

Below I describe the different special hypers.

[hr_minor]

The Wolf hyper focuses on single-target damage.

Reimu: Reimu shoots powerful needles that is good for single-target damage.
Marisa: Marisa shoots very large missiles that have a lot of Area of Effect damage upon explosion
Youmu: Youmu's Wolf hyper is exactly the same as 4-power YoumuWolf's charge shot is: she shoots 8 slashes that have a long reach. 

[hr_minor]

The otter hyper is very simple. When you have an otter hyper, there are three otters that spawn around you and that rotate counter-clockwise. When bullets touch the otters, the bullets are cancelled and turned into score. The otters deal very little damage to an enemy. This hyper is the same for every player character. 

[hr_minor]

The Eagle hyper focuses more on Area of Effect damage.

Reimu: Reimu shoots very large homing amulet bullets that deal a decent amount of damage.
Marisa: Marisa shoots 5 large powerful piercing laser beams that also deals a decent amount of damage.
Youmu: Youmu's Eagle Hyper shoots out small waves from where Youmu is at that deals a lot of damage when up-close.

[hr_minor]

(also, the beast should reflect on the shottype's spirit animal, so MarisaWolf's performance is better on a single target due to strong missiles, whereas MarisaEagle is better on stage sections due to its better lasers.)

That should cover the main mechanics of tokens and hypers !

### Strongest shottype evaluation

I will first distinguish between the best player character, then I will tell about the best spirit animal.

There are three character you could choose from: Reimu, Marisa and Youmu.

There are a number of factors I take into account when determining the best shottype in WBaWC. The factors go as follows:

1. The shottype's average Damage per Second of the shottype (abbreviated to DPS);
2. The shottype's Bomb;
3. The shottype's Wolf and Eagle hypers.

When comparing the DPS on a boss, it's found out that [a=https://youtu.be/Q7CN9ZGAiHY?t=575]Youmu is the best shot for DPS[/a]. 

Below, I summarise the best results per shottype of the video

with no-hyper:

| Spirit | Reimu | Marisa | Youmu |
|:---:|:---:|:---:|:---:|
| Wolf | 17.13s | 16.00s | 11.56s |
| Otter | 20.56s | 18.78s | [hl]10.10s[/hl] |
| Eagle | 19.05s | 17.75s | 12.25s |

YoumuOtter is the strongest shottype assuming no hyper is used.

with wolf hyper: 

| Spirit | Reimu | Marisa | Youmu |
|:---:|:---:|:---:|:---:|
| Wolf | 11.78s | 12.65s | [hl]10.01s[/hl] |
| Otter | 11.78s | 12.65s | [hl]10.01s[/hl] |
| Eagle | 11.78s | 12.65s | 12.70s |

YoumuWolf and YoumuOtter are the strongest shottypes with their Wolf hyper. The reason why YoumuEagle doesn't do as well is because [a=/#/bugs/th17/0]of a bug[/a]

with eagle hyper: 

| Spirit | Reimu | Marisa | Youmu |
|:---:|:---:|:---:|:---:|
| Wolf | 14.80s | 12.15s | [hl]9.88s[/hl] |
| Otter | 14.80s | 12.15s | [hl]9.88s[/hl] |
| Eagle | 14.80s | 12.15s | [hl]9.88s[/hl] |

YoumuWolf, YoumuOtter, and YoumuEagle are the strongest shottypes with their Eagle hyper.

Conveniently, YoumuOtter has a much stronger bomb, and she spawns with 4 bombs in stock instead of 3 bombs. Since YoumuOtter deals the most damage with an active hyper and without an active hyper, she is the best damage shottype.


#### YoumuWolf vs YoumuOtter 

...but wait, how is YoumuOtter stronger than YoumuWolf? Heck, Wolf is supposed to be the beast that deals more damage !

Their focussed slashes are the same, except for YoumuWolf's slashes. She has an additional two slashes.

In short, *YoumuOtter's slashes are slower than YoumuWolf's is* ! I'll try to explain my best what I mean by this.

Consider the following table:


| Slash | 4P damage | YoumuW | YoumuO | YoumuE |
|:-----:|:---------:|:------:|:------:|:------:|
|   1   |    130    |   0F   |   0F   |   0F   |
|   2   |    120    |   6F   |   8F   |   8F   |
|   3   |    110    |   12F  |   16F  |   16F  |
|   4   |    100    |   17F  |   24F  |   24F  |
|   5   |    100    |   23F  |   32F  |   32F  |
|   6   |    100    |   28F  |   39F  |   39F  |
|   7   |     90    |   32F  |    -   |    -   |
|   8   |     90    |   39F  |    -   |    -   |

The table displays the damage per frame value of the n-th slash of Youmu at 4 power. The value in the **Youmu** columns is when Youmu's slash spawns when shooting focussed. (so YoumuWolf's third slash spawns 12 frames after releasing the shoot button when charged)

Every slash spawns 40 units above the previous slash. All of Youmu's slashes last for the same time (from memory, a slash lasts for 14 frames).

Also, YoumuWolf and YoumuOtter can deal a maximum of 160 damage per frame. YoumuEagle can only deal a maximum of 60 damage per frame.

Oh and also, Saki doesn't have an infinite hurtbox, meaning there are going to be slashes that are going to miss Saki.

*But why does all of this matter?* Well, here's where the magic takes place.
YoumuWolf's slashes are spawned too quickly one after the other. Multiple slashes are hitting the boss at the same time, which allows for up to 400 damage per frame to be dealt. However, the damage cap allows YoumuWolf to only deal 160 damage per frame (sadly D:). After the first few slashes, the other slashes of YoumuWolf are spawning quickly as well, but they are spawning way above the boss, thus dealing no damage.
YoumuOtter can deal about 300 damage per frame at max, but again, the damage cap allows YoumuOtter to only deal 160 damage per frame. However, YoumuOtter's slashes have a longer delay between each slash. This means that overall, YoumuOtter's damage is distributed more evenly than YoumuWolf's damage is. 

In other words, YoumuOtter's damage is more spread out than YoumuWolf's damage is, hence YoumuOtter deals more damage than YoumuWolf.

## Advanced tech
[hr_minor]

### Survival bomb

Beginner

Due to a bug, Saki takes damage when bombing during her Survival spell card. You definitely want to bomb as you will skip an entire 90-second long spell-card with this.

### Bombing before a spell-card

Beginner

If you bomb before a spell-card starts, the boss is able to take damage. In Extra, this can only be done on Kutaka's 2nd and 3rd mid-spell-cards.

### Shift-tapping

Beginner

In TD and WBaWC, if the player holds Shift, then Youmu's options retract.
In TD, if the player releases shift, then the options to back to where they were previously.
In WBaWC, if the player releases shift, then the options are right above Youmu.

There are cases where you will be running across the screen collecting tokens during a bomb. Your options will be all over the place, and they may not be under the boss. In such a case, it is important to periodically press shift to retract your shot's options to deal as much damage as possible.

### On-screen token management

Intermediate

[img=guides/th17-extra-rta-not-enough-tokens.png, hratio=2, other= ]

Yeah, that's a lot of tokens to deal with, and there are actually runs where there are double the tokens on-screen!

So, how do you deal with all the tokens on-screen?

Well, it's simple. You get better with it through experience.
Though, there are a couple of tips I could give you with dealing with token management.

1. Be comfortable with their hitboxes.

Go around the tokens and try to dodge them like bullets. There are often times where you may have to squeeze through two tokens you are trying to avoid. It is best to learn the hitbox of the tokens so that you know how to avoid them or when to pick them up. **This is the most important skill when dealing with tokens** in my opinion.

2. Know the cycles of the animal tokens.

Otter -> Eagle -> Wolf -> Otter -> Eagle -> Wolf

3. Manipulate the animal tokens.

Sometimes, there is a dominant animal token on-screen (i.e. there are only Eagle tokens on-screen). This can be very annoying since you would have to wait for a few second before picking up your preferred token in case you are unlucky. In this case, you want to stay close to some tokens and make sure there is a healthy mix of animal tokens on-screen.

### Bomb damage during final spell-card

Intermediate

Actually, you can also deal bomb damage to Saki's final spell-card too ! There are two ways in which this can be done.

1. Bomb before the spell-card starts.

Saki will be invincible for 90 frames, but then you are able to damage her normally.

2. Bomb 60-89 frames after the spell-card starts.

This is more tricky. If you decide to do this, Saki will only be invincible 60-89 frames after the spell-card starts. This effectively means that bombing later results in your bomb lasting for 1.5 seconds longer than if a bomb were used before the spell-card starts. 

### Token duplication

Intermediate

Although mostly used in scoring, it is possible to do it in Extra as well. Though for this to be done, you must get the special token from Kutaka midboss.

This is a bug that involves tricking the game into you having a different token state.

When timing down a hyper while having a special token, the player is rewarded with 5 tokens instead of 2 tokens. There is a brief period between not having any tokens and the 2 or 5 tokens spawning. However, it is possible to be rewarded 5 tokens without timing down a hyper with a special token in your inventory !
Firstly, you must activate a hyper that would normally reward you with 2 tokens. Then, once the hyper is timed out, there is a brief period in which you can grab additional tokens before you are rewarded with 2 tokens. In that brief period, you want to activate a hyper with a special token. If done correctly, you should be rewarded with 5 tokens instead of 2 tokens. (It is possible to do it the other way around where, instead of getting 5 tokens, you get 2 tokens.)

Though, this trick isn't necessary in Extra as you are given enough bombs. Also, you don't want to capture Kutaka's third spell.

### Double Eagle Hyper

Advanced

This trick involves duplicating Youmu's Eagle hyper for 39 frames. The setup is as follows:
1. Be one token away from activating your Eagle hyper.
2. Charge your slash.
3. (optional) Release your slash by releasing the Z key.
4. (Quickly) get the final token to activate your Eagle hyper.

Now, there are two Eagle hypers on-screen: one where the slash was released/where the token was picked up, and one where Youmu is at. Essentially, the game treats your slash as a place where it can spawn the Eagle hyper.

This trick is hard to set up when speedrunning, as you pretty much need to activate the Eagle hyper on top of the boss. This trick can save about one second per attack if done well.

[Wolf hyper break]
[Eagle hyper break]
[Excellent Youmu positioning]

### Death during a hyper break

Other

A hyper can be manually broken with the X button. However, there exists an annoying glitch with it. If the player breaks their hyper whilst the player is hit by an enemy/bullet, the player instantly dies. This is very annoying as dying costs time.

[Death during hyper break]

[preferred resources route]

[Pre-midboss ]
[Midboss kutaka (long)]
[post-midboss]
[Saki (very long section)]

[Tools]
[Special thanks]
https://youtu.be/Q7CN9ZGAiHY?t=575