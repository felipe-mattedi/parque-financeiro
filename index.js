const express = require('express')
const app = express()
var AWS = require("aws-sdk");
const port =  process.env.PORT || 3000

AWS.config.update({
  region: "us-east-2",
});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
var table = "caixa-financeiro";

var params = {
  TableName: table,
  Item:{
      "id_lancamento": {S: '001'},
      "title": {S: 'Richard Roe'}
  }
};


const router = express.Router();

router.get('/consulta', (req, res) => {

  console.log("Adding a new item...");
  var nota = ''
  ddb.putItem(params, function(err, data) {
    if (err) {
     nota = ("Error" + err);
    } else {
      nota = ("Success" + data);
    }
  });
  res.status(200).send({saldo: 23,
  observacao: nota})
})

router.post('/lancamento', (req, res) => {
  res.status(200)
  res.send('OK')
})

router.post('/fechamento', (req, res) => {
  res.status(200)
  res.send('OK')
})

app.use('/',router)

app.listen(port, () => {
  console.log(`Sistema inicializado em ${port}`)
})
