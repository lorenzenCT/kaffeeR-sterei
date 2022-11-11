import { Navbar } from "./classes/Navbar.js"
import { ContactFormHelper } from "./classes/ContactFormHelper.js"

function loadLinksAndAddListeners() {
    document.querySelectorAll("#main * a")
        .forEach((elem) => {
            elem.addEventListener("click", (event) => {
                event.preventDefault()
                event.stopImmediatePropagation()

                loadNavWrapper(elem.getAttribute("href"), () => null)
            })
        })
}

function loadNavWrapper(link, cb) {
    new Navbar(link)
        .setAllInactive()
        .toggleActive()
        .load(cb)
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("a")
        .forEach((elem) => {
            elem.addEventListener("click", (event) => {
                event.preventDefault()
                event.stopImmediatePropagation()

                loadNavWrapper(elem.getAttribute("href"), loadLinksAndAddListeners)
            })

        })

    // load initial
    new Navbar("index").load(loadLinksAndAddListeners)
    
    const contactFormHelper = new ContactFormHelper();
    const footer_newsletter = document.querySelector('#footer-newsletter');
    contactFormHelper.registerNewsletterForm(footer_newsletter);

    
});

