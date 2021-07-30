const express = require('express')
const app = express()
var AWS = require("aws-sdk");
const port =  process.env.PORT || 3000

AWS.config.update({
  region: "us-east-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "caixa-financeiro";

var params = {
  TableName:table,
  Item:{
      "id_lancamento": "00001",
      "title": "valor"
  }
};


const router = express.Router();

router.get('/consulta', (req, res) => {

  console.log("Adding a new item...");
  var nota = ''
  docClient.put(params, function(err, data) {
    if (err) {
        nota = ("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        nota = ("Added item:", JSON.stringify(data, null, 2));
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
