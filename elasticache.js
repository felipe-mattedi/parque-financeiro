import RedisClient from 'redis';
    

  export const conectacache = async () => {

    var redis = RedisClient.createClient({
      host: 'cache-parque-fin.z4xuiz.0001.use2.cache.amazonaws.com',
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
    redis.del(chave, valor, function (err, data) {
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

await conectacache()
console.log('tentativa inserção')
console.log(await inserechache("resultado","felipe"))
console.log('tentativa leitura')
console.log(await recuperacache("resultado"))