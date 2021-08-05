import  logger  from './logger.js'
import axios from 'axios'
import { getParam } from './ssm.js'

let authresponse

export const tryauth = () => {
  let verificatoken = async function (req,res,next){
    if(!authresponse){
    logger.info(`Tentativa de autenticação`)
    try{
      let parametro = await getParam("user")
      let user = parametro.Parameter.Value.split(',')[0]
      let pass = parametro.Parameter.Value.split(',')[1]
      let resposta = await axios.post("https://radiant-forest-78564.herokuapp.com/login/",{
        "user": user,
        "pass": pass
        })
      authresponse = resposta.data
    }
    catch(erro){
      res.status(403).send('Acesso Negado')
    }
  }
  next()
}
  return verificatoken
}

export const autenticador =  () => {
  let auth =  async function (req, res, next) {
    if(req.path != '/'){
    logger.info(`Verificação de token`)
    try{
      let resultado = await axios.post("https://radiant-forest-78564.herokuapp.com/login/authorize", {
      "token": req.header('authorization')})
    }
    catch(erro){
      res.status(403).send('Acesso Negado')
    }
  }
  next()
}
  return auth
}

