import { Router } from './classes/Router.js';

let snippetsPath = "media/snippets/";
let router = new Router(snippetsPath);

const validRoutes = ['contact', 'events', 'farmers', 'impressum', 'index', 'latte_art', 'products'];

let existingFileRoute = router.checkForExistingPageInLocation();
if(existingFileRoute && validRoutes.includes(existingFileRoute)){
    router.readFile('_'+existingFileRoute+'.html', function (data) {
        router.switchContent(data, existingFileRoute, 0.1, "none");

    });
} else {
    router.readFile('_index.html', function (data) {
        router.switchContent(data, 'index', 0.1, "none");
    });
}

function onItemClick(el, href) {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        router.readFile("_" + href, function (data) {
            router.switchContent(data, href.replace('.html', ''));
        });
    });
}

// set all nav links
function setClickableAnchorLinksWhichLoadsAnotherSnippet() {
    let a_items = document.querySelectorAll('a');
    let href = "";

    console.log(a_items);

    a_items.forEach((el) => {
        href = el.getAttribute('href');
        if (href) {
            onItemClick(el, href);
        }
    });


}

setClickableAnchorLinksWhichLoadsAnotherSnippet();