const PORTS = new Set;

function handleConnect(event) {
    let port = event.ports[0]; 
    PORTS.add(port);
    port.addEventListener('message', handleMessage.bind(port));
    port.start();
}

function handleDisconnect(event) {
    PORTS.remove(e.ports[0]);
}

function handleMessage(event) {
    console.log(`[ShW] recieved: ${event.data}`)
    for (let port of PORTS) {
        if (port == this) continue;
        port.postMessage(event.data);
    }
}

self.addEventListener('connect', handleConnect);
self.addEventListener('disconnect', handleDisconnect);