import Logger from "./Logger.js";

const VALUE = /^(?:([^=]+?) *=|([^:]+?) *:|([^ ]+)) *(.+?) *$/;
const COMMENT = /^(?:!|#).*$/;

class Properties {

    parse(input) {
        let output = {};
        let lines = input.split(LNBR_SEQ);
        for(let i = 0; i < lines.length; ++i) {
            let line = lines[i];
            if(!line.length || COMMENT.test(line)) {
                continue;
            }
            let data = VALUE.exec(line);
            if(!!data) {
                let key = data[1] || data[2] || data[3];
                if (typeof output[key] === "string") {
                    Logger.warn(`${file} - duplicate key at line ${i}: ${line}`, "FileLoader");
                }
                output[key] = data[4];
                while (output[key].endsWith("\\")) {
                    output[key] += lines[++i].trim();
                }
                continue;
            }
            Logger.error((new Error(`${file} - parse error at line ${i}: ${line}`)), "FileLoader");
        }
        return output;
    }

}

export default new Properties();