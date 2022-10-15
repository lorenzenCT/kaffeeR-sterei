import { Router } from './classes/Router.js';
import { ContactFormHelper } from './classes/ContactFormHelper.js';

let snippetsPath = "media/snippets/";
let router = new Router(snippetsPath);

const validRoutes = ['contact', 'events', 'farmers', 'impressum', 'index', 'latte_art', 'products'];

// this code checks if inside of the location object is an valid "file" requested e.g. products -> if so load the file
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

// provide anchor el mit functionalty to switch the content and change the current active tab in the navbar; Function 1 out of 2 needed to make the switcher work
function onItemClick(el, href) {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        removeActiveStateFromAllNavLis();
        el.classList.add("active");
        router.readFile("_" + href, function (data) {
            router.switchContent(data, href.replace('.html', ''));
        });
    });
}

// reset current active tab in navbar
function removeActiveStateFromAllNavLis(){
    let all_lis = document.querySelectorAll('#navbar li a');
    all_lis.forEach((el)=>{
        el.classList.remove("active");
    });
}

// set all nav links; Funktion 2 out of 2 to provide all anchor with content-switcher functionality
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

let contactFormHelper = new ContactFormHelper();
let footer_newsletter = document.querySelector('#footer-newsletter');
contactFormHelper.registerNewsletterForm(footer_newsletter);
