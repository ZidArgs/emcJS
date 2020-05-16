import FileLoader from "../util/FileLoader.js";

const STORAGE = {};

class FileData {

    async load(files) {
        let loading = [];
        for (let name in files) {
            let path = files[name];
            let type = "text";
            if (typeof path == "object") {
                type = path.type;
                path = path.path;
            }
            if (typeof FileLoader[type] != "function") {
                throw new TypeError(`Unknown file type "${type}" for entry "${name}"`);
            }
            if (typeof path != "string" || path == "") {
                throw new Error(`no path specified for entry "${name}"`);
            }
            loading.push(FileLoader[type](path).then(function(data) {
                STORAGE[name] = data;
            }).catch(function(err) {
                throw new Error(`error getting contents of file - ${path}:\n${err.message}`);
            }));
        }
        await Promise.all(loading);
    }

    get(path, value = null) {
        let sp = path.split("/");
        let data = STORAGE;
        while (!!sp.length) {
            let ref = sp.shift();
            if (typeof data == "object") {
                if (data.hasOwnProperty(ref)) {
                    data = data[ref];
                } else {
                    return value;
                }
            }
        }
        if (data != null) {
            return JSON.parse(JSON.stringify(data));
        }
        return value;
    }

}

export default new FileData;