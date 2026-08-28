Build script:

In essence

Markdown files + Main HTML base -> HTML files

But MD files contain custom extensions

Idea:

1. Load HTML skeleton in memory
2. Update HTML skeleton's sidebars with data in json files
3. Load MD file in memory
4. MD file -> MD2HTML
5. HTML base + MD2HTML

Idea 1 step 3 has following problems (The showdown.js contains application logic)

title : Done
cite : Done
replay : Done
contributors : Done
ins : Done
canvas : 
buildCategoriesTable : Done (initial showcase toggle needs to be fixed, currently they are all shown by default)
jumpto : Done (However, need to fix current instances of jumpTo)
img : Done
imgcss : Done
hr_custom : Done (implementation is janky but seems to work)
match : Done


