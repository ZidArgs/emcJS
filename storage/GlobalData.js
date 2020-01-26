import FileLoader from "../util/FileLoader.js";

const STORAGE = {};

class GlobalData {

    async load(files) {
        let loading = [];
        for (let name in files) {
            let path = files[name];
            loading.push(FileLoader.json(path).then(function(data) {
                STORAGE[name] = data;
            }).catch(function(err) {
                throw new Error(`error getting contents of file - ${path}; ${err.message}`);
            }));
        }
        await Promise.all(loading);
    }

    get(name, def = null) {
        let path = name.split("/");
        let data = STORAGE;
        while (!!path.length) {
            let ref = path.shift();
            if (data.hasOwnProperty(ref)) {
                data = data[ref];
            } else {
                return def;
            }
        }
        if (typeof data == "undefined") {
            return def;
        }
        return data;
    }

}

export default new GlobalData;