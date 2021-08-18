import  logger  from './logger.js'

export const inicializalogger = () => {
  let logs = function (req, res, next) {
    if(req.path != '/'){
      logger.info(`Acesso em API ${req.path}`)
    }
    next();
  };
  return logs
}

export const inicializacatcher = () => {
  let catcher = function (error, req, res, next) {
    logger.error(`Erro em API ${req.path} - ${error}`)
    res.send('Não foi possível efetuar a solicitação')
    next()
  };
  return catcher
}

