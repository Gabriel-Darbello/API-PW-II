const controller = require('../controllers/controller.js');

// <-------- EXERCICIO 8 --------->
const notFound = (res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Erro 404 - Rota não encontrada" }));
};

// <-------- EXERCICIO 10 --------->
const methodNotAllowed = (res) => {
  res.writeHead(405, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Erro 405 - Método não permitido para esta rota" }));
};

const handleRoutes = async (req, res) => {
  const { url, method } = req;

  // <-------------- EXERCICIO 1 -------------------->
  if (url === '/') {
    if (method === 'GET') return controller.getHome(req, res);
    return methodNotAllowed(res);
  }

  if (url === '/sobre') {
    if (method === 'GET') return controller.getAbout(req, res);
    return methodNotAllowed(res);
  }

  if (url === '/status') {
    if (method === 'GET') return controller.getStatus(req, res);
    return methodNotAllowed(res);
  }

  // <-------- EXERCICIO 2 & 5 --------->
  if (url === '/alunos') {
    if (method === 'GET') return controller.getAlunos(req, res);
    if (method === 'POST') return controller.createAluno(req, res);
    return methodNotAllowed(res);
  }

  // <-------- EXERCICIO 3, 6 & 7 --------->
  const partesUrl = url.split('/');
  if (partesUrl[1] === 'alunos' && partesUrl[2]) {
    const id = partesUrl[2];
    if (method === 'GET') return controller.getAlunoById(req, res, id);
    if (method === 'PUT') return controller.updateAluno(req, res, id);
    if (method === 'DELETE') return controller.deleteAluno(req, res, id);
    return methodNotAllowed(res);
  }

  // <-------- EXERCICIO 4 --------->
  if (url.startsWith('/produto')) {
    if (method === 'GET') {
      const urlCompleta = new URL(url, `http://${req.headers.host}`);
      const categoria = urlCompleta.searchParams.get('categoria');
      return controller.getProduto(req, res, categoria);
    }
    return methodNotAllowed(res);
  }

  // <-------- EXERCICIO 9 --------->
  if (url === '/pagina') {
    if (method === 'GET') return controller.getPagina(req, res);
    return methodNotAllowed(res);
  }

  // <---------- ERRO 404 ----------->
  return notFound(res);
};

module.exports = handleRoutes;
