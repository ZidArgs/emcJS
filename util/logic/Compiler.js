let dependencies = null;

function escape(str, def = "") {
    if (typeof str != "string") {
        if (typeof str == "number" && !isNaN(str)) {
            return str;
        }
        return def;
    }
    let res = str.replace(/[\\"]/g, '\\$&');
    dependencies.add(res);
    return res;
}

function toNumber(val) {
    return `(parseInt(${val})||0)`
}

function twoElementOperation(els, join) {
    if (els.length == 0) {
        return 0;
    }
    if (els.length == 1) {
        return buildLogic(els[0]);
    }
    return `(${buildLogic(els[0])}${join}${buildLogic(els[1])})`;
}

function buildLogic(logic) {
    if (typeof logic == "object") {
        switch (logic.type) {
            default: return "0";
            /* literals */
            case 'true': return "1";
            case 'false': return "0";
            case 'number': return `(val("${escape(logic.el)}")||0)`;
            case 'pointer': return `(val(val("${escape(logic.el)}")||"")||0)`;
            case 'value': return `(val("${escape(logic.el)}")||"")=="${escape(logic.value)}"`;
            /* operators */
            case 'and': return `(${logic.el.map(buildLogic).join("&&")||0})`;
            case 'nand': return `!(${logic.el.map(buildLogic).join("&&")||0})`;
            case 'or': return `(${logic.el.map(buildLogic).join("||")||0})`;
            case 'nor': return `!(${logic.el.map(buildLogic).join("||")||0})`;
            case 'not': return `!(${buildLogic(logic.el[0])})`;
            case 'xor': return twoElementOperation(logic.el, "^");
            /* restrictors */
            case 'min': return `(${buildLogic(logic.el)}>=${escape(logic.value, 0)})`;
            case 'max': return `(${buildLogic(logic.el)}<=${escape(logic.value, 0)})`;
            /* comparators */
            case 'eq': return twoElementOperation(logic.el, "==");
            case 'neq': return twoElementOperation(logic.el, "!=");
            case 'lt': return twoElementOperation(logic.el, "<");
            case 'lte': return twoElementOperation(logic.el, "<=");
            case 'gt': return twoElementOperation(logic.el, ">");
            case 'gte': return twoElementOperation(logic.el, ">=");
            /* math */
            case 'add': return `(${logic.el.map(buildLogic).map(toNumber).join("+")||0})`;
            case 'sub': return `(${logic.el.map(buildLogic).map(toNumber).join("-")||0})`;
            // TODO add more types
        }
    }
    return buildLogic({type:logic});
}

class Compiler {

    compile(logic) {
        dependencies = new Set();
        let buf = buildLogic(logic);
        let fn = new Function('val', `return ${buf}`);
        Object.defineProperty(fn, 'requires', {value: dependencies});
        return fn;
    }

}

export default new Compiler;