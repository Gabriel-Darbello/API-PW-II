const controller = require('../controllers/controller.js');

module.exports = (req, res) => {
    const url = req.url;
    const method = req.method;
    // <-------------- EXERCICIO 1 -------------------->
    if(url === "/" && method === "GET"){
        return controller.getHome(req, res)
    }
    if(url === "/sobre" && method === "GET"){
        return controller.getAbout(req, res)
    }
    if(url === "/status" && method === "GET"){
        return controller.getStatus(req, res)
    }

    // <-------- EXERCICIO 2 --------->
    if(url === "/alunos" && method === "GET"){
        return controller.getAlunos(req, res)
    }
}