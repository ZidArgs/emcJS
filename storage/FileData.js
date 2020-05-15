import FileLoader from "../util/FileLoader.js";

const STORAGE = {};

class FileData {

    async json(files) {
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

    async jsonc(files) {
        let loading = [];
        for (let name in files) {
            let path = files[name];
            loading.push(FileLoader.jsonc(path).then(function(data) {
                STORAGE[name] = data;
            }).catch(function(err) {
                throw new Error(`error getting contents of file - ${path}; ${err.message}`);
            }));
        }
        await Promise.all(loading);
    }

    async ini(files) {
        let loading = [];
        for (let name in files) {
            let path = files[name];
            loading.push(FileLoader.ini(path).then(function(data) {
                STORAGE[name] = data;
            }).catch(function(err) {
                throw new Error(`error getting contents of file - ${path}; ${err.message}`);
            }));
        }
        await Promise.all(loading);
    }

    async properties(files) {
        let loading = [];
        for (let name in files) {
            let path = files[name];
            loading.push(FileLoader.properties(path).then(function(data) {
                STORAGE[name] = data;
            }).catch(function(err) {
                throw new Error(`error getting contents of file - ${path}; ${err.message}`);
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