const LNBR_SEQ = /(?:\r\n|\n|\r)/g;
const STRING = /("(?:[^"\\]|\\.)*")/;
const COMMENT_S = /\/\/.*\n/g;
const COMMENT_M = /\/\*.*?\*\//g;
const ALL_BUT_NL = /[^\r\n]/g;

// replace multiline comment
function repC(substr) {
    return substr.replace(ALL_BUT_NL, " ");
}

function removeComments(input) {
    if (input.startsWith('"')) {
        return input;
    }
    return input.replace(COMMENT_S, repC).replace(COMMENT_M, repC);
}

class JSONC {

    parse(input) {
        let buffer = input.split(STRING).map(removeComments).join("");
        try {
            return JSON.parse(buffer);
        } catch(e) {
            let pos = parseInt(e.message.slice(e.message.lastIndexOf(" ") + 1));
            let ref = input.split(LNBR_SEQ);
            let lines = buffer.split(LNBR_SEQ);
            console.log(ref);
            console.log(lines);
            for(let i = 0; i < lines.length; ++i) {
                console.log(pos);
                console.log(lines[i]);
                console.log(ref[i]);
                let line = lines[i] + "\n";
                if (pos < line.length) {
                    let p = pos;
                    let l = ref[i];
                    throw new SyntaxError(`Unexpected token in JSONC at line ${i + 1}:\n${l}\n${(new Array(pos + 1)).join(" ")}^`);
                } else {
                    pos -= line.length;
                }
            }
            throw new SyntaxError("Unexpected end of input in JSONC");
        }
    }

}

export default new JSONC();