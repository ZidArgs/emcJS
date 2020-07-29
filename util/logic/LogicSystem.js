import Processor from "./Processor.js";
import Graph from "./Graph.js";

const LOGIC_PROCESSOR = new WeakMap();
const LOGIC_GRAPH = new WeakMap();

export default class LogicSystem {

    constructor(debug = false) {
        LOGIC_PROCESSOR.set(this, new Processor(debug));
        LOGIC_GRAPH.set(this, new Graph(debug));
    }

    load(logic) {
        LOGIC_PROCESSOR.get(this).loadLogic(logic.logic);
        LOGIC_GRAPH.get(this).loadEdges(logic.edges);
    }

    setAll(data) {
        LOGIC_PROCESSOR.get(this).setAll(data);
        LOGIC_GRAPH.get(this).setAll(data);
    }

    set(ref, data) {
        LOGIC_PROCESSOR.get(this).set(ref, data);
        LOGIC_GRAPH.get(this).set(ref, data);
    }

    getAll() {
        return {
            logic: LOGIC_PROCESSOR.get(this).getAll(),
            graph: LOGIC_GRAPH.get(this).getAll()
        };
    }

    get(ref) {
        let res = LOGIC_GRAPH.get(this).get(ref);
        if (res == null) {
            res = LOGIC_PROCESSOR.get(this).get(ref);
        }
        return res;
    }

    execute(startNode) {
        let res = LOGIC_PROCESSOR.get(this).execute();
        LOGIC_GRAPH.get(this).setAll(res);
        return LOGIC_GRAPH.get(this).traverse(startNode);
    }

}