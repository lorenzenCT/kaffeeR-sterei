import { Router } from './classes/Router.js';

let snippetsPath = "media/snippets/";
let router = new Router(snippetsPath);

function onNavItemClick(el, href) {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("on click ");
        router.readFile("_" + href, function (data) {
            router.switchContent(data);
        });
    });
}

// set all nav links
function setNavLinks() {
    let nav_items = document.querySelectorAll('div#navigation a');
    let href = "";

    console.log(nav_items);

    nav_items.forEach((el) => {
        href = el.getAttribute('href');
        onNavItemClick(el, href);
    });


}

setNavLinks();