import { Router } from './classes/Router.js';

let snippetsPath = "media/snippets/";
let router = new Router(snippetsPath);


history.pushState({}, '', 'home');

router.readFile('_index.html', function(data){
    router.switchContent(data, 'index', 0.1);

});

function onItemClick(el, href) {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log("on click ");
        router.readFile("_" + href, function (data) {
            //console.log(data);
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