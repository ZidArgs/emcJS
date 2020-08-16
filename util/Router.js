const ROUTES = new Map();

function resolveParams(params) {
    if (!!params.length) {
        return Object.fromEntries(params.slice(1).split('&').map(v=>v.split("=")));
    } else {
        return {};
    }
}

function callRoute(loc) {
    let path = loc.pathname;
    for (let [uri, callback] of ROUTES) {
        let regEx = new RegExp(`^${uri}$`);
        if (path.match(regEx)) {
            callback(uri, resolveParams(loc.search));
        }
    }
}

class Router {

    add(uri, callback){
        if(typeof uri !== "string") throw new TypeError('typeof uri must be a string');
        if(typeof callback !== "function") throw new TypeError('typeof callback must be a function');
        if (ROUTES.has(uri)) {
            throw new Error(`the uri ${route.uri} already exists`);
        }
        ROUTES.set(uri, callback);
    }

    remove(uri) {
        ROUTES.remove(uri);
    }

    clear(uri) {
        ROUTES.clear(uri);
    }

    navigate(uri) {
        let loc = new URL(uri, location);
        history.pushState(null, null, loc);
        callRoute(loc);
    }

    init() {
        callRoute(location);
    }
}

export default new Router();