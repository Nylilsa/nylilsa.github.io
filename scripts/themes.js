function hasTheme() {
    if(!localStorage.selectedTheme) {
        localStorage.selectedTheme = "th08";
    }
}

function loadTheme() {
    const theme = localStorage.selectedTheme;
    document.querySelector("html").setAttribute("data-theme", theme);
}

function initThemes() {
    hasTheme();
    loadTheme();
}

initThemes();