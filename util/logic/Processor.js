import AbstractElement from "./elements/AbstractElement.js";
import "./elements/LiteralFalse.js";
import "./elements/LiteralTrue.js";
import "./elements/LiteralNumber.js";
import "./elements/LiteralValue.js";
import "./elements/OperatorAnd.js";
import "./elements/OperatorMax.js";
import "./elements/OperatorMin.js";
import "./elements/OperatorNand.js";
import "./elements/OperatorNor.js";
import "./elements/OperatorNot.js";
import "./elements/OperatorOr.js";
import "./elements/OperatorXor.js";

function sortLogic(logic) {
    let value_old = new Map(logic);
    logic.clear();
    let len = 0;
    while (!!value_old.size && value_old.size != len) {
        len = value_old.size;
        next_rule:
        for (let rule of value_old) {
            for (let i of rule[1].requires) {
                if (value_old.has(i)) {
                    continue next_rule;
                }
            }
            logic.set(rule[0], rule[1]);
            value_old.delete(rule[0]);
        }
    }
    if (value_old.size > 0) {
        console.error("LOOPS");
    }
}

function buildLogic(value) {
    let buf = AbstractElement.buildLogic(value);
    let fn = new Function('val', `return ${buf}`);
    Object.defineProperty(fn, 'requires', {value: buf.getDependency()});
    return fn;
}

function mapToObj(map) {
    let res = {};
    map.forEach((v, k) => {
        res[k] = v;
    });
    return res;
}

function valueGetter(mem, key) {
    if (mem.has(key)) {
        return mem.get(key);
    }
}

const LOGIC = new WeakMap();
const MEM_I = new WeakMap(); // open mem_iory
const MEM_O = new WeakMap(); // internal mem_iory

export default class Processor {

    constructor() {
        LOGIC.set(this, new Map());
        MEM_I.set(this, new Map());
        MEM_O.set(this, new Map());
    }
    
    loadLogic(value) {
        if (typeof value == "object" && !Array.isArray(value)) {
            let logic = LOGIC.get(this);
            let mem_o = MEM_O.get(this);
            console.time("value build");
            for (let name in value) {
                if (value[name] == null) {
                    logic.delete(name);
                    mem_o.delete(name);
                } else {
                    let fn = buildLogic(value[name]);
                    Object.defineProperty(fn, 'name', {value: name});
                    logic.set(name, fn);
                    mem_o.set(name, false);
                }
            }
            sortLogic(logic);
            console.timeEnd("value build");
            this.execute();
        }
    }

    setLogic(name, value) {
        let logic = LOGIC.get(this);
        if (typeof value == "undefined" || value == null) {
            logic.delete(name);
            mem_o.delete(name);
        } else {
            let fn = buildLogic(value);
            Object.defineProperty(fn, 'name', {value: name});
            logic.set(name, fn);
            mem_o.set(name, false);
        }
    }

    execute() {
        let res = {};
        let logic = LOGIC.get(this);
        let mem_i = MEM_I.get(this);
        let mem_o = MEM_O.get(this);
        console.group("LOGICIC EXECUTION");
        console.log("input", mem_i);
        console.time("execution time");
        let val = valueGetter.bind(this, mem_i);
        logic.forEach((v, k) => {
            let r = !!v(val);
            mem_i.set(k, r);
            if (r != mem_o.get(k)) {
                mem_o.set(k, r);
                res[k] = r;
            }
        });
        console.log("state", mapToObj(mem_i));
        console.log("changes", res);
        console.timeEnd("execution time");
        console.groupEnd("LOGICIC EXECUTION");
        return res;
    }

    set(key, value) {
        let mem_i = MEM_I.get(this);
        mem_i.set(key, value);
    }

    setAll(values) {
        let mem_i = MEM_I.get(this);
        if (values instanceof Map) {
            values.forEach((v, k) => mem_i.set(k, v));
        } else if (typeof values == "object" && !Array.isArray(values)) {
            for (let k in values) {
                let v = values[k];
                mem_i.set(k, v);
            }
        }
    }

    get(ref) {
        let mem_o = MEM_O.get(this);
        if (mem_o.has(ref)) {
            return mem_o.get(ref);
        }
        return false;
    }

    getAll() {
        let mem_o = MEM_O.get(this);
        let obj = {};
        mem_o.forEach((v,k) => {obj[k] = v});
        return obj;
    }

}