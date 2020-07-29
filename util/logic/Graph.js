import NodeFactory from "../graph/NodeFactory.js";
import Compiler from "./Compiler.js";

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

function checkConditionRequirements(reached, required) {
    for (let i of required) {
        if (!reached.has(i)) {
            return false;
        }
    }
    return true;
}

const DIRTY = new WeakMap();
const NODES = new WeakMap();
const MEM_I = new WeakMap();
const MEM_O = new WeakMap();
const DEBUG = new WeakMap();

export default class Graph {

    constructor(debug = false) {
        DIRTY.set(this, false);
        NODES.set(this, new Map());
        MEM_I.set(this, new Map());
        MEM_O.set(this, new Map());
        DEBUG.set(this, !!debug);
    }

    loadEdges(config) {
        if (typeof config == "object" && !Array.isArray(config)) {
            let debug = DEBUG.get(this);
            let nodes = NODES.get(this);
            let mem_o = MEM_O.get(this);
            mem_o.clear();
            if (debug) {
                console.group("PROCESSOR LOGIC BUILD");
                console.time("build time");
            }
            for (let cfg in config) {
                let children = config[cfg];
                let node = NodeFactory.get(cfg);
                for (let child in children) {
                    let logic = children[child];
                    let fn = Compiler.compile(logic);
                    node.append(NodeFactory.get(child), fn);
                    if (!mem_o.has(child)) {
                        mem_o.set(child, false);
                    }
                }
                nodes.set(cfg, node);
            }
            if (debug) {
                console.timeEnd("build time");
                console.groupEnd("PROCESSOR LOGIC BUILD");
            }
            DIRTY.set(this, true);
        }
    }

    getEdges() {
        let nodes = NODES.get(this);
        let res = [];
        for (let name of nodes.keys()) {
            let children = nodes.get(name).getTargets();
            for (let ch of children) {
                res.push([name, ch]);
            }
        }
        return res;
    }

    getTargetNodes() {
        let nodes = NODES.get(this);
        let res = new Set();
        for (let name of nodes.keys()) {
            let node = nodes.get(name);
            let children = node.getTargets();
            for (let ch of children) {
                res.add(ch);
            }
        }
        return res;
    }

    /* broad search */
    traverse(startNode) {
        let reachableNodes = new Set();
        let changes = {};
        let nodes = NODES.get(this);
        let mem_o = MEM_O.get(this);
        let mem_i = MEM_I.get(this);
        let debug = DEBUG.get(this);
        let start = nodes.get(startNode);
        if (start != null) {
            if (debug) {
                console.group("GRAPH LOGIC EXECUTION");
                console.log("input", mapToObj(mem_i));
                console.log("traverse nodes...");
                console.time("execution time");
            }
            for (let n of mem_i.keys()) {
                if (!!mem_i.get(n)) {
                    reachableNodes.add(n);
                }
            }
            let val = valueGetter.bind(this, mem_i);
            let queue = [];
            queue.push(start);
            let changed = true;
            while(!!queue.length && !!changed) {
                changed = false;
                let counts = queue.length;
                while (!!counts--) {
                    let node = queue.shift();
                    reachableNodes.add(node.getName());
                    let targets = node.getTargets();
                    for (let ch of targets) {
                        let edge = node.getEdge(ch);
                        let condition = edge.getCondition();
                        if(!reachableNodes.has(ch)) {
                            if (checkConditionRequirements(reachableNodes, condition.requires)) {
                                if (condition(val)) {
                                    changed = true;
                                    queue.push(edge.getTarget());
                                } else {
                                    queue.push(node);
                                }
                            }
                        }
                    }
                }
            }
            DIRTY.set(this, false);
            for (let ch of this.getTargetNodes()) {
                let v = reachableNodes.has(ch);
                if (mem_o.get(ch) != v) {
                    mem_o.set(ch, v);
                    changes[ch] = v;
                }
            }
            if (debug) {
                console.log("success");
                console.timeEnd("execution time");
                console.log("output", mapToObj(mem_o));
                console.log("changes", changes);
                console.groupEnd("GRAPH LOGIC EXECUTION");
            }
        }
        return changes;
    }

    set(key, value) {
        let debug = DEBUG.get(this);
        if (debug) {
            console.group("GRAPH LOGIC MEMORY CHANGE");
            console.log("change", `${key} => ${value}`);
        }
        let mem_i = MEM_I.get(this);
        mem_i.set(key, value);
        if (debug) {
            console.groupEnd("GRAPH LOGIC MEMORY CHANGE");
        }
        DIRTY.set(this, true);
    }

    setAll(values) {
        let debug = DEBUG.get(this);
        if (debug) {
            console.group("GRAPH LOGIC MEMORY CHANGE");
            console.log("changes", values);
        }
        let mem_i = MEM_I.get(this);
        if (values instanceof Map) {
            values.forEach((v, k) => mem_i.set(k, v));
        } else if (typeof values == "object" && !Array.isArray(values)) {
            for (let k in values) {
                let v = values[k];
                mem_i.set(k, v);
            }
        }
        if (debug) {
            console.groupEnd("GRAPH LOGIC MEMORY CHANGE");
        }
        DIRTY.set(this, true);
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

    has(ref) {
        let mem_o = MEM_O.get(this);
        if (mem_o.has(ref)) {
            return true;
        }
        return false;
    }

    reset() {
        let mem_i = MEM_I.get(this);
        let mem_o = MEM_O.get(this);
        mem_i.clear();
        mem_o.clear();
        DIRTY.set(this, true);
    }

    isDirty() {
        return DIRTY.get(this);
    }

}