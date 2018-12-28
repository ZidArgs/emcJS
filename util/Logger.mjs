const STYLES = {
    "SEVERE": {
        "backgroundColor": "#860000",
        "color": "#ffffff"
    },
    "ERROR": {
        "color": "#ff3e3e"
    },
    "WARN": {
        "color": "#ffff00"
    },
    "INFO": {
        "color": "#00ceff"
    },
    "LOG": {
        "color": "#00ff00"
    }
};

const TIME_FND = /(....)-(..)-(..)T(..:..:..\....)Z/;
const TIME_REP = "$3.$2.$1-$4";
const logs = [];
let output = null;

function write(data) {
    logs.push(data);
    if (!output) return;
    let message = data.message;
    if (message instanceof Error) {
        message = message.stack;
    } 
    let msg = `[ ${data.type} | ${data.time} ] <${data.target}> ${message}`;
    if (output instanceof HTMLTextAreaElement) {
        output.value += msg+"\n";
        output.scrollTop = output.scrollHeight;
    } else if (output instanceof HTMLDivElement) {
        let el = document.createElement('span');
        if (STYLES.hasOwnProperty(data.type)) {
            for (let i in STYLES[data.type]) {
                el.style[i] = STYLES[data.type][i];
            }
        }
        el.appendChild(document.createTextNode(msg));
        output.appendChild(el);
        output.scrollTop = output.scrollHeight;
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
                    message: `${msg.message}${!!error?"\n"+error.stack:""}`
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

    getLog(filter = ["ERROR", "WARN", "INFO", "LOG"]) {
        return logs.filter(v => !!(filter.indexOf(v.type)+1));
    }

    setOutput(el) {
        output = el;
    }

}

export default new Logger;