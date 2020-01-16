export default class EscapedMap extends Map {

    get(key) {
        let value = super.get(key);
        if (typeof value == "string") {
            return value.replace(/\\/g, '\\\\').replace(/"/g, '\"');
        }
        return value;
    }

}