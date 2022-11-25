export class CookieHelper {
    // https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
    // https://www.quirksmode.org/js/cookies.html

    constructor() {

    }
    setCookie(name,value,days) {
        let expires = "";
        if (days) {
            let date = new Date();
            // date.setTime(date.getTime() + (days*24*60*60*1000));
            date.setDate(date.getDate() + days);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    checkCookie() {
        let x = this.getCookie('bleeckerStreet');
        if (x) {
            console.log(x);
        } else {
            // Cookie setzen
            this.setCookie('bleeckerStreet','visited',365);
        }
    }
}



