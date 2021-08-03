import  logger  from './logger.js'

export const inicializalogger = () => {
  var logs = function (req, res, next) {
    if(req.path != '/'){
      logger.info(`Acesso em API ${req.path}`)
    }
    next();
  };
  return logs
}

export const inicializacatcher = () => {
  var catcher = function (error, req, res, next) {
    logger.error(`Erro em API ${req.path} - ${error}`)
    res.end()
  };
  return catcher
}
