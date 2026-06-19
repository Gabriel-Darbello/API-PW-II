const controller = require('../controllers/controller.js');

const notFound = (res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Erro 404 - Rota não encontrada" }));
};

const handleRoutes = async (req, res) => {
  const { url, method } = req;

  // <-------------- EXERCICIO 1 -------------------->
  if (url === '/' && method === 'GET') return controller.getHome(req, res);
  if (url === '/sobre' && method === 'GET') return controller.getAbout(req, res);
  if (url === '/status' && method === 'GET') return controller.getStatus(req, res);

  // <-------- EXERCICIO 2 --------->
  if (url === '/alunos' && method === 'GET') return controller.getAlunos(req, res);

  // <-------- EXERCICIO 3 --------->
  if (url.startsWith('/alunos/') && method === 'GET') {
    const id = url.split('/')[2];
    return controller.getAlunoById(req, res, id);
  }

  // <-------- EXERCICIO 4 --------->
  if (url.startsWith('/produto') && method === 'GET') {
    const urlCompleta = new URL(url, `http://${req.headers.host}`);
    const categoria = urlCompleta.searchParams.get('categoria');
    return controller.getProduto(req, res, categoria);
  }

  // <-------- EXERCICIO 5 --------->
  if (url === '/alunos' && method === 'POST') return controller.createAluno(req, res);

  // <-------- EXERCICIO 6 --------->
  if (url.startsWith('/alunos/') && method === 'PUT') {
    const id = url.split('/')[2];
    return controller.updateAluno(req, res, id);
  }

  // <-------- EXERCICIO 7 --------->
  if (url.startsWith('/alunos/') && method === 'DELETE') {
    const id = url.split('/')[2];
    return controller.deleteAluno(req, res, id);
  }

  // <---------- ERRO 404 ----------->
  return notFound(res);
};

module.exports = handleRoutes;
