const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./src/db/data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
server.use(router);
server.listen(3005, () => {
    console.log("JSON Server is running on port 3005");
});
