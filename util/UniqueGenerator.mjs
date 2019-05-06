const APP_ID_CNT = new Map;

class UniqueGenerator {

    uuid4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    uniqueKey(len = 32) {
        let res = "";
        let rnd = crypto.getRandomValues(new Uint8Array(len));
        rnd.forEach(function (v) { res += v.toString(36).slice(-1) });
        return res;
    }

    appUID(prefix = "unique-id", len = 10) {
        if (APP_ID_CNT.has(prefix)) {
            let c = APP_ID_CNT.get(prefix)+1;
            APP_ID_CNT.set(prefix, c);
            c = `${new Array(len).join("0")}${c}`.slice(-len);
            return `${prefix}-${c}`;
        } else {
            APP_ID_CNT.set(prefix, 0);
            return `${prefix}-${new Array(len).join("0")}0`;
        }
    }

}

export default new UniqueGenerator;