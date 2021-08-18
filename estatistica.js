import AWS from 'aws-sdk'

let start
let end
let cw

export const inicializametrics = () => {
  AWS.config.update({
    region: "us-east-2"
  });
  cw = new AWS.CloudWatch({apiVersion: '2010-08-01'});
}

function inserecw(api, tempo){

  let params = {
    MetricData: [
      {
        MetricName: 'TEMPO_RESPOSTA',
        Dimensions: [
          { 
            Name: "API",
            Value: api || 'N/A',
          },
        ],
        Unit: "Milliseconds",
        Value: tempo
      },
    ],
    Namespace: 'PARQUE_FINANCEIRO'
  };
  
  cw.putMetricData(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", JSON.stringify(data));
    }
  });


}

export const starttime = () => {
  let iniciatempo = function(req, res, next)
    {
    start = new Date()
    next()
  }
  return iniciatempo
}

export const endtime = () => {
  let finalizatempo = function (req,res,next){
    end = new Date() - start
    if(req.path != '/'){
      inserecw(req.path, end)
    }
    next()
  }
  return finalizatempo
}
