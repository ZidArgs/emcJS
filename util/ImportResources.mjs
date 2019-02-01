function importHTML(url) {
    return fetch(url)
            .then(r => r.text())
            .then(r => (new DOMParser()).parseFromString(r, "text/html"))
            .then(r => r.body.childNodes);
}

function importImg(url) {
    return new Promise((res, rej) => {
        let t = new Image();
        t.onload = e => res(t);
        t.onerror = rej;
        t.src = url;
        document.head.appendChild(t);
    });
}

function importCSS(url) {
    return new Promise((res, rej) => {
        let t = document.createElement("link");
        t.rel = "stylesheet";
        t.type = "text/css";
        t.onload = e => res(t);
        t.onerror = rej;
        t.href = url;
        document.head.appendChild(t);
    });
}

function importScript(url) {
    return new Promise((res, rej) => {
        let t = document.createElement("script");
        t.type = "text/javascript";
        t.onload = e => res(t);
        t.onerror = rej;
        t.src = url;
        document.head.appendChild(t);
    });
}

function importModule(url) {
    return new Promise((res, rej) => {
        let t = document.createElement("script");
        t.type = "module";
        t.onload = e => res(t);
        t.onerror = rej;
        t.src = url;
        document.head.appendChild(t);
    });
}

export {importHTML, importImg, importCSS, importScript, importModule};