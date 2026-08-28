const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const showdown = require("showdown");
// const ext = require("../showdown-ext");
const { fillCite, videoFunction, matchText, colorRGB, replayFunction, hrCustom, colorHex } = require("./build-helper");
const { initCategoriesTable } = require("../init-categories-table.js");

const rootDir = path.join(__dirname, "../..");
const pagesDir = path.join(rootDir, "pages");
const distDir = path.join(rootDir, "dist");
const mainHtmlPath = path.join(rootDir, "index.html");

const interface = {
    pageTitle: "",
    tooltips: new Map(),
}

let citeId = 0;
let eclJsonId = 0;
let figureId = 0;

const ECL = JSON.parse(fs.readFileSync("json/ecl.json"));
const GLITCH_TREE = JSON.parse(fs.readFileSync("json/glitch-tree.json"));
const CONTRIBUTORS = JSON.parse(fs.readFileSync("json/contributors.json"));
const WEBDATA = JSON.parse(fs.readFileSync("json/webdata.json"));


let ext = function () {
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
        replace: function (match, content) {
            return hrCustom(content);
        }
    }
    let br = {
        type: "lang",
        regex: /\[br\]/g,
        replace: "<br>"
    }
    let img = {
        type: "lang",
        regex: /\[img=(.*?), figtitle=(.*?), alt=(.*?)\]/g,
        replace: function (all, img, figtitle, alt) {
            figureId++;
            const path = img.startsWith("http") ? img : `/pages/${img}`;
            return `<div class="figure-outer-wrapper" id="figure-${figureId}"><div class="figure-inner-wrapper"><figure class="fit-wrapper"><img class="fit-image" title="${figtitle}" src="${path}" alt="${alt}"><figcaption><span style="font-style: normal;">Figure ${figureId}: </span>${figtitle}</figcaption></figure></div></div>`;
        }
    }
    let imgcss = {
        type: "lang",
        regex: /\[img=(.*?), figtitle=(.*?), alt=(.*?), other=(.*?)\]/g,
        replace: function (all, img, figtitle, alt, other) {
            figureId++;
            return `<div style="text-align: center;" id="figure-${figureId}"><figure class="fit-wrapper"><img style="${other}" class="fit-image" title="${figtitle}" src="pages/${img}" alt="${alt}"><figcaption><span style="font-style: normal;">Figure ${figureId}: </span>${figtitle}</figcaption></figure></div>`;
        }
    }
    let img_small = {
        type: "lang",
        regex: /\[img=(.*?)\]/g,
        replace: '<img title="$1" style="cursor:pointer; margin: 5px;" onclick="window.open(\'$1\')" src="$1">'
    }

    let code = {
        type: "lang",
        regex: /\[code\]([^]+?)\[\/code\]/g,
        replace: "<pre><code class='code language-c mono'>$1</code></pre>"
    }

    let title = {
        type: "lang",
        regex: /\[title=(.*?)\]/gim,
        replace: function (match, content) {
            interface.pageTitle = content;
            return '';
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

    let yes = {
        type: "lang",
        regex: /\[yes\]([^]*?)\[\/yes\]/g,
        replace: "<span><img src='/assets/green-check-mark.svg' class='icon-text'>$1</span>"
    }

    let unknown = {
        type: "lang",
        regex: /\[unknown\]([^]*?)\[\/unknown\]/g,
        replace: "<span class='unknown'><img src='/assets/question-mark.svg' class='icon-text'>$1</span>"
    }

    let no = {
        type: "lang",
        regex: /\[no\]([^]*?)\[\/no\]/g,
        replace: "<span><img src='/assets/red-cross.svg' class='icon-text'>~~$1~~</span>"
    }

    let discord = {
        type: "lang",
        regex: /\[discord\]/g,
        replace: "``nylilsa``"
    }

    let no_content = {
        type: "lang",
        regex: /\[no_content\]/g,
        replace: "<span style='font-style: italic; color:'>This section has no content yet. Would you like to add to this section? [jumpto=/me/contact]Contact me[/jumpto] if you are interested!</span>"
    }

    let work_in_progress = {
        type: "lang",
        regex: /\[wip\]/g,
        replace: "<span style='font-style: italic; color:'>This placeholder text has been placed here because this section is a Work In Progress. If you believe you could help out, please [jumpto=/me/contact]contact me[/jumpto] !</span>"
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
        replace: function (full, content, text) {
            return `<a class="url-toc" href="${content}">${text}</a>`;
        }
    };

    let sub = {
        type: "lang",
        regex: /\[sub\]([^]*?)\[\/sub\]/g,
        replace: "<sub>$1</sub>"
    }

    let box = {
        type: "lang",
        regex: /\[box=(.*?)\]([^]*?)\[\/box\]/g,
        replace: "<div class='box' style='max-width:$1px'>$2</div>"
    }

    let you_thief = {
        type: "lang",
        regex: /\[thereweresigns=(.*?)\]([^]*?)\[\/butyouignoredthem\]/g,
        replace: "<div style='$1'>$2</div>"
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
        replace: "<kbd class='key mono'>$1</kbd>"
    }

    let cite = {
        type: "lang",
        regex: /\[cite=([^]*?)\]/g,
        replace: function (match, content) {
            return videoFunction(content, WEBDATA);
        }
    };

    let replay = {
        type: "lang",
        regex: /\[replay=([^]*?)\]/g,
        replace: function (match, content) {
            return replayFunction(content, WEBDATA);
        }
    };

    let contributors = {
        type: "lang",
        regex: /\[contributors=([^]*?)\]/g,
        replace: function (match, id) {
            return contributorsFunction(id);
        }
    }

    let ins = {
        type: "lang",
        regex: /\[ins=(.*?), n=(.*?)\]/g,
        replace: function (match, content, n) {
            // let id = eclJsonId++;
            // return "temp"
            return replaceEclIns(content, n);
        }
    }

    let canvas = {
        type: "lang",
        regex: /\[canvas\]/g,
        replace: function () {
            setTimeout(() => { initCanvas(initRemoveHash(true)) }, 1);
            return "";
        }
    }

    let buildCategoriesTable = {
        type: "lang",
        regex: /\[buildCategoriesTable\]/g,
        replace: function () {
            return "<div id='bugsCategoriesTable'></div>";
        }
    }

    let match = {
        type: "lang",
        regex: /\[style=([^]*?), icon=(true|false), highlightedText=([^]*?)\]/g,
        replace: function (match, style, icon, highlightedText) {
            icon = (icon === 'true');
            return matchText(style, icon, highlightedText);
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

    let gt = {
        type: 'lang',
        regex: /\&gt\;/g,
        replace: '>',
    }

    let lt = {
        type: 'lang',
        regex: /\&lt\;/g,
        replace: '<',
    }

    let amp = {
        type: 'lang',
        regex: /\&amp\;/g,
        replace: '&',
    }
    return [ins, hr_major, hr_minor, hr_custom, br, img, imgcss, img_small, code, title, tip, video, yes, unknown, no, discord, no_content, work_in_progress, specs, what, how, why, why_idk, links, patches, rpy, vid, misc, a, jumpto, sub, box, you_thief, hl1, hl2, key, cite, replay, contributors, canvas, buildCategoriesTable, match, check, cross, gt, lt, amp]; // prioritize elements that will be nested within
}

const names1 = {
    "th01": { "game_number": "1", "abbreviation": "HRtP", "jp": "靈異伝", "en": "Highly Responsive to Prayers" },
    "th02": { "game_number": "2", "abbreviation": "SoEW", "jp": "封魔録", "en": "The Story of Eastern Wonderland" },
    "th03": { "game_number": "3", "abbreviation": "PoDD", "jp": "夢時空", "en": "Phantasmagoria of Dim. Dream" },
    "th04": { "game_number": "4", "abbreviation": "LLS", "jp": "幻想郷", "en": "Lotus Land Story" },
    "th05": { "game_number": "5", "abbreviation": "MS", "jp": "怪綺談", "en": "Mystic Square" },
    "th06": { "game_number": "6", "abbreviation": "EoSD", "jp": "紅魔郷", "en": "The Embodiment of Scarlet Devil" },
    "th07": { "game_number": "7", "abbreviation": "PCB", "jp": "妖々夢", "en": "Perfect Cherry Blossom" },
    "th08": { "game_number": "8", "abbreviation": "IN", "jp": "永夜抄", "en": "Imperishable Night" },
    "th09": { "game_number": "9", "abbreviation": "PoFV", "jp": "花映塚", "en": "Phantasmagoria of Flower View" },
    "th95": { "game_number": "9.5", "abbreviation": "StB", "jp": "文花帖", "en": "Shoot the Bullet" },
    "th10": { "game_number": "10", "abbreviation": "MoF", "jp": "風神録", "en": "Mountain of Faith" },
    "th11": { "game_number": "11", "abbreviation": "SA", "jp": "地霊殿", "en": "Subterranean Animism" },
    "th12": { "game_number": "12", "abbreviation": "UFO", "jp": "星蓮船", "en": "Undefined Fantastic Object" },
    "th125": { "game_number": "12.5", "abbreviation": "DS", "jp": "ダブルスポイラー", "en": "Double Spoiler" },
    "th128": { "game_number": "12.8", "abbreviation": "FW", "jp": "妖精大戦争", "en": "Fairy Wars" },
    "th13": { "game_number": "13", "abbreviation": "TD", "jp": "神霊廟", "en": "Ten Desires" },
    "th14": { "game_number": "14", "abbreviation": "DDC", "jp": "輝針城", "en": "Double Dealing Character" },
    "th143": { "game_number": "14.3", "abbreviation": "ISC", "jp": "弾幕アマノジャク", "en": "Impossible Spell Card" },
    "th15": { "game_number": "15", "abbreviation": "LoLK", "jp": "紺珠伝", "en": "Legacy of Lunatic Kingdom" },
    "th16": { "game_number": "16", "abbreviation": "HSiFS", "jp": "天空璋", "en": "Hidden Star in Four Seasons" },
    "th165": { "game_number": "16.5", "abbreviation": "VD", "jp": "秘封ナイトメアダイアリー", "en": "Violet Detector" },
    "th17": { "game_number": "17", "abbreviation": "WBaWC", "jp": "鬼形獣", "en": "Wily Beast and Weakest Creature" },
    "th18": { "game_number": "18", "abbreviation": "UM", "jp": "虹龍洞", "en": "Unconnected Marketeers" },
    "th185": { "game_number": "18.5", "abbreviation": "100BM", "jp": "バレットフィリア達の闇市場", "en": "100th Black Market" },
    "th19": { "game_number": "19", "abbreviation": "UDoALG", "jp": "獣王園", "en": "Unfinished Dream of All Living Ghost" },
    "th20": { "game_number": "20", "abbreviation": "FW", "jp": "錦上京", "en": "Fossilized Wonders" },
}

const converter = new showdown.Converter({
    extensions: [ext],
    noHeaderId: false,
    openLinksInNewWindow: true,
    simpleLineBreaks: true,
    strikethrough: true,
    tables: true
});

let template = fs.readFileSync(mainHtmlPath, "utf8");

function findMarkdownFiles(dir) {
    const files = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            files.push(...findMarkdownFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
            files.push(fullPath);
        }
    }

    return files;
}


function changeBaseIndexHtml() {
    const html = fs.readFileSync(mainHtmlPath, "utf8");
    const dom = new JSDOM(html);
    const document = dom.window.document;

    initSidebarThemes(document);
    initSidebarGlitches(document);
    fs.writeFileSync(`${mainHtmlPath}test.html`, dom.serialize()); //debug
    return dom.serialize();
}

function initSidebarThemes(document) {
    const themes = document.getElementsByClassName("circle-wrapper");
    for (let i = 0; i < themes.length; i++) {
        const parent = themes[i].parentElement;
        const game = parent.dataset.theme;
        let color = colorRGB(16, 1, game);
        if (game == "th17") {
            color = colorRGB(8, 1, game);
        }
        parent.style.setProperty('--clr-theme', color);
        const next = themes[i].nextElementSibling;
        next.textContent = `${names1[game]["jp"]}～${names1[game]["en"]}`;
    }
}
async function initSidebarGlitches(document) {
    try {
        const identifiers = document.querySelectorAll("#page-bugs li ul");
        const header = document.querySelectorAll("#page-bugs li button");
        for (let i = 0; i < identifiers.length; i++) { // does it games.length times
            const thnr = identifiers[i].id.slice(5); // bugs-th10 ---> th10
            const child = header[i + 1];
            const content = document.getElementById('bugs-' + thnr + '');
            content.style.setProperty('--clr-game', `${colorHex(thnr)}`);
            child.childNodes[1].data = `${names1[thnr]["jp"]}～${names1[thnr]["en"]}`;
            for (let j = 0; j < Object.keys(GLITCH_TREE[thnr]).length; j++) {
                const pageId = Object.keys(GLITCH_TREE[thnr])[j];
                const li = document.createElement("li");
                const div = document.createElement("div");
                const a = document.createElement("a");
                a.href = `/bugs/${thnr}/${GLITCH_TREE[thnr][pageId]["url-name"][0]}`;
                div.style.position = "relative";
                if (!GLITCH_TREE[thnr][pageId]["finished"]) { // if page is unfinished
                    a.textContent = `(WIP) ${GLITCH_TREE[thnr][pageId]['title']}`;
                } else {
                    a.textContent = GLITCH_TREE[thnr][pageId]['title'];
                }
                div.appendChild(a);
                li.appendChild(div);
                content.appendChild(li);
            }
        }
    } catch (error) {
        console.error('Error fetching or parsing names.json:', error);
    }
}

function updateTemplate() {
    template = changeBaseIndexHtml()
}

function replaceEclIns(type, n) {
    const id = `${type}-${n}`;
    const map = ["Instructions", "Globals", "Custom"];
    const ins = map[type];
    const obj = ECL[ins][n];
    const name = obj["Name"];
    if (interface.tooltips.has(id)) {
        return `<code data-tooltip-id='${id}' class='mono dotted' style='position: relative;'>${name}</code>`;
    }
    let html = `<div class='tooltip' id=${id}>`;
    html += getStringFromIns(obj, n);
    html += "</div>";
    interface.tooltips.set(id, html);
    return `<code data-tooltip-id='${id}' class='mono dotted' style='position: relative;'>${name}</code>`;
}

function getStringFromIns(obj, n) {
    let description = obj["Description"];
    const name = obj["Name"];
    const para = obj["Parameters"];
    let titleText = `${n} - ${name}`;
    if (para) {
        let parameterStrings = para.map(paramObj => {
            const paramName = Object.keys(paramObj)[0];
            const paramType = paramObj[paramName];
            return `${paramType} <code class="mono">${paramName}</code>`;
        });
        parameterStrings = parameterStrings.join(", ");
        titleText += `(${parameterStrings})`;
        for (let i = 0; i < para.length; i++) {
            const value = Object.keys(para[i])[0];
            description = description.replaceAll(`$${i + 1}`, `<code class="mono">${value}</code>`);
        }
    }
    let html = "<div><p><span class='mono'>";
    html += titleText
    html += "</span>"
    html += "</p><hr><p>";
    html += description;
    html += "</p></div>";
    return html;
}

function contributorsFunction(check) {
    let html = `<ul id='contributors-${check}'>`;

    for (const value of Object.values(CONTRIBUTORS[check] ?? {})) {
        if (value.url) {
            html += `<li><a class="url" href="${value.url}" target="_blank">${value.name}</a> - ${value.help}</li>`;
        } else {
            html += `<li>${value.name} - ${value.help}</li>`;
        }
    }

    html += `</ul>`;

    return html;
}

async function generateHtmlFiles() {
    const markdownFiles = findMarkdownFiles(pagesDir);
    const shift = 155; // allows smaller sized testing
    const max = 40; // testing, remove when done
    // for (let i = shift + 0; i < shift + max; i++) {
    for (const markdownPath of markdownFiles) { // uncomment for full version
        // const markdownPath = markdownFiles[i];
        let htmlFile = structuredClone(template); // this is base HTML skeleton file
        const markdown = fs.readFileSync(markdownPath, "utf8");

        const markdownHtml = converter.makeHtml(markdown);

        htmlFile = htmlFile.replace(
            "<!-- MD_CONTENT -->",
            markdownHtml
        );

        const relativePath = path.relative(pagesDir, markdownPath);
        const parts = relativePath.split(path.sep);
        const thnr = parts[parts.length - 2];
        const pageId = path.basename(markdownPath, ".md");

        const dom = new JSDOM(htmlFile);
        const document = dom.window.document;

        document.title = interface.pageTitle;
        const tooltipParent = document.getElementById("tooltip-container");
        interface.tooltips.forEach((html, key) => {
            tooltipParent.innerHTML += html;
        })
        const elements = document.getElementsByClassName('highlight-child');
        for (let i = 0; i < elements.length; i++) {
            elements[i].parentElement.classList.add('highlight-bg');
        }


        // Your JSON data for this page
        const pageData = GLITCH_TREE?.[thnr]?.[pageId];
        if (pageData) {
            const urlNames = pageData["url-name"];
            await initCategoriesTable(document, thnr, pageId, names1);
            htmlFile = dom.serialize();
            // fs.writeFileSync(`test.html`, dom.serialize());

            const canonicalName = urlNames[0];

            // Generate the actual page at the canonical URL
            const canonicalPath = path.join(
                distDir,
                path.dirname(relativePath),
                canonicalName,
                "index.html"
            );

            fs.mkdirSync(path.dirname(canonicalPath), { recursive: true });
            fs.writeFileSync(canonicalPath, htmlFile);

            console.log(`Built: ${canonicalName}`);

            // Generate redirects for every alias, EXCLUDING the old numeric ID
            // because if I ever rename page 
            // e.g. nylilsa.github.io/bugs/spell-skip 
            // to nylilsa.github.io/bugs/new-name 
            // I want the former to still work
            const aliases = [...urlNames.slice(1)];

            for (const alias of aliases) {
                const redirectPath = path.join(
                    distDir,
                    path.dirname(relativePath),
                    alias,
                    "index.html"
                );

                const redirect = `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=../${canonicalName}/">
    <link rel="canonical" href="../${canonicalName}/">
    <script>
        window.location.replace("../${canonicalName}/");
    </script>
</head>
<body>
    Redirecting to <a href="../${canonicalName}/">${canonicalName}</a>...
</body>
</html>`;

                fs.mkdirSync(path.dirname(redirectPath), { recursive: true });
                fs.writeFileSync(redirectPath, redirect);

                console.log(`Redirect: ${alias} → ${canonicalName}`);
            }
        } else {
            const relativePath = path.relative(pagesDir, markdownPath);
            const relativeHtmlPath = relativePath.replace(/\.md$/, ".html");

            const outputPath = path.join(distDir, relativeHtmlPath);

            fs.mkdirSync(path.dirname(outputPath), { recursive: true });

            fs.writeFileSync(outputPath, htmlFile);

            console.log(`Built: ${relativeHtmlPath}`);
        }


    }

}

updateTemplate();
generateHtmlFiles();





fs.cpSync("assets", "dist/assets", { recursive: true });
fs.cpSync("pages", "dist/pages", { recursive: true });
fs.cpSync("css", "dist/css", { recursive: true });
fs.cpSync("json", "dist/json", { recursive: true });
fs.cpSync("lib", "dist/lib", { recursive: true });
fs.cpSync("scripts", "dist/scripts", { recursive: true });
