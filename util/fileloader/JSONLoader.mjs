class JSONLoader {

    load(file) {
        return fetch(new Request(file, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            }),
            mode: 'cors',
            cache: 'default'
        })).then(function(r) {
            return r.json();
        }.bind(this));
    }

    loadAll(files) {
        var data = [];
        for (let i in files) {
            data.push(JSONLoader.load(files[i]));
        }
        return Promise.all(data);
    }

}

export default new JSONLoader;

