import AWS from 'aws-sdk'

let ddb
let table

export const inicializaaws = () => {
  AWS.config.update({
    region: "us-east-2",
  });
  ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
  table = "caixa-financeiro";
}

export const inserelancamento = async (uuid, valor, descr) => {

  const params = {
    TableName: table,
    Item: {
      "id_lancamento":  {S: uuid} ,
      "valor": {N: valor},
      "descricao": {S: descr}}
  }
  
  return new Promise( (resolve, reject) => {
  ddb.putItem(params, function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data);
    }})
})
}

export const consultalancamentos = async () => {

  const params = {
    TableName: table
  }
    return new Promise( (resolve, reject) => {
      ddb.scan(params, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data.Items)
        }
      })
    })
}



