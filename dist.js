const fs = require('fs');

function resolveFiles(path, imports) {
    let result = {};
    let files = fs.readdirSync(path , {
        withFileTypes: true
    });
    for (let file of files) {
        if (file.isDirectory() && file.name != ".git" && file.name != "_demo") {
            result[file.name] = resolveFiles(`${path}/${file.name}`, imports);
        } else if (path.length > 1 && file.isFile() && file.name != "index.js" && file.name.endsWith(".js") && !file.name.endsWith(".worker.js")) {
            let filename = file.name.slice(0, -3);
            let varname = `${path.slice(2).replace(/\//g, "_")}_${filename}`;
            imports.push(`import ${varname} from "${path}/${file.name}";`);
            result[filename] = varname;
        }
    }
    return result;
}

function createIndex() {
    let imports = [];
    let result = resolveFiles(".", imports);
    fs.writeFileSync("./index.js", imports.join("\n")
                                + "\n\nlet index = "
                                + JSON.stringify(result, null, 4).replace(/: "(.*)"(,?)/g, ': $1$2')
                                + ";\n\nexport default index;");
}

createIndex();