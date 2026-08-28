"use strict";

let isEclListenerAdded = false;
let figureId = 0;
let eclJsonId = 0;
let citeId = 0;
const MEDIA_QUERY_WIDTH = 500; // value must match one in css file

function toggleSidebar(direction, forceClose) { //changes class of sidebar upon button press
    const time = getComputedStyle(document.documentElement).getPropertyValue('--time-animation').match(/\d+/g).map(Number)[0];
    const sidebarLeft = document.getElementById('sidebar-left');
    const sidebarRight = document.getElementById('sidebar-right');
    const content = document.getElementById('content');
    const header = document.getElementById('header');
    const chart = document.getElementById('wr-chart-wrapper');
    const wrButtons = document.getElementById('wr-game-buttons');
    const fade = document.getElementById("fade");

    const isLeft = direction === "left";
    const sidebar = isLeft ? sidebarLeft : sidebarRight;
    const paddingSide = isLeft ? 'Left' : 'Right';

    sidebar.classList.toggle('sidebar-set-open');
    const isClosing = forceClose || !sidebar.classList.contains('sidebar-set-open');

    if (isClosing) {
        fade.classList.remove("sidebar-toggle");
        if (chart) {
            chart.style.maxWidth = '';
            wrButtons.style.maxWidth = '';
        }
        content.style[`padding${paddingSide}`] = '';
        header.style[`padding${paddingSide}`] = '';
        sidebar.style.transform = '';
        return;
    }

    // Opening logic
    sidebar.style.transform = isLeft
        ? 'translateX(0)'
        : 'translateX(calc(100vw - var(--sidebar-width)))';

    fade.classList.add("sidebar-toggle");
    content.style[`padding${paddingSide}`] = 'calc(var(--sidebar-width) + 3vmax)';
    // header.style[`padding${paddingSide}`] = 'calc(var(--sidebar-width))';

    if (chart) {
        const maxWidthVal = 'calc(max(1030px, calc(88vw - var(--sidebar-width) + 3vmax))';
        chart.style.maxWidth = maxWidthVal;
        wrButtons.style.maxWidth = maxWidthVal;
    }

}

function showNavbarChildren() { //toggles all elements in navbar of Bugs if clicked on
    const elements = document.getElementsByClassName("sidebar-bugs");
    const collapsing = elements[0].nextElementSibling.classList.contains("collapsing");
    if (!collapsing) {
        const selector = document.querySelector(".show-selector");
        const flag = selector.classList.contains("show-function");
        if (flag) {
            selector.classList.remove("show-function");
            selector.textContent = "Hide all";
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].nextElementSibling.classList.contains("collapse")) {
                    elements[i].click();
                }
            }
        } else {
            selector.classList.add("show-function");
            selector.textContent = "Show all";
            for (let i = 0; i < elements.length; i++) {
                if (!elements[i].nextElementSibling.classList.contains("collapse")) {
                    elements[i].click();
                }
            }
        }
    }
}

function setTheme(theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.selectedTheme = theme;
}

///////////////////// INIT /////////////////////

function initSidebarVisibility() {
    const sidebarLeft = document.getElementById("sidebar-left");
    if (window.innerWidth >= MEDIA_QUERY_WIDTH) {
        // disbable animation
        sidebarLeft.style.transition = "transform 0.01ms ease-in-out";
        // toggle sidebar without animation
        toggleSidebar('left');
        // re-enable animation, must be in setTimeout
        setTimeout(() => {
            sidebarLeft.style.transition = "";
        }, 0)
    }
    const savedScroll = localStorage.getItem('sidebarScroll');
    if (savedScroll !== null) {
        setTimeout(() => {
            sidebarLeft.scrollTop = savedScroll;
        }, 20)
    }
}

function initSidebarListeners() {
    document.addEventListener("click", function (event) {
        if (window.innerWidth > MEDIA_QUERY_WIDTH) return;

        const header = document.getElementById("header");
        if (header.contains(event.target)) return;

        const sidebars = [
            { id: "sidebar-left", direction: "left" },
            { id: "sidebar-right", direction: "right" }
        ];

        sidebars.forEach(({ id, direction }) => {
            const sidebar = document.getElementById(id);
            if (!sidebar.classList.contains("sidebar-set-open")) return;
            if (!sidebar.contains(event.target)) {
                toggleSidebar(direction, true);
            }
        });
    });
    let scrollTimeout;
    document.getElementById('sidebar-left').addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const leftSidebar = document.getElementById('sidebar-left');
            localStorage.setItem('sidebarScroll', leftSidebar.scrollTop);
        }, 250);
    })
}

function initDropdownToggle() {
    const menus = document.getElementsByClassName("dropdown-toggle");
    const time = getComputedStyle(document.documentElement).getPropertyValue('--time-animation')
    const numTime = time.match(/\d+/g).map(Number)[0];
    for (let i = 0; i < menus.length; i++) {
        const dropdown = menus[i];
        const child = dropdown.nextElementSibling;
        child.style.minHeight = "0";
        dropdown.onclick = () => {
            if (!child.classList.contains("collapsing")) {
                child.classList.toggle("collapse");
                child.classList.toggle("collapsing");
                setTimeout(() => {
                    child.classList.toggle("collapsing");
                    child.classList.toggle("show");
                }, numTime);
                const height = child.scrollHeight;
                if (!child.classList.contains("show")) {
                    child.style.minHeight = `${height}px`;
                } else {
                    child.style.minHeight = "0";
                }
            }
        }
    }
}

function initListeners() {
    // toggle footer table visibility
    document.addEventListener("click", (e) => {
        const button = e.target.closest(".toggle-button");
        if (!button) return;

        const target = document.querySelector(button.dataset.target);
        if (!target) return;

        target.classList.toggle("hidden");

        const showDefault = !target.classList.contains("hidden");

        button.textContent = showDefault ? button.dataset.hide : button.dataset.show;
        button.setAttribute("aria-expanded", String(showDefault));
    });
    // tooltip
    document.addEventListener("mouseover", event => {
        const trigger = event.target.closest("[data-tooltip-id]");
        const tooltip = event.target.closest(".tooltip");
        if (tooltip) {
            tooltip.classList.add("visible");
            return;
        }
        if (!trigger) {
            document.querySelectorAll(".tooltip.visible").forEach(el => {
                el.classList.remove("visible");
            });
            return;
        }
        const id = trigger.dataset.tooltipId;
        const tooltipElement = document.getElementById(id);
        if (!tooltipElement) return;
        document.querySelectorAll(".tooltip.visible").forEach(el => {
            el.classList.remove("visible");
        });
        tooltipElement.classList.add("visible");
        const mdcontent = document.getElementById("mdcontent");
        const hoverText = trigger.getBoundingClientRect();
        const mdRect = mdcontent.getBoundingClientRect();

        let left = hoverText.left - mdRect.left +
            (hoverText.width / 2) -
            (tooltipElement.offsetWidth / 2);

        const top = hoverText.top - mdRect.top - tooltipElement.offsetHeight;

        if (left < 0) {
            left = 0;
        }
        if (left + tooltipElement.offsetWidth > mdcontent.offsetWidth) {
            left = mdcontent.offsetWidth - tooltipElement.offsetWidth;
        }
        tooltipElement.style.left = `${left}px`;
        tooltipElement.style.top = `${top}px`;
    });
    // spa smooth logic
    document.addEventListener("click", event => {
        // todo: fix issue of going to invalid page (e.g. gfw: n/a page)
        const link = event.target.closest("a");

        if (!link || link.target === "_blank") return;
        if (link.origin !== location.origin) return;

        if (link.pathname === location.pathname && link.hash) {
            return;
        }

        event.preventDefault();

        navigate(link.href);
    });
    window.addEventListener("popstate", () => {
        navigate(location.href, false);
    });
}

async function navigate(url, push = true) {
    const response = await fetch(url);
    const html = await response.text();

    const doc = new DOMParser().parseFromString(html, "text/html");

    document
        .querySelector("#mdcontent")
        .replaceWith(doc.querySelector("#mdcontent"));

    if (push) {
        history.pushState({}, "", url);
    }

    newPage(doc);

    // todo: make scroll smooth? make it so header doesnt overlap with text, do it by adding offset
    if (new URL(url).hash) {
        document.querySelector(new URL(url).hash)?.scrollIntoView();
    }
}

function newPage(doc) {
    hljs.highlightAll();
    document.title = doc?.title;
    initCanvasPage();
}

async function initCanvasPage() {
    if (!document.getElementById("canvas-container")) {
        return;
    }
    try {
        const [myChart, libChart] = await Promise.all([
            import("./chart.js"),
            import("../lib/chart.js"),
        ]);

        Object.entries(myChart).forEach(([name, exported]) => { window[name] = exported; });
        Object.entries(libChart).forEach(([name, exported]) => { window[name] = exported; });

        const libChartHelper = await import("../lib/chartjs-adapter-date-fns.bundle.min.js");
        Object.entries(libChartHelper).forEach(([name, exported]) => { window[name] = exported; });

        initCanvas(); // external
    } catch (error) {
        console.error(error);
    }
}

function init() {
    initDropdownToggle();
    initSidebarListeners();
    initSidebarVisibility();
    initListeners();
    initCanvasPage();
    hljs.highlightAll();
}


init();