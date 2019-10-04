import Logger from "../Logger.js";

const GROUP = /^\[(.+)\]$/;
const VALUE = /^[^=]+=.*$/;
const COMMENT = /^;.*$/;

class INI {

    parse(input) {
        let output = {"":{}};
        let act = "";
        let lines = input.split(LNBR_SEQ);
        for(let i = 0; i < lines.length; ++i) {
            let line = lines[i];
            if(!line.length || COMMENT.test(line)) {
                continue;
            }
            if(GROUP.test(line)) {
                act = line.slice(1, -1);
                output[act] = output[act] || {};
                continue;
            }
            if(VALUE.test(line)) {
                let data = line.split("=");
                if (typeof output[act][data[0]] === "string") {
                    Logger.warn(`${file} - duplicate key at line ${i}: ${line}`, "FileLoader");
                }
                output[act][data[0]] = data[1];
                continue;
            }
            Logger.error((new Error(`${file} - parse error at line ${i}: ${line}`)), "FileLoader");
        }
        return output;
    }

}

export default new INI();