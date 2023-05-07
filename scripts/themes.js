function hasTheme() {
    if(!localStorage.selectedTheme) {
        localStorage.selectedTheme = "th08";
    }
}

function loadTheme() {
    const theme = localStorage.selectedTheme;
    document.head.innerHTML += `<link rel="stylesheet" href="css/themes/${theme}.css" data-css="theme">`;
}

function initThemes() {
    hasTheme();
    loadTheme();
}

initThemes();