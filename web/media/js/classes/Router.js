export class Router {

    constructor() {
        this.isLoading = false;
    }

    /**
     * 
     * @param args - has to include values: file/route path and callback function
     */
    readFile(args) {
        if (!args.file) {
            return Error("No Route provided!");
        } 
        if (!args.cb) {
            return Error("No Callback provided!");
        }
        const rawFile = new XMLHttpRequest();
        rawFile.open("GET", args.file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    const data = rawFile.responseText;
                    args.cb(data);
                }
            }
        }
        rawFile.send();
    }

    toggleLoading() {
        let node = document.querySelector('.loader');
        if (!node) {
            throw new Error("no loader found on website.");
        }
        if (this.isLoading) {
            // magic to show loading animation
            node.style.display = "none";
        } else {
            // magic to remove loading animation
            node.style.display = "block";
        }

        this.isLoading = !this.isLoading;
    }
    
    /**
     * 
     * @param {*} args - has to include newContent, file; optional: delay, animation, cb
     */
    switchContent(args) {
        console.log("switching content");
        if (!args.animation || args.animation === "default") {
            this.toggleLoading();
        }
        setTimeout(() => {
            document.querySelector('#main').innerHTML = args.newContent;
            if (args.animation === "default") {
                this.toggleLoading();
            }
            console.log("switching done");
            history.pushState({}, '', args.file);

            args.cb()
        }, 1000 * args.delay);

    }

    checkForExistingPageInLocation() {
        if (location.href.includes("/")) {
            let snippet = location.href.split("/")[3];
            if (snippet) return snippet;
        }
    }
}