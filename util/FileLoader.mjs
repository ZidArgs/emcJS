import Logger from "./Logger.mjs";

const LNBR_SEQ = /(?:\r\n|\n|\r)/g;
const INI_GRP = /^\[(.+)\]$/;
const INI_VAL = /^[^=]+=[^=]*$/;

class FileLoader {

    json(file) {
        return fetch(new Request(file, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            }),
            mode: 'cors',
            cache: 'default'
        })).then(r => r.json());
    }

    text(file) {
        return fetch(new Request(file, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "text/plain",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            }),
            mode: 'cors',
            cache: 'default'
        })).then(r => r.text());
    }

    ini(file) {
        return fetch(new Request(file, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "text/plain",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            }),
            mode: 'cors',
            cache: 'default'
        })).then(r => r.text()).then(r => {
            let res = {"":{}};
            let act = "";
            let lines = r.split(LNBR_SEQ);
            for(let i = 0; i < lines.length; ++i) {
                var line = lines[i];
                if(line.startsWith(";") || !line.length) {
                    continue;
                }
                if(INI_GRP.test(line)) {
                    act = line.slice(1, -1);
                    res[act] = res[act] || {};
                    continue;
                }
                if(INI_VAL.test(line)) {
                    var data = line.split("=");
                    if (typeof res[act][data[0]] === "string") {
                        Logger.warn(`${file} - duplicate key at line ${i}: ${line}`, "FileLoader");
                    }
                    res[act][data[0]] = data[1];
                    continue;
                }
                Logger.error((new Error(`${file} - parse error at line ${i}: ${line}`)), "FileLoader");
                break;
            }
            return res;
        });
    }

}

export default new FileLoader;

