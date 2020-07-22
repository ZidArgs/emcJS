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
            edges.set(node.name, new Edge(node, condition));
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

const CONDITION = new WeakMap();
const TARGET = new WeakMap();

class Edge {

    constructor(target, condition) {
        CONDITION.set(this, name);
        TARGET.set(this, name);
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
    }

}

export default new NodeFactory();