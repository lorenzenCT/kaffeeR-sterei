export class Router {

    constructor(snippetsPath) {
        this.snippetsPath = snippetsPath;
        this.isLoading = false;
    }

    readFile(file, cb) {
        var rawFile = new XMLHttpRequest();
        console.log(this.snippetsPath + file);
        rawFile.open("GET", this.snippetsPath + file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    cb(allText);
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

    switchContent(newContent, file, delay=1, animation="default") {
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
        }, 1000 * delay);

    }

    checkForExistingPageInLocation(){
        if(location.href.includes("/")){
            let snippet = location.href.split("/")[3];
            if(snippet) return snippet;
        }
    }
}