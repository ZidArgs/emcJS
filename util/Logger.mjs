const logs = [];

class Logger {

    error(message) {
        logs.push({
            type: "ERROR",
            time: (new Date).toLocaleString("DE"),
            message: message
        });
    }

    warn(message) {
        logs.push({
            type: "WARN",
            time: (new Date).toLocaleString("DE"),
            message: message
        });
    }

    info(message) {
        logs.push({
            type: "INFO",
            time: (new Date).toLocaleString("DE"),
            message: message
        });
    }

    log(message) {
        logs.push({
            type: "LOG",
            time: (new Date).toLocaleString("DE"),
            message: message
        });
    }

    message(type, message) {
        logs.push({
            type: type,
            time: (new Date).toLocaleString("DE"),
            message: message
        });
    }

    getLog(filter = []) {
        return logs.filter(v => !!(filter.indexOf(v.type)+1));
    }

}

export default new Logger;