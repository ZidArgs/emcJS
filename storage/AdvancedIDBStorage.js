let dbInstance = null;

/*function removeAll() {
	return new Promise(async (resolve, reject) => {
		var req = indexedDB.deleteDatabase("SimpleIDBStorage");
		req.onerror = function(event) {
			reject("Error deleting database.");
		};
		req.onsuccess = function(event) {
			resolve();
		};
	});
}*/
function openDB() {
    return new Promise(function(resolve, reject) {
        var request = indexedDB.open("SimpleIDBStorage");
        request.onupgradeneeded = function(event) {
            var db = request.result;
            if(!db.objectStoreNames.contains("data")){
                store = db.createObjectStore("data");
            }
        };
        request.onsuccess = function() {
			dbInstance = request.result;
            resolve();
        };
        request.onerror = function(e) {
            reject(e);
        }
    });
}
function getStoreWritable(name) {
	return dbInstance.transaction(name, "readwrite").objectStore(name);
}
function getStoreReadonly(name) {
	return dbInstance.transaction(name, "readonly").objectStore(name);
}

const NAME = new WeakMap();

class IDBTable {

	constructor(name) {
		NAME.set(this, name);
	}
    
	set(key, value) {
		return new Promise(async (resolve, reject) => {
			await openDB();
			let request = getStoreWritable(NAME.get(this)).put(value, key);
			request.onsuccess = function(e) {
				resolve();
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
	}

	get(key, value) {
		return new Promise(async (resolve, reject) => {
			await openDB();
			let request = getStoreReadonly(NAME.get(this)).get(key);
			request.onsuccess = function(e) {
				let res = e.target.result;
				if (typeof res == "undefined") {
					resolve(value);
				} else {
					resolve(res);
				}
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
	}

	has(key) {
		return new Promise(async (resolve, reject) => {
			await openDB();
			let request = getStoreReadonly(NAME.get(this)).getKey(key);
			request.onsuccess = function(e) {
				resolve(e.target.result === key);
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
	}

	delete(key) {
		return new Promise(async (resolve, reject) => {
			await openDB();
			let request = getStoreWritable(NAME.get(this)).delete(key);
			request.onsuccess = function(e) {
				resolve();
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
	}

    clear() {
		return new Promise(async (resolve, reject) => {
			await openDB();
			let request = getStoreWritable(NAME.get(this)).clear();
			request.onsuccess = function(e) {
				resolve();
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
    }

	keys(filter) {
		return new Promise(async (resolve, reject) => {
			await openDB();
			let request = getStoreReadonly(NAME.get(this)).getAllKeys();
			request.onsuccess = function(e) {
				let res = e.target.result;
				if (typeof filter == "string") {
					resolve(res.filter(key => key.startsWith(filter)));
				} else {
					resolve(res);
				}
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
	}

    getAll(filter) {
		return new Promise(async (resolve, reject) => {
			await openDB();
			let request = getStoreReadonly(NAME.get(this)).openCursor();
			let res = {};
			request.onsuccess = function(e) {
				let el = e.target.result;
				if (el) {
					res[el.key] = el.value;
					el.continue();
				} else {
					if (typeof filter == "string") {
						resolve(res.filter(key => key.startsWith(filter)));
					} else {
						resolve(res);
					}
				}
			};
			request.onerror = function(e) {
				reject(e);
			}
		});
    }
	
}

class AdvancedIDBStorage {

	create(name, definition) {
		// create table with definition, overwrite if exists
	}

	remove(name) {
		// remove table if exists
		// dont forget bound IDBTable objects to not be able to call table anymore
	}

	get(name) {
		// retrun IDBTable of name, error if not exists 
	}

}

export default new AdvancedIDBStorage;