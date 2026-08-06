const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

//midlewares
app.use(cors({
origin:'*',
methods: ['GET','POST','DELETE','PUT','OPTIONS'],
allowedHeaders: ['Content-Type']
}));//permite que o front na porta 5500 acesse a porta 3000
app.use(express.json());//habilita o servidor para ler o JSON ENVIADO PELO FRONT

//o banco de dados temporário(array na memória do servidor)
const bancoDeDadosProdutos = [];

//ROTA GET: envia a lista de produtos salvos para a função renderizarTabela()
app.get('/produtos',(req,res)=>{
//envia os dados brutos, o o front recebe e reinstancia a classe
res.status(200).json(bancoDeDadosProdutos);
});

//ROTA POST: recebe o JSON enviado pelo formulário do front
app.post('/produtos',(req,res)=>{
const{nome,preco,quantidade} = req.body;

const p = parseFloat(preco);
const q = parseInt(quantidade);


//validação de segurança no servidor, nunca confiar no cliente
if(!nome || isNaN(p) || isNaN(q) || p<=0 || q<=0){
return res.status(400).json({erro: "Dados inválidos enviados para o servidor"});
}

//monta o objeto que será guardado no array do servidor
const novoItem = {
nome,
preco: p,
quantidade: q
};

bancoDeDadosProdutos.push(novoItem);

//responde com status 201 created e o objeto criado
res.status(201).json(novoItem);
});

app.delete('/produtos',(req,res)=>{
bancoDeDadosProdutos.length = 0;//esvazia o array no servidor
res.status(204).send();//204 sucesso sem conteudo no retorno
});

//inicialização do servidor
app.listen(PORT,()=>{
console.log(`Servidor backend roarquivo server.jsdando em http:localhost: ${PORT}`)
})
