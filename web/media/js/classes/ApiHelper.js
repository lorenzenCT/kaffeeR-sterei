const axios = require("axios");
const querystring = require('node:querystring');

export class ApiHelper {

    constructor() { }

    // TODO change from node to browser js 

    async a(cb) {
        const url = "http://api.maltee.dev/api/v1/products.php"
        let post = querystring.stringify({ "user": "kaffee", "passcode": "DieBesteRöstereiInGanzLüneburgUndUmgebung" });
        let response = axios.post(url, post)
            .catch(function (error) {
                console.log(error);
            }).then(function (response) {
                //console.log(response.data.data);
                cb(response.data.data);
            });

    }

    async readAllProducts(cb) {
        const url = "http://api.maltee.dev/api/v1/products.php"
        let post = querystring.stringify(
            {
                "user": "kaffee",
                "passcode": "DieBesteRöstereiInGanzLüneburgUndUmgebung",
                "action": "read"
            }
        );
        let response = axios.post(url, post)
            .catch(function (error) {
                console.log(error);
            }).then(function (response) {
                //console.log(response.data.data);
                cb(response.data.data);
            });

    }
}