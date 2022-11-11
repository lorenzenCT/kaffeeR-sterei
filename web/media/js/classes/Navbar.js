import { ContactHelper } from "./ContactHelper.js"
import { ProductLoader } from "./ProductLoader.js"
import { Router } from "./Router.js"

const snippetsPath = "media/snippets/"
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
        "callback": function () { }
    },
    'farmers': {
        "name": "farmers",
        "nav-element": document.querySelector("#navbar li a.farmers"),
        "path": `${snippetsPath}_farmers.html`,
        "callback": function () { }
    },
    'impressum': {
        "name": "impressum",
        "nav-element": document.querySelector("#navbar li a.impressum"),
        "path": `${snippetsPath}_impressum.html`,
        "callback": function () { }
    },
    'index': {
        "name": "index",
        "nav-element": document.querySelector("#navbar li a.index"),
        "path": `${snippetsPath}_index.html`,
        "callback": function () { }
    },
    'latte_art': {
        "name": "latte_art",
        "nav-element": document.querySelector("#navbar li a.latte_art"),
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

export class Navbar {

    constructor(route) {
        if (typeof route === "string") {
            const _route = routes[route] || routes[this.parseRoute(route)]

            console.log(_route)
            if (_route) {
                this.route = _route
            } else {
                throw new Error("No such route", route)
            }
        } else {
            throw new Error("Route must be a string")
        }
    }

    static getRoutes() {
        return routes
    }

    parseRoute(route) {
        const a = route.split("/")
        return a[a.length - 1].split(".html")[0]
    }

    toggleActive() {
        const navElem = this.route["nav-element"]

        if (navElem) {
            if (navElem.classList.contains("active")) {
                navElem.remove("active")
            } else {
                navElem.classList.add("active")
            }
        }

        return this
    }

    setAllInactive() {
        document.querySelectorAll("#navbar li a.active")
            .forEach(elem => elem.classList.remove("active"))

        return this
    }

    load(cb) {
        const router = new Router()

        router.readFile(this.route.path, (data) => {
            router.switchContent(data, this.route.name, 0, "default", () => {
                this.route.callback()
                cb()
            })
        })
    }

}