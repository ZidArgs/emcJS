import JSONC from "./converter/JSONC.js";
import XML from "./converter/XML.js";
import INI from "./converter/INI.js";
import Properties from "./converter/Properties.js";

async function getFile(file, contentType) {
    let r = await fetch(new Request(file, {
        method: 'GET',
        headers: new Headers({
            "Content-Type": contentType,
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        }),
        mode: 'cors',
        cache: 'default'
    }));
    if (r.status < 200 || r.status >= 300) {
        throw new Error(`error loading file "${file}" - status: ${r.status}`);
    }
    return r;
}

function getText(input) {
    return input.text();
}

function getJSON(input) {
    return input.json();
}

class FileLoader {

    text(file) {
        return getFile(file, "text/plain").then(getText);
    }

    json(file) {
        return getFile(file, "application/json").then(getJSON);
    }

    jsonc(file) {
        return getFile(file).then(getText).then(JSONC.parse);
    }

    xml(file) {
        return this.text(file).then(getText).then(XML.parse);
    }

    ini(file) {
        return this.text(file).then(getText).then(INI.parse);
    }

    properties(file) {
        return this.text(file).then(getText).then(Properties.parse);
    }

}

export default new FileLoader;
