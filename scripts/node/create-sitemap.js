const fs = require("fs");
const path = require("path");

const BASE_URL = "https://nylilsa.github.io";
const DIST_DIR = path.join(__dirname, "../../dist");
const OUTPUT_SITEMAP = path.join(__dirname, "../../sitemap.xml");

function generateSitemap() {
    const urls = [];

    function walk(dir) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.name.endsWith(".html") && entry.name !== "404.html") {
                const relative = path.relative(DIST_DIR, fullPath);
                let urlPath = relative.replace(/\\/g, "/");

                if (urlPath === "index.html") {
                    // home directory, base
                    urlPath = "";
                } else if (urlPath.endsWith("/index.html")) {
                    urlPath = urlPath.slice(0, -"/index.html".length);
                } else {
                    urlPath = urlPath.replace(/\.html$/, "");
                }
                urls.push(`/${urlPath}`);
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