const services = require('../services/services.js');

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
  try {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Bem-vindo ao home' }));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Dados inválidos enviados' }));
  }
};

const getAbout = async (req, res) => {
  try {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Nosso aplicativo é supimpa!' }));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Dados inválidos enviados' }));
  }
};

const getStatus = async (req, res) => {
  try {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Servidor funcionando!' }));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Dados inválidos enviados' }));
  }
};

// <---------- EXERCICIO 2 ---------->
const getAlunos = async (req, res) => {
  try {
    const alunos = await services.getAluno();
    res.statusCode = 200;
    res.end(JSON.stringify(alunos));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: error }));
  }
};
// <---------- EXERCICIO 3 ---------->
const getAlunoById = async (req, res, id) => {
  try {
    const aluno = await services.getAlunoById(id);

    if (!aluno) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: 'Aluno não encontrado' }));
    }
    res.statusCode = 200;
    res.end(JSON.stringify(aluno));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: error }));
  }
};
// <---------- EXERCICIO 4 ---------->
const getProduto = async (req, res, categoria) => {
  try {
    const produtos = await services.getProduto(categoria);

    if (!produtos) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: 'Aluno não encontrado' }));
    }
    res.statusCode = 200;
    res.end(JSON.stringify(produtos));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: error }));
  }
};

// <-------- EXERCICIO 5 --------->
const createAluno = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { nome, turma, curso } = body;

    if (!nome || !turma || !curso) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Campos obrigatórios: nome, turma e curso.' }));
    }

    const aluno = await services.addAluno(nome, turma, curso);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(aluno));
  } catch (error) {
    console.error('Erro no controller:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Erro interno no servidor.' }));
  }
};

// <-------- EXERCICIO 6 --------->
const updateAluno = async (req, res, id) => {
  try {
    const alunoExistente = await services.getAlunoById(id);
    if (!alunoExistente) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Aluno não encontrado' }));
    }

    const body = await getRequestBody(req);
    const { nome, turma, curso } = body;

    if (!nome || !turma || !curso) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(
        JSON.stringify({
          error:
            "JSON inválido ou incompleto. Os campos 'nome', 'turma' e 'curso' são obrigatórios.",
        })
      );
    }

    const alunoAtualizado = await services.updateAluno(id, nome, turma, curso);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(alunoAtualizado));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Erro ao processar a requisição (JSON malformado).' }));
  }
};

// <-------- EXERCICIO 7 --------->
const deleteAluno = async (req, res, id) => {
  try {
    const foiDeletado = await services.deleteAluno(id);

    if (!foiDeletado) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Aluno não encontrado' }));
    }

    res.writeHead(204);
    res.end();
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Erro interno ao tentar deletar o aluno.' }));
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
};
