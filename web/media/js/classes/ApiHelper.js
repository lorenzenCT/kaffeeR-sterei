/* const axios = require("axios");
const querystring = require('node:querystring'); */

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
        var params = new Object();
        params.user = "kaffee";
        params.passcode = "DieBesteRöstereiInGanzLüneburgUndUmgebung";
        params.action = "read";
        // CRUD available

        // Turn the data object into an array of URL-encoded key/value pairs.
        let urlEncodedData = "", urlEncodedDataPairs = [], name;
        for (name in params) {
            urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(params[name]));
        }

        var http = new XMLHttpRequest();
        const url = "https://api.maltee.dev/api/v1/products.php";
        var params_string = urlEncodedDataPairs.toString();
        params_string = params_string.replaceAll(',', '&');
        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                cb(http.responseText);
            }
        }
        http.send(params_string);




    }
}