
/* LEVEL COLORS HTML */
const HTML_DEFAULT_STYLES = {
    SEVERE: {
        "background": "#860000",
        "color": "#ffffff"
    },
    ERROR: {
        "background": "#222222",
        "color": "#ff3e3e"
    },
    WARN: {
        "background": "#222222",
        "color": "#ffff00"
    },
    INFO: {
        "background": "#222222",
        "color": "#00ceff"
    },
    LOG: {
        "background": "#222222",
        "color": "#00ff00"
    }
};
const HTML_DEFAULT_UNSET = {
    "background": "#222222",
    "color": "#dddddd"
};

/* LEVEL COLORS CONSOLE */
const CONSOLE_DEFAULT_UNSET_STYLES = {
    SEVERE: "background:#860000;color:#ffffff;",
    ERROR: "background:#ffffff;color:#ff0000;",
    WARN: "background:#ffffff;color:#dd5500;",
    INFO: "background:#ffffff;color:#0000ff;",
    LOG: "background:#ffffff;color:#008800;"
};
const CONSOLE_DEFAULT_UNSET = "background:#ffffff;color:#333333;";

/* LOG LEVEL */
const LEVEL = Object.freeze({
    SEVERE: "SEVERE",
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    LOG: "LOG"
});

// TODO add function to set colors per output

const TIME_FND = /(....)-(..)-(..)T(..:..:..\....)Z/;
const TIME_REP = "$3.$2.$1-$4";

let output = new Set;
let level = new Set(["ERROR", "WARN", "INFO", "LOG"]);

function write(data) {
    if (!!output.size && level.has(data.type)) {
        let msg;
        if (data.message instanceof Error) {
            msg = `[ ${data.type} | ${data.time} ] <${data.target}> ${data.message.message}\n${data.message.stack}`;
        } else {
            msg = `[ ${data.type} | ${data.time} ] <${data.target}>\n${data.message}`;
        }
        Array.from(output).forEach(function(out) {
            if (out instanceof HTMLTextAreaElement) {
                out.value += msg+"\n";
                out.scrollTop = out.scrollHeight;
            } else if (out instanceof HTMLElement) {
                let el = document.createElement('span');
                if (HTML_DEFAULT_STYLES.hasOwnProperty(data.type)) {
                    for (let i in HTML_DEFAULT_STYLES[data.type]) {
                        el.style[i] = HTML_DEFAULT_STYLES[data.type][i];
                    }
                } else {
                    for (let i in HTML_DEFAULT_UNSET) {
                        el.style[i] = HTML_DEFAULT_UNSET[i];
                    }
                }
                el.append(document.createTextNode(msg));
                out.append(el);
                out.scrollTop = out.scrollHeight;
            } else if (output === console) {
                console.log("%c%s%c", CONSOLE_DEFAULT_UNSET_STYLES[data.type] || CONSOLE_DEFAULT_UNSET, msg, "");
            }
        });
    }
}

class Logger {

    static get LEVEL() {
        return LEVEL;
    }

    constructor() {
        window.addEventListener("error", function(msg, url, line, col, error) {
            if (msg instanceof ErrorEvent) {
                write({
                    target: `${!!msg.filename?msg.filename:"anonymous"} ${msg.lineno}:${msg.colno}`,
                    type: LEVEL.SEVERE,
                    time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
                    message: !!msg.error ? msg.error : msg.message
                });
            } else {
                write({
                    target: `${url} ${line}${!!col?":"+col:""}`,
                    type: LEVEL.SEVERE,
                    time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
                    message: `${msg}${!!error?"\n"+error:""}`
                });
            }
            return true;
         });
    }

    error(message, target = null) {
        write({
            target: target,
            type: LEVEL.ERROR,
            time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
            message: message
        });
    }

    warn(message, target = null) {
        write({
            target: target,
            type: LEVEL.WARN,
            time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
            message: message
        });
    }

    info(message, target = null) {
        write({
            target: target,
            type: LEVEL.INFO,
            time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
            message: message
        });
    }

    log(message, target = null) {
        write({
            target: target,
            type: LEVEL.LOG,
            time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
            message: message
        });
    }

    message(type, message, target = null) {
        write({
            target: target,
            type: type,
            time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
            message: message
        });
    }

    addLevel(value) {
        level.add(value);
    }

    removeLevel(value) {
        level.delete(value);
    }

    addOutput(value) {
        output.add(value);
    }

    removeOutput(value) {
        output.delete(value);
    }

}

export default new Logger;