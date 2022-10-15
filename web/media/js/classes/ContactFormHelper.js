import { StorageHelper } from "./StorageHelper.js";

export class ContactFormHelper {
    constructor() {
        this.storageHelper = new StorageHelper();
    }

    registerForm(html_node, type = "contact") {

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

            console.log(obj);

            this.storageHelper.storeNewsletterSubscriber(obj);
        });
    }
}