
function openDB(name) {
    return new Promise(function(resolve, reject) {
        var request = indexedDB.open(name);
        request.onupgradeneeded = function(event) {
            var db = this.result;
            if(!db.objectStoreNames.contains("data")){
                store = db.createObjectStore("data");
            }
        };
        request.onsuccess = function() {
            resolve(request.result);
        };
        request.onerror = function(e) {
            reject(e);
        }
    });
}

function writeData(db, key, value) {
	return new Promise(function(resolve, reject) {
		var request = db.transaction(["data"],"readwrite").objectStore("data").add(value, key);
		request.onsuccess = function(e) {
			resolve();
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function readData(db, key) {
	return new Promise(function(resolve, reject) {
		var request = db.transaction(["data"],"readonly").objectStore("data").get(key);
		request.onsuccess = function(e) {
			resolve(e.target.result);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function deleteData(db, key) {
	return new Promise(function(resolve, reject) {
		var request = db.transaction(["data"],"readwrite").objectStore("data").delete(key);
		request.onsuccess = function(e) {
			resolve(e.target.result);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}

class IndexedDB {
    
	async write(name, key, value) {
		try {
			var db = await openDB(name);
			await writeData(db, key, value);
			db.close();
		} catch(error) {
			// error handling
		}
	}

	async read(name, key, value) {
		try {
			var db = await openDB(name);
			var result = await readData(db, key);
			db.close();
			if (typeof result == "undefined" || result == null) { // TODO this for other storages too
				return value;
			}
			return result;
		} catch(error) {
			// error handling
		}
	}

	async remove(name, key) {
		try {
			var db = await openDB(name);
			var result = await deleteData(db, key);
			db.close();
			return !!result;
		} catch(error) {
			// error handling
		}
	}

}

export default new IndexedDB;