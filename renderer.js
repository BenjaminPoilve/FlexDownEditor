var liveServer = require("live-server");


//LOCAL SERVER MANAGEMENT
function startServer(path, base) {
    console.log(path)
    console.log(base)
    var params = {
        port: 8181, // Set the server port. Defaults to 8080.
        host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
        root: path, // Set root directory that's being served. Defaults to cwd.
        open: true, // When false, it won't load your browser by default.
        file: base, // When set, serve this file for every 404 (useful for single-page applications)
    };
    liveServer.start(params);
}

function saveAndServe() {
    saveFile(function(path, base) {
        startServer(path, base);
    })
}
