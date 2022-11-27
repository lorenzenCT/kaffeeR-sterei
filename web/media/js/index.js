import { Navigation } from "./classes/Navigation.js"
import { ContactFormHelper } from "./classes/ContactFormHelper.js"
import { ContactHelper } from "./classes/ContactHelper.js"
import { CookieHelper } from "./classes/CookieHelper.js"


const snippetsPath = "media/snippets/"
const scriptsPath = "media/js/sites/"
const routes = {
    'contact': {
        "name": "contact",
        "nav-element": document.querySelector("#navbar li a[data-routename='contact']"),
        "path": `${snippetsPath}_contact.html`,
        "callback": function () {
            const helper = new ContactHelper()

            helper.initCharCounter()
            helper.initValidator()
        }
    },
    'events': {
        "name": "events",
        "nav-element": document.querySelector("#navbar li a[data-routename='events']"),
        "path": `${snippetsPath}_events.html`,
        "scripts": `${scriptsPath}events.js`,
        "callback": function () { }
    },
    'farmers': {
        "name": "farmers",
        "nav-element": document.querySelector("#navbar li a[data-routename='farmers']"),
        "path": `${snippetsPath}_farmers.html`,
        "callback": function () { }
    },
    'impressum': {
        "name": "impressum",
        "nav-element": document.querySelector("#navbar li a[data-routename='impressum']"),
        "path": `${snippetsPath}_impressum.html`,
        "callback": function () { }
    },
    'index': {
        "name": "index",
        "nav-element": document.querySelector("#navbar li a[data-routename='index']"),
        "path": `${snippetsPath}_index.html`,
        "callback": function () { }
    },
    'latte_art': {
        "name": "latte_art",
        "nav-element": document.querySelector("#navbar li a[data-routename='latte_art']"),
        "path": `${snippetsPath}_latte_art.html`,
        "callback": function () { }
    },
    'products': {
        "name": "products",
        "nav-element": document.querySelector("#navbar li a.products"),
        "path": `${snippetsPath}_products.html`,
        "callback": function () {
            ProductLoader.load()
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // load initial
    const nav = new Navigation("index", routes);

    const contactFormHelper = new ContactFormHelper();
    const footer_newsletter = document.querySelector('#footer-newsletter');
    contactFormHelper.registerNewsletterForm(footer_newsletter);

    let cookieHelper = new CookieHelper;
    cookieHelper.checkCookie();
});

