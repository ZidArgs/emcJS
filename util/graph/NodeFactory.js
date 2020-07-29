const EDGES = new WeakMap();
const NAME = new WeakMap();

class Node {

    constructor(name) {
        EDGES.set(this, new Map());
        NAME.set(this, name);
    }

    getName() {
        return NAME.get(this);
    }

    append(node, condition) {
        if (node instanceof Node) {
            let edges = EDGES.get(this);
            edges.set(node.getName(), new Edge(node, condition));
        } else {
            throw new TypeError("Expected type Node");
        }
    }

    getTargets() {
        let edges = EDGES.get(this);
        return edges.keys();
    }

    getEdge(name) {
        let edges = EDGES.get(this);
        return edges.get(name);
    }
    
}

const TARGET = new WeakMap();
const CONDITION = new WeakMap();

class Edge {

    constructor(target, condition) {
        TARGET.set(this, target);
        CONDITION.set(this, condition);
    }

    getCondition() {
        return CONDITION.get(this);
    }

    getTarget() {
        return TARGET.get(this);
    }

}

/* node factory */
const NODES = new Map();

class NodeFactory {

    get(name) {
        if (NODES.has(name)) {
            return NODES.get(name);
        }
        let node = new Node(name);
        NODES.set(name, node);
        return node;
    }

}

export default new NodeFactory();