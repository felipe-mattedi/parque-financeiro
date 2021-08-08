import RedisClustr from 'redis-clustr'
import RedisClient from 'redis';


  var redis = new RedisClient({
    servers: [
        {
            host: 'cache-parque-fin.z4xuiz.0001.use2.cache.amazonaws.com',
            port: 6379
        }
    ],
    createClient: function (port, host) {
        return RedisClient.createClient(port, host);
    }
  });
  
  console.log('tentativa conexao')
  //connect to redis


  export const conectacache = async () => {
    return new Promise( (resolve, reject) => {
      redis.on("connect", function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
}
  

  export const inserechache = async (chave, valor) => {
      return new Promise( (resolve, reject) => {
        redis.set(chave, valor, function (err, data) {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
  }
  
  export const recuperacache = async (chave) => {
    return new Promise( (resolve, reject) => {
      redis.get(chave, function (err, data) {
        if (err) {
          reject(err)
        } else {
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