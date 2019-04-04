const PARSER = new DOMParser();

async function getFile(url) {
    let r = await fetch(url);
    if (r.status < 200 || r.status >= 300) {
        throw new Error(`error loading file "${url}" - status: ${r.status}`);
    }
    return r;
}

function importHTML(url) {
    return getFile(url)
        .then(r => r.text())
        .then(r => PARSER.parseFromString(r, "text/html"))
        .then(r => r.body.childNodes);
}

function importImage(url) {
    return new Promise((res, rej) => {
        let t = new Image();
        t.onload = function() {
            res(t);
        };
        t.onerror = function() {
            getFile(url).then(function() {
                rej(`error appending image "${url}"`);
            }, function(r) {
                rej(r);
            })
        };
        t.src = url;
        document.head.appendChild(t);
    });
}

function importStyle(url) {
    return new Promise((res, rej) => {
        let t = document.createElement("link");
        t.rel = "stylesheet";
        t.type = "text/css";
        t.onload = function() {
            res(t);
        };
        t.onerror = function() {
            getFile(url).then(function() {
                rej(`error appending style "${url}"`);
            }, function(r) {
                rej(r);
            })
        };
        t.href = url;
        document.head.appendChild(t);
    });
}

function importScript(url) {
    return new Promise((res, rej) => {
        let t = document.createElement("script");
        t.type = "text/javascript";
        t.onload = function() {
            res(t);
        };
        t.onerror = function() {
            getFile(url).then(function() {
                rej(`error appending script "${url}"`);
            }, function(r) {
                rej(r);
            })
        };
        t.src = url;
        document.head.appendChild(t);
    });
}

function importModule(url) {
    return new Promise((res, rej) => {
        let t = document.createElement("script");
        t.type = "module";
        t.onload = function() {
            res(t);
        };
        t.onerror = function() {
            getFile(url).then(function() {
                rej(`error appending module "${url}"`);
            }, function(r) {
                rej(r);
            })
        };
        t.src = url;
        document.head.appendChild(t);
    });
}

export {importHTML, importImage, importStyle, importScript, importModule};