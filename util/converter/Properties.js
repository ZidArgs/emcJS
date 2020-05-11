const LNBR_SEQ = /(?:\r\n|\n|\r)/g;
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
                    throw new SyntaxError(`Duplicate key in Properties at line ${i + 1}: ${line}`);
                }
                output[key] = data[4];
                while (output[key].endsWith("\\")) {
                    output[key] += lines[++i].trim();
                }
                continue;
            }
            throw new SyntaxError(`Unexpected token in Properties at line ${i + 1}: ${line}`);
        }
        return output;
    }

}

export default new Properties();