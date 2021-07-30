import AWS from 'aws-sdk'
export const inserelancamento = (uuid, valor) => {

  AWS.config.update({
    region: "us-east-2",
  });

  var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
  var table = "caixa-financeiro";

  var params = {
    TableName: table,
    Item: {
      "id_lancamento": { S: uuid },
      "valor": { N: valor }
    }
  }
  
  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error" + err);
    } else {
      console.log("Success" + data);
    }
  })
}

export const consultalancamentos = () => {

  AWS.config.update({
    region: "us-east-2",
  });

  var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
  var table = "caixa-financeiro";

  var params = {
    TableName: table
  }

  ddb.scan(params, function (err, data) {
    if (err) {
      console.log("Error" + err);
    } else {
      return data.Items
    }
  })
}



