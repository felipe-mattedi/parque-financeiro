var AWS = require("aws-sdk");
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
var table = "caixa-financeiro";

export const inserelancamento = (uuid, valor) => {

  AWS.config.update({
    region: "us-east-2",
  });

  var params = {
    TableName: table,
    Item: {
      "id_lancamento": { S: uuid },
      "valor": { N: valor }
    }
  }
  
  ddb.putItem(params, function (err, data) {
    if (err) {
      nota = ("Error" + err);
    } else {
      nota = ("Success" + data);
    }
  })
}




