import loadData from "./loader.mjs";
import FileLoader from "../util/FileLoader.mjs";
import localState from "./LocalState.mjs";
import "/ui/logic/LogicEditorClipboard.mjs";
import "/ui/logic/LogicEditorElements.mjs";
import "/ui/logic/LogicEditorTrashcan.mjs";
import "/ui/logic/LogicEditorWorkingarea.mjs";
import "/ui/logic/elements/literals/LogicTrue.mjs";
import "/ui/logic/elements/operators/LogicAnd.mjs";
import "/ui/logic/elements/operators/LogicOr.mjs";
import "/ui/logic/elements/operators/LogicNot.mjs";
import "/ui/logic/elements/restrictors/LogicMin.mjs";
import "/ui/Panel.mjs";
import "/ui/CollapsePanel.mjs";
import "./LogicItem.mjs";
import "./LogicMixin.mjs";
import "./LogicOption.mjs";
import "./LogicSkip.mjs";
import "./LogicFilter.mjs";

import GlobalData from "../storage/GlobalData.mjs";

(async function main() {
    await loadData();
    
    let locations = GlobalData.get("locations");

    let items = GlobalData.get("items");
    let options = GlobalData.get("options");
    let skips = GlobalData.get("skips");
    let filter = GlobalData.get("filter");

    let logic = GlobalData.get("logic");

    fillLogics(locations, logic);
    fillOperators(items, options, skips, filter, logic);

    
    let data = await FileLoader.json(`database/save.json`);
    localState.load(data);
}());

function fillOperators(items, options, skips, filter, logic) {
    let container = document.getElementById("elements");

    for (let j in items) {
        let el = document.createElement("deep-logic-item");
        el.ref = j;
        el.template = "true";
        container.appendChild(el);
    }

    for (let j in logic.mixins) {
        let el = document.createElement("deep-logic-mixin");
        el.ref = j;
        el.template = "true";
        container.appendChild(el);
    }
}

function fillLogics(locations, logic) {
    let container = document.getElementById("logics");

    container.appendChild(createCategory(locations, "chests_v"));
    container.appendChild(createCategory(locations, "chests_mq"));
    container.appendChild(createCategory(locations, "skulltulas_v"));
    container.appendChild(createCategory(locations, "skulltulas_mq"));

    let cnt = document.createElement("deep-collapsepanel");
    cnt.caption = "mixins";
    for (let j in logic.mixins) {
        let el = document.createElement("div");
        el.dataset.ref = j;
        el.className = "logic-location";
        el.onclick = loadMixinLogic;
        el.innerHTML = j;
        el.title = j;
        cnt.appendChild(el);
    }
    container.appendChild(cnt);
}

function createCategory(data, ref) {
    let ocnt = document.createElement("deep-collapsepanel");
    ocnt.caption = ref;
    for (let i in data) {
        let loc = data[i][ref];
        if (!loc) continue;
        let cnt = document.createElement("deep-collapsepanel");
        cnt.caption = i;
        for (let j in loc) {
            let el = document.createElement("div");
            el.dataset.ref = j;
            el.className = "logic-location";
            el.onclick = ref.startsWith("chest") ? loadChestLogic : loadSkulltulaLogic;
            el.innerHTML = j;
            el.title = j;
            cnt.appendChild(el);
        }
        ocnt.appendChild(cnt);
    }
    return ocnt;
}
    
function loadChestLogic(event) {
    let l = GlobalData.get("logic").chests[event.target.dataset.ref];
    workingarea.loadLogic(l);
}
    
function loadSkulltulaLogic(event) {
    let l = GlobalData.get("logic").skulltulas[event.target.dataset.ref];
    workingarea.loadLogic(l);
}
    
function loadMixinLogic(event) {
    let l = GlobalData.get("logic").mixins[event.target.dataset.ref];
    workingarea.loadLogic(l);
}