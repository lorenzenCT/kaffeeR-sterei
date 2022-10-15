export class StorageHelper {
    /**
     * This class uses the StoreAPI @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
     */

    constructor() {

    }

    /**
     * firstname and lastname are optional
     * @param {"email", "firstname", "lastname"} data 
     */
    storeNewsletterSubscriber(data) {
        if (!data.email) return;
        let storage = window.localStorage;

        // get current subs array and add new subscriber to it
        let subs = storage.getItem("newsletter_subscribers") ?? [];
        if (typeof (subs) === Array) {
            subs.push(data);
        }

        // add back to storage
        storage.setItem("newsletter_subscribers", subs);

    }
}