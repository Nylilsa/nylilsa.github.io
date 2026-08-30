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
canvas : Done
buildCategoriesTable : Not done (initial showcase toggle needs to be fixed, currently they are all shown by default)
jumpto : Done (However, need to fix current instances of jumpTo)
img : Done
imgcss : Done
hr_custom : Done (implementation is janky but seems to work)
match : Done

ok now new problem:
Example: Someone shares old link: https://nylilsa.github.io/#/bugs/th06/dialogue-desync
Current iteration does not resolve to correct page.
Todo1 :
1. Write front end code that extracts hash (#/bugs/th06/dialogue-desync)
2. Check if first two are page (if equals to "#/") (note : anchors do not have "/" as 2nd char)
3. Also check if second part (baseUrl + "bugs/th06/dialogue-desync") resolves to a page
4. If true for both, redirect to page

Todo2 : make baseUrl redirect to home page DONE (see Todo7)
Todo3 : check for SEO things for HTML for better indexing/previews etc. DONE
Todo4: fix figure ID stacking DONE
Todo5: fix wr page initial load not working DONE
Todo6: DateFormat DONE
Todo7: Create dist/index.html DONE (home.md -> index.md)
Todo8: add valid GFW page "DONE" (I just removed it so it works now)
Todo9: 12-5 page see bottom link DONE 
Todo10: Some img= still using relative path instead of absolute DONE