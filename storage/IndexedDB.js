
function openDB(name) {
    return new Promise(function(resolve, reject) {
        var request = indexedDB.open(dbName);
        request.onupgradeneeded = function(event) {
            var db = this.result;
            if(!db.objectStoreNames.contains(name)){
                store = db.createObjectStore(name, { keyPath: "key" });
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

class IndexedDB {

    open(name, success, upgrade) {
        success = success || function() {};
        upgrade = upgrade || function() {};
        this.close(name);
        var request = indexedDB.open(name);
        request.onupgradeneeded = function(event) { 
            event.target.transaction.abort();
            upgrade();
        };
        request.onsuccess = function() {
            dbs[name] = request.result;
            success();
        };
    }

}

export default new IndexedDB;

/**
	Simple IndexedDB tool as it would (probably) work in ES7 using async/await
*/

(function() {
	window.InDieBee = new function() {
		function openDB(name) {
			return new Promise(function(resolve, reject) {
				var request = indexedDB.open(dbName);
				request.onupgradeneeded = function(event) {
					var db = this.result;
					if(!db.objectStoreNames.contains('data')){
						store = db.createObjectStore('data');
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
		function writeData(db, index, data) {
			return new Promise(function(resolve, reject) {
			    var request = db.transaction(["data"],"readwrite").objectStore("data").add(data,index);
				request.onsuccess = function(e) {
					resolve();
				};
				request.onerror = function(e) {
		            reject(e);
		        }
			});
		}
		function readData(db, index) {
			return new Promise(function(resolve, reject) {
			    var request = db.transaction(["data"],"readonly").objectStore("data").get(index);
				request.onsuccess = function(e) {
					resolve(e.target.result);
				};
				request.onerror = function(e) {
		            reject(e);
		        }
			});
		}
		function deleteData(db, index) {
			return new Promise(function(resolve, reject) {
			    var request = db.transaction(["data"],"readwrite").objectStore("data").delete(index);
				request.onsuccess = function(e) {
					resolve(e.target.result);
				};
				request.onerror = function(e) {
		            reject(e);
		        }
			});
		}
		this.write = async function(dbName, index, data) {
			try {
				var db = await openDB(dbName);
				await writeData(db, index, data);
				db.close();
			} catch(error) {
				// error handling
			}
		}
		this.read = async function(dbName, index) {
			try {
				var db = await openDB(dbName);
				var result = await readData(db, index);
				db.close();
				return result;
			} catch(error) {
				// error handling
			}
		}
		this.remove = async function(dbName, index) {
			try {
				var db = await openDB(dbName);
				var result = await deleteData(db, index);
				db.close();
				return !!result;
			} catch(error) {
				// error handling
			}
		}
	}
}());