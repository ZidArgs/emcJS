const STYLES = {
    "SEVERE": {
        "background": "#860000",
        "color": "#ffffff"
    },
    "ERROR": {
        "background": "#222222",
        "color": "#ff3e3e"
    },
    "WARN": {
        "background": "#222222",
        "color": "#ffff00"
    },
    "INFO": {
        "background": "#222222",
        "color": "#00ceff"
    },
    "LOG": {
        "background": "#222222",
        "color": "#00ff00"
    }
};

const CONSOLE_STYLES = {
    "SEVERE": "background:#860000;color:#ffffff;",
    "ERROR": "background:#ffffff;color:#ff0000;",
    "WARN": "background:#ffffff;color:#dd5500;",
    "INFO": "background:#ffffff;color:#0000ff;",
    "LOG": "background:#ffffff;color:#008800;"
};

const TIME_FND = /(....)-(..)-(..)T(..:..:..\....)Z/;
const TIME_REP = "$3.$2.$1-$4";

let output = new Set;
let level = new Set(["ERROR", "WARN", "INFO", "LOG"]);

function write(data) {
    if (!!output.size && level.has(data.type)) {
        Array.from(output).forEach(function(out) {
            let msg;
            if (data.message instanceof Error) {
                msg = `[ ${data.type} | ${data.time} ] <${data.target}> ${data.message.message}\n${data.message.stack}`;
            } else {
                msg = `[ ${data.type} | ${data.time} ] <${data.target}>\n${data.message}`;
            }
            if (out instanceof HTMLTextAreaElement) {
                out.value += msg+"\n";
                out.scrollTop = out.scrollHeight;
            } else if (out instanceof HTMLDivElement) {
                let el = document.createElement('span');
                if (STYLES.hasOwnProperty(data.type)) {
                    for (let i in STYLES[data.type]) {
                        el.style[i] = STYLES[data.type][i];
                    }
                }
                el.appendChild(document.createTextNode(msg));
                out.appendChild(el);
                out.scrollTop = out.scrollHeight;
            } else if (out === console) {
                out.log("%c%s%c", CONSOLE_STYLES[data.type] || "", msg, "");
            }
        });
    }
    if (data.type == "SEVERE" && (!level.has("SEVERE") || !output.has(console))) {
        let msg;
        if (data.message instanceof Error) {
            msg = `[ ${data.type} | ${data.time} ] <${data.target}> ${data.message.message}\n${data.message.stack}`;
        } else {
            msg = `[ ${data.type} | ${data.time} ] <${data.target}>\n${data.message}`;
        }
        console.error(msg);
    }
}

class Logger {

    constructor() {
        window.addEventListener("error", function(msg, url, line, col, error) {
            if (msg instanceof ErrorEvent) {
                write({
                    target: `${!!msg.filename?msg.filename:"anonymous"} ${msg.lineno}:${msg.colno}`,
                    type: "SEVERE",
                    time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
                    message: !!msg.error ? msg.error : msg.message
                });
            } else {
                write({
                    target: `${url} ${line}${!!col?":"+col:""}`,
                    type: "SEVERE",
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
            type: "ERROR",
            time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
            message: message
        });
    }

    warn(message, target = null) {
        write({
            target: target,
            type: "WARN",
            time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
            message: message
        });
    }

    info(message, target = null) {
        write({
            target: target,
            type: "INFO",
            time: (new Date).toJSON().replace(TIME_FND, TIME_REP),
            message: message
        });
    }

    log(message, target = null) {
        write({
            target: target,
            type: "LOG",
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