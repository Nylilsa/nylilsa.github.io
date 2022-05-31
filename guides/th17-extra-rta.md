[title=WBaWC: Extra RTA guide]
# Wily Beast and Weakest Creature - Extra RTA guide

[hr_major]  

Author: Nylilsa

This guide focuses on speedrunning the Extra stage of Wily Beast and Weakest Creature (often abbreviated to WBaWC).
Furthermore, **this guides assumes you know the basics of the game**, such as but not limited to the controls, game's objectives, bombing/dying, Youmu as shottype, and the game's items. Though, I will revise the token system


[Introduction]
[wbawc mechanics mechanics]

## Tokens and hypers

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

|   No-Focus   | Laser 1 | Laser 2 | Laser 3 | Laser 4 |
|:---------:|:-------:|:-------:|:-------:|:-------:|
| 0.00-0.95 |         |         |         |         |
| 1.00-1.95 |    10   |         |         |         |
| 2.00-2.95 |    10   |    10   |         |         |
| 3.00-3.95 |    9    |    10   |    9    |         |
| 4.00-5.00 |    9    |   [test1]10[/test1]   |    [test2]10[/test2]   |    9    |

[youmuw vs youmuo] 


[advanced tech:]
[on-screen token management (i.e. "help how do deal with 30 tokens on-screen i cant see anything")]
[tapping shift to retract subshot for extra dmg]
[Wolf hyper break]
[Eagle hyper break]
[Double eagle hyper]
["Token duplication (getting 5 tokens instead of 2 with the special token)"]
[Bombing pre-spell]
[Bomb during survival]
[Bomb damage during final spell]
[Death during hyper break]

[preferred resources route]

[Pre-midboss ]
[Midboss kutaka (long)]
[post-midboss]
[Saki (very long section)]

[Tools]
[Special thanks]
https://youtu.be/Q7CN9ZGAiHY?t=575