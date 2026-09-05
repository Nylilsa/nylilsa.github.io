const fs = require("fs");
const path = require("path");

const BASE_URL = "https://nylilsa.dev";
const DIST_DIR = path.join(__dirname, "../../dist");
const OUTPUT_SITEMAP = path.join(__dirname, "../../sitemap.xml");
const GLITCH_TREE = require("../../json/glitch-tree.json");

function generateSitemap() {
    function walk(dir) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.name.endsWith(".html")) {
                const relative = path.relative(DIST_DIR, fullPath);
                let urlPath = relative.replace(/\\/g, "/");

                if (urlPath === "index.html") {
                    // home directory, base
                    urlPath = "";
                } else if (urlPath.startsWith("bugs/")) {
                    // bugs are handled using GLITCH_TREE due to redirects existing
                    return;
                } else if (urlPath.endsWith("/index.html")) {
                    urlPath = urlPath.slice(0, -"/index.html".length);
                } else {
                    urlPath = urlPath.replace(/\.html$/, "");
                }
                if (BLACKLIST.includes(urlPath)) continue;
                urls.push(`/${urlPath}`);
            }
        }
    }
    const urls = [];
    const BLACKLIST = [
        "404",
        "guides/th15-lilies",
        "me/_debug",
        "me/challenges",
        "me/development_time",
        "me/plus",
    ];
    // Add only canonical bug URLs and not redirects
    for (const [game, entries] of Object.entries(GLITCH_TREE)) {
        for (const entry of Object.values(entries)) {
            const canonicalName = entry["url-name"]?.[0];

            if (canonicalName) {
                urls.push(`/bugs/${game}/${canonicalName}`);
            }
        }
    }

    walk(DIST_DIR);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const url of urls) {
        xml += `    <url><loc>${BASE_URL}${url}</loc></url>\n`;
    }

    xml += "</urlset>\n";

    fs.writeFileSync(OUTPUT_SITEMAP, xml, "utf8");
    console.log(`Generated sitemap with ${urls.length} URLs`);
}

generateSitemap();