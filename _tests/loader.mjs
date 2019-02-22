import GlobalData from "../storage/GlobalData.mjs";
import LocalStorage from "../storage/LocalStorage.mjs";
import FileLoader from "../util/FileLoader.mjs";

const FILES = [
    "items",
    "locations",
    "logic"
];

const LOGIC_PATCHES = [];

export default async function loadData() {
    let loading = [];
    GlobalData.set("logic_patched", LocalStorage.get("settings", "logic", {}));
    FILES.forEach(file => {
        loading.push(FileLoader.json(`database/${file}.json`).then(function(data) {
            GlobalData.set(file, data);
        }));
    });

    // loading.push(FileLoader.json("version.json").then(function(data) {
    //     GlobalData.set("version", data);
    // }));

    await Promise.all(loading);

    loading = [];
    LOGIC_PATCHES.forEach(file => {
        loading.push(FileLoader.json(`database/logic_patch_${file}.json`).then(function(data) {
            let logic = GlobalData.get("logic", {});
            for (let i in data) {
                if (logic.hasOwnProperty(i)) {
                    for (let j in data[i]) {
                        logic[i][j] = data[i][j];
                    }
                } else {
                    logic[i] = data[i];
                }
            }
        }));
    });

    await Promise.all(loading);
}