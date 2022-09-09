class Router {

    constructor() {

    }

    readFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    alert(allText);
                }
            }
        }
        rawFile.send();
    }

    switchContent(newContent) {
        document.querySelector('main').InnerHTML = newContent;
    }
}

let router = new Router();

let newContent = router.readFile("file:///home/mschulze/PhpstormProjects/BBS1/Bleecker%20Street%20HP/web/media/snippets/contact.html");
//"file:///home/mschulze/PhpstormProjects/BBS1/Bleecker%20Street%20HP/web/media/img/sebastian-schuppik-H7xTpvBjJS4-unsplash.jpg"

console.log(newContent);

setTimeout(function () {
    router.switchContent(newContent);
}, 1000 * 3);