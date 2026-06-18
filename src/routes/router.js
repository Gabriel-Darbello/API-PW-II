const controller = require('../controllers/controller.js');

module.exports = (req, res) => {
  const url = req.url;
  const method = req.method;
  // <-------------- EXERCICIO 1 -------------------->
  if (url === '/' && method === 'GET') {
    return controller.getHome(req, res);
  } else if (url === '/sobre' && method === 'GET') {
    return controller.getAbout(req, res);
  } else if (url === '/status' && method === 'GET') {
    return controller.getStatus(req, res);
  }

  // <-------- EXERCICIO 2 --------->
  else if (url === '/alunos' && method === 'GET') {
    return controller.getAlunos(req, res);
  }
  // <-------- EXERCICIO 3 --------->
  else if (url.startsWith('/alunos/') && method === 'GET') {
    const id = url.split('/')[2];
    return controller.getAlunoById(req, res, id);
  }
  // <-------- EXERCICIO 3 --------->
  else if(url.startsWith('/produto') && method === 'GET'){
    const urlCompleta = new URL(url, `http://${req.headers.host}`)
    const categoria = urlCompleta.searchParams.get('categoria')

    return controller.getProduto(req, res, categoria)
  }

  // <---------- ERRO 404 ----------->
  else {
    res.statusCode = 404;
    res.end('Erro 404');
  }
};
