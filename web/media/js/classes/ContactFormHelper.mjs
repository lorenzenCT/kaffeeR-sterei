import { StorageHelper } from "./StorageHelper.mjs";

export class ContactFormHelper {
    constructor() {
        this.storageHelper = new StorageHelper();
    }

    registerSignUpForm(html_node) { }

    registerContactForm(html_node) {
        html_node.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(e);

            // get input fields

            // store data
        });
    }

    registerNewsletterForm(html_node) {
        html_node.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(e);

            let email = e.srcElement.querySelector('[name="email"]')?.value;
            if (!email) return;

            let firstname = e.srcElement.querySelector('[name="firstname"]')?.value ?? '';
            let lastname = e.srcElement.querySelector('[name="lastname"]')?.value ?? '';

            let obj = { email, firstname, lastname };

            this.storageHelper.storeNewsletterSubscriber(obj);
        });
    }
}