let dbInstance = null;

/*function removeAll() {
	return new Promise(function(resolve, reject) {
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
function getStoreWritable() {
	return dbInstance.transaction("data", "readwrite").objectStore("data");
}
function getStoreReadonly() {
	return dbInstance.transaction("data", "readonly").objectStore("data");
}
function writeData(store, key, value) {
	return new Promise(function(resolve, reject) {
		var request = store.put(value, key);
		request.onsuccess = function(e) {
			resolve();
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function readData(store, key) {
	return new Promise(function(resolve, reject) {
		var request = store.get(key);
		request.onsuccess = function(e) {
			resolve(e.target.result);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function hasKey(store, key) {
	return new Promise(function(resolve, reject) {
		var request = store.getKey(key);
		request.onsuccess = function(e) {
			resolve(e.target.result === key);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function deleteData(store, key) {
	return new Promise(function(resolve, reject) {
		var request = store.delete(key);
		request.onsuccess = function(e) {
			resolve(e.target.result);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function clearData(store) {
	return new Promise(function(resolve, reject) {
		var request = store.clear();
		request.onsuccess = function(e) {
			resolve();
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}
function getKeys(store) {
	return new Promise(function(resolve, reject) {
		var request = store.getAllKeys();
		request.onsuccess = function(e) {
			resolve(e.target.result);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}

function getAll(store) {
	return new Promise(function(resolve, reject) {
		var request = store.getAll();
		request.onsuccess = function(e) {
			resolve(e.target.result);
		};
		request.onerror = function(e) {
			reject(e);
		}
	});
}

const NAME = new WeakMap();

class IDBTable {

	constructor(name) {
		NAME.set(this, name);
	}
    
	async set(key, value) {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreWritable();
			await writeData(store, key, value);
		} catch(error) {
			// error handling
		}
	}

	async get(key, value) {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreReadonly();
			var res = await readData(store, key);
			if (typeof res == "undefined" || res == null) {
				return value;
			}
			return res;
		} catch(error) {
			// error handling
		}
	}

	async has(key) {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreReadonly();
			var res = await hasKey(store, key);
			return !!res;
		} catch(error) {
			// error handling
		}
	}

	async delete(key) {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreWritable();
			await deleteData(store, key);
		} catch(error) {
			// error handling
		}
	}

    async clear() {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreWritable();
			await clearData(store);
		} catch(error) {
			// error handling
		}
    }

	async keys(filter) {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreReadonly();
			var keys = await getKeys(store);
			if (typeof filter == "string") {
				return keys.filter(key => key.startsWith(filter));
			}
			return keys;
		} catch(error) {
			// error handling
		}
	}

    async getAll() {
		try {
			if (dbInstance == null) {
				await openDB()
			}
			let store = getStoreReadonly();
			return await getAll(store);
		} catch(error) {
			// error handling
		}
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