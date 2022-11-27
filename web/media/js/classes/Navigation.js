import { Router } from "./Router.js"



export class Navigation {

    /**
     * 
     * @param {*} routename - wished to be loaded route straight away
     */
    constructor(routename, routes = {}) {
        this.router = new Router();
        this.routes = routes;

        if (typeof routename === "string") {
            const route = this.getRouteByName(routename);
            if (route) {
                this.load(route, () => {
                    this.initAnchorElements();
                });
            } else {
                throw new Error("No such route", route)
            }
        } else {
            throw new Error("Route must be a string")
        }
    }

    initAnchorElements() {
        document.querySelectorAll("a")
            .forEach((elem) => {
                if (elem.getAttribute("data-routename")) {
                    const routename = elem.getAttribute("data-routename");
                    const route = this.getRouteByName(routename);
                    elem.addEventListener("click", (event) => {
                        event.preventDefault()
                        event.stopImmediatePropagation()

                        this.setAllInactive();
                        this.setActive(route);
                        this.load(route, {});
                    });
                }
            });
    }

    static getRoutes() {
        return routes;
    }

    parseRoute(route) {
        const a = route.split("/")
        return a[a.length - 1].split(".html")[0];
    }

    getRouteByName(routename) {
        let route;
        for (const [key, value] of Object.entries(this.routes)) {
            if (key === routename) {
                route = value;
                return route;
            }
        }
        return null;
    }

    setActive(route) {
        const navElem = route["nav-element"];

        if (navElem) {
            navElem.classList.add("active");
        }

        return this;
    }

    setAllInactive() {
        document.querySelectorAll("a.active")
            .forEach(elem => elem.classList.remove("active"));

        return this;
    }

    load(route, cb) {
        this.router.readFile({
            file: route.path,
            cb: (data) => {
                this.router.switchContent({
                    newContent: data, file: route.name, delay: 0, animation: "default", cb: () => {
                        route.callback()
                        if (typeof cb === 'function') cb();

                        if (route.scripts) {
                            if (typeof route.scripts === "string") {
                                var script = document.createElement('script');
                                script.src = route.scripts;
                            }
                        }
                    }
                })
            }


        });
    }

}