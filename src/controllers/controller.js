const getRequestBody = (req) => {
  return new Promise ((resolve, reject) => {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      try{
          resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(new Error("JSON inválido"));
      }
    })

    req.on('error', (err) => {
        reject(err);
    })
  })
}

// <--------------------- EXERCICIO 1 -------------------------->
const getHome = async (req, res) => {
    const body = await getRequestBody(req);
    try{
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Bem-vindo ao home" }));
    } catch(error){
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Dados inválidos enviados" }));
    }
}

const getAbout = async (req, res) => {
    const body = await getRequestBody(req);
    try{
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Nosso aplicativo é supimpa!" }));
    } catch(error){
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Dados inválidos enviados" }));
    }
}

const getStatus = async (req, res) => {
    const body = await getRequestBody(req);
    try{
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Servidor funcionando!" }));
    } catch(error){
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Dados inválidos enviados" }));
    }
}

// <---------- EXERCICIO 2 ---------->
const getAlunos = async (req, res) => {
    const body = await getRequestBody(req);
    const alunos = alunosSalvos
    try{
        res.statusCode = 200;
        res.end(JSON.stringify(alunos));
    } catch(error){
        res.statusCode = 400;
        res.end(JSON.stringify({ error: error }));
    }
}

module.exports = {
    getHome,
    getStatus,
    getAbout
}