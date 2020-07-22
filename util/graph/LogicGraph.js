import NodeFactory from "./NodeFactory.js";
import Compiler from "../logic/Compiler.js";

const NODES = new WeakMap();
const MEM_I = new WeakMap();
const MEM_O = new WeakMap();

export default class AccessGraph {

    constructor() {
        NODES.set(this, new Map());
    }

    load(config) {
        let nodes = NODES.get(this);
        for (let cfg in config) {
            let children = config[cfg];
            let node = NodeFactory.get(cfg);
            for (let child in children) {
                let logic = children[child];
                let fn = Compiler.compile(logic);
                node.append(NodeFactory.get(child), fn);
            }
            nodes.set(cfg, node);
        }
    }

    getEdges() {
        let nodes = NODES.get(this);
        let res = [];
        for (let name of nodes.keys()) {
            let children = nodes.get(name).children();
            for (let ch of children) {
                res.push([name, ch.name]);
            }
        }
        return res;
    }

    /* broad search */
    traverse(startNode) {
        let reachableNodes = new Set();
        let queue = [];
        queue.push(NODES.get(this).get(startNode));
        let changed = true;
        while(!!queue.length && !!changed) {
            changed = false;
            let counts = queue.length;
            while (!!counts--) {
                let node = queue.shift();
                reachableNodes.add(node.getName())
                for (let ch in node.getTargets()) {
                    let edge = node.getEdge(ch);
                    let condition = edge.getCondition();
                    if(!reachableNodes.has(ch)) {

                        // TODO calculate edge traversial

                        let res = callback(node, child, condition);
                        if (res == child) {
                            changed = true;
                            queue.push(child);
                        } else if (res == node) {
                            queue.push(node);
                        }
                    }
                }
            }
        }
        return reachableNodes;
    }

    set(key, value) {
        let debug = DEBUG.get(this);
        if (debug) {
            console.group("LOGIC MEMORY CHANGE");
            console.log("change", `${key} => ${value}`);
        }
        let mem_i = MEM_I.get(this);
        mem_i.set(key, value);
        if (debug) {
            console.groupEnd("LOGIC MEMORY CHANGE");
        }
        DIRTY.set(this, true);
    }

    setAll(values) {
        let debug = DEBUG.get(this);
        if (debug) {
            console.group("LOGIC MEMORY CHANGE");
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
            console.groupEnd("LOGIC MEMORY CHANGE");
        }
        DIRTY.set(this, true);
    }

}