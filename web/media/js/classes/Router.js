export class Router {

    constructor() {
        this.isLoading = false;
    }

    readFile(file, cb) {
        const rawFile = new XMLHttpRequest()
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    const data = rawFile.responseText;
                    cb(data);
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

    switchContent(newContent, file, delay=0, animation="default", cb) {
        console.log("switching content");
        if(animation === "default"){
            this.toggleLoading();
        }
        setTimeout(() => {
            // console.log(newContent);
            document.querySelector('#main').innerHTML = newContent;
            if(animation === "default"){
                this.toggleLoading();
            }
            console.log("switching done");
            history.pushState({}, '', file);

            cb()
        }, 1000 * delay);

    }

    checkForExistingPageInLocation(){
        if(location.href.includes("/")){
            let snippet = location.href.split("/")[3];
            if(snippet) return snippet;
        }
    }
}