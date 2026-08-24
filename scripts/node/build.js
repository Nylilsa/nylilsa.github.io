const fs = require("fs");
const path = require("path");
const showdown = require("showdown");
const ext = require("../showdown-ext");

const rootDir = path.join(__dirname, "../..");
const pagesDir = path.join(rootDir, "pages");
const distDir = path.join(rootDir, "dist");
const mainHtmlPath = path.join(rootDir, "index.html");

const converter = new showdown.Converter({
    extensions: [ext],
    noHeaderId: false,
    openLinksInNewWindow: true,
    simpleLineBreaks: true,
    strikethrough: true,
    tables: true
});

const template = fs.readFileSync(mainHtmlPath, "utf8");

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

const markdownFiles = findMarkdownFiles(pagesDir);

for (const markdownPath of markdownFiles) {
    const markdown = fs.readFileSync(markdownPath, "utf8");

    const markdownHtml = converter.makeHtml(markdown);

    const output = template.replace(
        "<!-- MD_CONTENT -->",
        markdownHtml
    );

    const relativePath = path.relative(pagesDir, markdownPath);
    const relativeHtmlPath = relativePath.replace(/\.md$/, ".html");

    const outputPath = path.join(distDir, relativeHtmlPath);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    fs.writeFileSync(outputPath, output);

    console.log(`Built: ${relativeHtmlPath}`);
}
