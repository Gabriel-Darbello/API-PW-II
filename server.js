const http = require("http")
const routes = require("./src/routes/router.js")
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    routes(req, res);
})

const PORT = 3000

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})