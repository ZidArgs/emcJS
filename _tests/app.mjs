import loadData from "./loader.mjs";
import "/ui/logic/LogicEditorClipboard.mjs";
import "/ui/logic/LogicEditorElements.mjs";
import "/ui/logic/LogicEditorTrashcan.mjs";
import "/ui/logic/LogicEditorWorkingarea.mjs";
import "/ui/logic/elements/literal/LogicTrue.mjs";
import "/ui/logic/elements/operator/LogicAnd.mjs";
import "/ui/logic/elements/operator/LogicOr.mjs";
import "/ui/logic/elements/operator/LogicNot.mjs";
import "/ui/logic/elements/restrictor/LogicMin.mjs";
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
    let logicEl = document.getElementById("logics");
    let workingarea = document.getElementById("workingarea");
    
    let locations = GlobalData.get("locations");
    let logic = GlobalData.get("logic");

    logicEl.appendChild(createCategory(locations, "chests_v"));
    logicEl.appendChild(createCategory(locations, "chests_mq"));
    logicEl.appendChild(createCategory(locations, "skulltulas_v"));
    logicEl.appendChild(createCategory(locations, "skulltulas_mq"));

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
    logicEl.appendChild(cnt);
}());

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