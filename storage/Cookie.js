class Cookie {
    
    set(name, value, expire = 1) {
        var d = new Date();
        d.setTime(d.getTime() + (expire * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
    }
    
    get(name) {
        var entries = document.cookie.split(';');
        for (let entry of entries) {
            let [key, value] = entry.trim().split("=");
            if (key == name) {
                return value;
            }
        }
        return "";
    }

    delete(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }

}

export default new Cookie();