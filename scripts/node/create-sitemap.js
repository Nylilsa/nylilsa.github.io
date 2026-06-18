const fs = require('fs');
const path = require('path');

const BASE_URL = "https://nylilsa.github.io";
const MAPPING_FILE = path.join(__dirname, '../../json/glitch-tree.json'); 
const OUTPUT_SITEMAP = path.join(__dirname, '../../sitemap.xml');

function generateSitemap() {
    try {
        if (!fs.existsSync(MAPPING_FILE)) {
            console.error(`Mapping file not found at: ${MAPPING_FILE}`);
            return;
        }
        const rawData = fs.readFileSync(MAPPING_FILE, 'utf8');
        const mapping = JSON.parse(rawData);
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://sitemaps.org">\n';
        // hardcoded home + wr pages
        xml += `    <url><loc>${BASE_URL}/</loc></url>\n`;
        xml += `    <url><loc>${BASE_URL}/wr</loc></url>\n`;
        for (const gameKey in mapping) {
            const gameEntries = mapping[gameKey];
            if (typeof gameEntries === 'object' && gameEntries !== null) {
                for (const entryId in gameEntries) {
                    const info = gameEntries[entryId];
                    if (info && info["url-name"]) {
                        const names = Array.isArray(info["url-name"]) ? info["url-name"] : [info["url-name"]];
                        names.forEach(name => {
                            const cleanName = name.replace(/^\//, '');
                            xml += `    <url><loc>${BASE_URL}/bugs/${gameKey}/${cleanName}</loc></url>\n`;
                        });
                    }
                }
            }
        }
        xml += '</urlset>\n';
        fs.writeFileSync(OUTPUT_SITEMAP, xml, 'utf8');
        console.log(`sitemap.xml generated with all nested game URLs`);
        
    } catch (err) {
        console.error('Sitemap Error:', err);
    }
}

/* 
todo: make it better
only bug pages are added now but also add guides and stuff later
also bug: when visiting https://nylilsa.github.io/wr directly, does not work (libraries are not loaded properly)
*/
generateSitemap();
