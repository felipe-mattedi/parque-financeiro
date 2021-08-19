import RedisClient from 'redis';
import logger from './logger.js'
import { getParam } from './ssm.js'
import AWSXRay from 'aws-xray-sdk'
    
  var redis

  export const conectacache = async () => {

    let host = await getParam("elasticache")

    redis = RedisClient.createClient({
      host:  `${host.Parameter.Value}`,
      port: 6379
    });
    logger.info('TENTATIVA DE CONEXÃO - REDIS')
    return new Promise( (resolve, reject) => {
      redis.on("connect", function (err, data) {
        if (err) {
          logger.info('FALHA DE CONEXÃO - REDIS')
          reject(err)
        } else {
          logger.info('CONECTADO - REDIS')
          resolve(data)
        }
      })
    })
}

export const deletacache = async (chave) => {
  return new Promise( (resolve, reject) => {
    redis.del(chave, function (err, data) {
      if (err) {
        logger.info('FALHA DELEÇÃO CACHE - REDIS')
        reject(err)
      } else {
        logger.info('DELETA CACHE - REDIS')
        resolve(data)
      }
    })
  })
}
  
  export const inserechache = async (chave, valor) => {
      return new Promise( (resolve, reject) => {
        redis.set(chave, valor, function (err, data) {
          if (err) {
            logger.info('FALHA INSERÇÃO - REDIS')
            reject(err)
          } else {
            logger.info('INSERE CACHE - REDIS')
            resolve(data)
          }
        })
      })
  }
  
  export const recuperacache = async (chave) => {
    return new Promise( (resolve, reject) => {
      redis.get(chave, function (err, data) {
        if (err) {
          logger.info('FALHA RECUPERAÇÃO CACHE - REDIS')
          reject(err)
        } else {
          logger.info('RECUPERA CACHE - REDIS')
          resolve(data)
        }
      })
    })
}