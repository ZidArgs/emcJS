const FORMATTER_REGEX = /[YMDhmsz]/g;
const DATE = new WeakMap();

class DateUtil {

    constructor(date) {
        if (date instanceof Date) {
            DATE.set(this, date);
        } else {
            DATE.set(this, new Date);
        }
    }

    convert(formatter) {
        DateUtil.convert(formatter, DATE.get(this));
    }

    static convert(date, formatter) {
        if (typeof formatter == "undefined") {
            if (typeof date == "string") {
                formatter = date;
                date = new Date();
            } else if (date instanceof Date) {
                formatter = "D.M.Y h:m:s";
            } else {
                date = new Date;
                formatter = "D.M.Y h:m:s";
            }
        }
        return formatter.replace(FORMATTER_REGEX, function(m) {
            switch(m) {
                case "Y": return date.getFullYear();
                case "M": return ("0"+(date.getMonth()+1)).slice(-2);
                case "D": return ("0"+date.getDate()).slice(-2);
                case "h": return ("0"+date.getHours()).slice(-2);
                case "m": return ("0"+date.getMinutes()).slice(-2);
                case "s": return ("0"+date.getSeconds()).slice(-2);
                case "z": return ("00"+date.getMilliseconds()).slice(-2);
            }
        });
    }

}

export default DateUtil;