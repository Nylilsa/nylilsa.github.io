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

title : 
cite : Done
replay : Done
contributors : 
ins : 
canvas : 
buildCategoriesTable : 
jumpto : 
img : 
imgcss : 
hr_custom : 
match : 


