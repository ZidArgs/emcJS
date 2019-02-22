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
import "./LogicItem.mjs";

import GlobalData from "../storage/GlobalData.mjs";

(async function main() {
    await loadData();
    let logic = document.getElementById("logics");
    let workingarea = document.getElementById("workingarea");
    
    let locations = GlobalData.get("locations");
    
    for (let i in locations) {
        let loc = locations[i].chests_v;
        for (let j in loc) {
            let el = document.createElement("div");
            el.dataset.ref = j;
            el.className = "logic-location";
            el.onclick = loadLogic;
            el.innerHTML = j;
            logic.appendChild(el);
        }
    }
    
    function loadLogic(event) {
        let l = GlobalData.get("logic").chests[event.target.dataset.ref];
        workingarea.loadLogic(l);
    }
}());
