import "./LiteralFalse.js";
import "./LiteralTrue.js";
import "./LiteralNumber.js";
import "./LiteralValue.js";
import "./AbstractElement.js";
import "./OperatorAnd.js";
import "./OperatorMax.js";
import "./OperatorMin.js";
import "./OperatorNand.js";
import "./OperatorNor.js";
import "./OperatorNot.js";
import "./OperatorOr.js";
import "./OperatorXor.js";
import AbstractElement from "./AbstractElement.js";

const LOGICS = new WeakMap();
const VALUES = new WeakMap();
const VALUES_REGEX = /values.get\("([^"]+)"\)/g;

window.logicProcessors = [];

export default class Processor {

    constructor() {
        LOGICS.set(this, new Map());
        VALUES.set(this, new Map());
        window.logicProcessors.push(this);
    }
    
    loadLogic(logic) {
        if (typeof logic == "object" && !Array.isArray(logic)) {
            let logics = LOGICS.get(this);
            let values = VALUES.get(this);
            console.time("logic build");
            for (let name in logic) {
                if (logic[name] == null) {
                    logics.delete(name);
                    values.delete(name);
                } else {
                    let fn = buildLogic(logic[name]);
                    Object.defineProperty(fn, 'name', {value: name});
                    logics.set(name, fn);
                    values.set(name, false);
                }
            }
            sortLogic(logics);
            console.timeEnd("logic build");
            return this.execute();
        }
    }

    execute(state = {}) {
        console.group("LOGIC EXECUTION");
        console.log("input", state);
        console.time("logic exec");
        let logics = LOGICS.get(this);
        let values = VALUES.get(this);
        let buffer = new Map(Object.entries(state));
        let res = {};
        logics.forEach((v, k) => {
            let r = !!v(buffer);
            buffer.set(k, r);
            if (r != values.get(k)) {
                values.set(k, r);
                res[k] = r;
            }
        });
        console.log("output", res);
        console.timeEnd("logic exec");
        console.groupEnd("LOGIC EXECUTION");
        return res;
    }

    getValues() {
        let values = VALUES.get(this);
        let obj = {};
        values.forEach((v,k) => {obj[k] = v});
        return obj;
    }

    getValue(ref) {
        let values = VALUES.get(this);
        if (values.has(ref)) {
            return values.get(ref);
        }
        return false;
    }

}

function sortLogic(logics) {
    let logic_old = new Map(logics);
    logics.clear();
    let len = 0;
    while (!!logic_old.size && logic_old.size != len) {
        len = logic_old.size;
        next_rule:
        for (let rule of logic_old) {
            for (let i of rule[1].requires) {
                if (logic_old.has(i)) {
                    continue next_rule;
                }
            }
            logics.set(rule[0], rule[1]);
            logic_old.delete(rule[0]);
        }
    }
    if (logic_old.size > 0) {
        console.error("LOOPS");
    }
}

function buildLogic(logic) {
    let buf = AbstractElement.buildLogic(logic);
    let req = new Set();
    while (true) {
        let m = VALUES_REGEX.exec(buf);
        if (m == null) break;
        req.add(m[1]);
    }
    let fn = new Function('values', `return ${buf}`);
    Object.defineProperty(fn, 'requires', {value: req});
    return fn;
}