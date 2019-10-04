import XML from "./TextConverter/XML.js";
import INI from "./TextConverter/INI.js";
import Properties from "./TextConverter/Properties.js";

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

    json(file) {
        return getFile(file, "application/json").then(getJSON);
    }

    text(file) {
        return getFile(file, "text/plain").then(getText);
    }

    xml(file) {
        return this.text(file).then(XML.parse);
    }

    ini(file) {
        return this.text(file).then(INI.parse);
    }

    properties(file) {
        return this.text(file).then(Properties.parse);
    }

}

export default new FileLoader;
