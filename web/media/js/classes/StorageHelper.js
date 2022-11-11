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
        this.storeData("newsletter_subscribers", data.email, data);
    }

    
    storeData(dataset, id, data) {
        let storage = window.localStorage;

        // get current value and add new data to it
        let raw = storage.getItem(dataset) || '{}';
        let parsed = JSON.parse(raw);

        // add onto obj @notice: parsed is not an array!
        parsed[id] = data;

        // add back to storage
        storage.setItem(dataset, JSON.stringify(parsed));
    }
}