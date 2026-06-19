const services = require('../services/services.js');
const fs = require('fs').promises;

// <-------- EXERCICIO 8 --------->
const sendJson = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// <---------- EXERCICIO 9 ---------->
const sendHtml = (res, status, htmlContent) => {
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(htmlContent);
};

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('JSON inválido'));
      }
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

// <--------------------- EXERCICIO 1 -------------------------->
const getHome = async (req, res) => {
  sendJson(res, 200, { message: 'Bem-vindo ao home' });
};

const getAbout = async (req, res) => {
  sendJson(res, 200, { message: 'Nosso aplicativo é supimpa!' });
};

const getStatus = async (req, res) => {
  sendJson(res, 200, { message: 'Servidor funcionando!' });
};

// <---------- EXERCICIO 2 ---------->
const getAlunos = async (req, res) => {
  try {
    const alunos = await services.getAluno();
    sendJson(res, 200, alunos);
  } catch (error) {
    sendJson(res, 400, { error: error.message || error });
  }
};

// <---------- EXERCICIO 3 ---------->
const getAlunoById = async (req, res, id) => {
  try {
    const aluno = await services.getAlunoById(id);
    if (!aluno) {
      return sendJson(res, 404, { message: 'Aluno não encontrado' });
    }
    sendJson(res, 200, aluno);
  } catch (error) {
    sendJson(res, 400, { error: error.message || error });
  }
};

// <---------- EXERCICIO 4 ---------->
const getProduto = async (req, res, categoria) => {
  try {
    const produtos = await services.getProduto(categoria);
    sendJson(res, 200, produtos);
  } catch (error) {
    sendJson(res, 400, { error: error.message || error });
  }
};

// <-------- EXERCICIO 5 --------->
const createAluno = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { nome, turma, curso } = body;

    if (!nome || !turma || !curso) {
      return sendJson(
        res,
        400,
        { error: 'Campos obrigatórios: nome, turma e curso.' },
        'application/json'
      );
    }

    const aluno = await services.addAluno(nome, turma, curso);
    sendJson(res, 201, aluno);
  } catch (error) {
    console.error('Erro no controller:', error);
    sendJson(res, 500, { error: 'Erro interno no servidor.' });
  }
};

// <-------- EXERCICIO 6 --------->
const updateAluno = async (req, res, id) => {
  try {
    const alunoExistente = await services.getAlunoById(id);
    if (!alunoExistente) {
      return sendJson(res, 404, { message: 'Aluno não encontrado' });
    }

    const body = await getRequestBody(req);
    const { nome, turma, curso } = body;

    if (!nome || !turma || !curso) {
      return sendJson(
        res,
        400,
        {
          error:
            "JSON inválido ou incompleto. Os campos 'nome', 'turma' e 'curso' são obrigatórios.",
        },
        'application/json'
      );
    }

    const alunoAtualizado = await services.updateAluno(id, nome, turma, curso);
    sendJson(res, 200, alunoAtualizado);
  } catch (error) {
    sendJson(
      res,
      400,
      { error: 'Erro ao processar a requisição (JSON malformado).' },
      'application/json'
    );
  }
};

// <-------- EXERCICIO 7 --------->
const deleteAluno = async (req, res, id) => {
  try {
    const deleted = await services.deleteAluno(id);
    if (!deleted) {
      return sendJson(res, 404, { message: 'Aluno não encontrado' });
    }

    res.writeHead(204);
    res.end();
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    sendJson(res, 500, { error: 'Erro interno ao tentar deletar o aluno.' });
  }
};

// <-------- EXERCICIO 9 --------->
const getPagina = async (req, res) => {
  try {
    const page = await fs.readFile('src/pages/index.html', 'utf-8');
    sendHtml(res, 200, page);
  } catch (error) {
    console.error('Erro ao abrir index.html, tentando carregar 404...', error);
    try {
      const errorPage = await fs.readFile('src/pages/404.html', 'utf-8');
      sendHtml(res, 404, errorPage);
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Página não encontrada e arquivo 404.html ausente.');
    }
  }
};

module.exports = {
  getHome,
  getStatus,
  getAbout,
  getAlunos,
  getAlunoById,
  getProduto,
  createAluno,
  updateAluno,
  deleteAluno,
  getPagina,
};
