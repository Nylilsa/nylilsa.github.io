function tagsTable() {
    let str = '<table id="selected-container"><tbody>';
    let counterArray = countTags();
    let i = 0;
    const raritySeparator = 5;
    for (const [key, value] of Object.entries(tags)) {
        if (i === raritySeparator){str += "<tr><td></td><td></td><td class='invis left'>youtu.be/dQw4w9WgXcQ</td></tr>";}
        str += `<tr><td class="left">${counterArray[i]}</td><td class="left"><span class="tag"><a onclick="toggleTags(this)" data-key="${key}" class="tag" title="${value['description']}">${value['full']}</a></span></td><td class="left">${value['description']}</td>`;
        i++;
    }
    str += "</tbody></table>";
    return str;
}

function tagsSelector() {
    const selector = document.getElementById('bugs-tags');
    const array = JSON.parse(selector.dataset.list);
    let html = '';
    for (let i=0; i < array.length; i++) {
        html += '<span class="tag"><a onclick="toggleTags(this)" class="tag" data-key="'+array[i]+'">'+tags[array[i]].full+'</a></span>';
    }
    selector.innerHTML = html;
}

function toggleTags(element) {
    const table = document.getElementById("selected-container");
    const selector = document.getElementById('bugs-tags');
    const key = element.dataset.key;
    for (let i=0; i < table.childNodes[0].childNodes.length; i++) {
        if (i !== 3) {
            let a = table.childNodes[0].childNodes[i].childNodes[1].childNodes[0].childNodes[0];
            if (a.dataset.key === key) {
                a.classList.toggle("selected");
            }
        }
    }
    const array = JSON.parse(selector.dataset.list);
    if (array.includes(key)) {
        for(let i = 0; i < array.length; i++){ 
            if (array[i] === key) { 
                array.splice(i, 1);
            }
        }
    } else {
        array.push(key);
    }
    selector.dataset.list = JSON.stringify(array);
    tagsSelector();
}

function countTags() {
    console.time("test1");
    let tagsArray = [];
    let tagsCount = [];
    for (const [key, value] of Object.entries(tags)) {
        tagsArray.push(key);
        tagsCount.push(0);
    }
    for (const [key, value] of Object.entries(names)) {
        for (const [i, selector] of Object.entries(value)) {
            const array = selector[1];
            for (let i=0; i < array.length; i++) {
                const index = tagsArray.indexOf(array[i]);
                tagsCount[index] += 1;
            }
        }
    }
    console.timeEnd("test1");
    return tagsCount;
}
