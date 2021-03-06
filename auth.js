import  logger  from './logger.js'
import axios from 'axios'
import { getParam } from './ssm.js'

let authresponse

export const deletetoken = async () => {
  if(authresponse){
    logger.info(`Exclusão de Token`)
    try{
      let resposta = await axios.post("https://radiant-forest-78564.herokuapp.com/login/logoff",{
        "token": authresponse
        })
      logger.info(`Token excluído com sucesso`)
      authresponse = ''
      return
    }
    catch(erro){
      logger.info(`Falha na deleção do Token`)
      throw erro
    }
 }
}

export const gettoken = async () => {
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
      logger.info(`Token obtido com sucesso`)
      authresponse = resposta.data
      console.log(authresponse)
      return authresponse
    }
    catch(erro){
      logger.info(`Falha na obtenção do Token`)
      throw erro
    }
  }
    return authresponse
}


export const autenticador =  () => {
  let auth =  async function (req, res, next) {
    if(req.path != '/'){
    logger.info(`Verificação de token`)
    try{
      let resultado = await axios.post("https://radiant-forest-78564.herokuapp.com/login/authorize", {
      "token": req.header('authorization')})
      if (!resultado.data.role) throw new Error('Não existe regra associada')
    }
    catch(erro){
      res.status(403)
      next(erro)
    }
  }
  next()
}
  return auth
}

