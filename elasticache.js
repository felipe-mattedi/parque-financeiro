import RedisClustr from 'redis-clustr'
import RedisClient from 'redis';

export const redisc = () => {

  var redis = new RedisClustr({
    servers: [
        {
            host: 'https://parque-cache-fin.z4xuiz.0001.use2.cache.amazonaws.com',
            port: 6379
        }
    ],
    createClient: function (port, host) {
        return RedisClient.createClient(port, host);
    }
  });
  
  //connect to redis
  redis.on("connect", function () {
    console.log("connected");
  });
  
  //check the functioning
  redis.set("framework", "AngularJS", function (err, reply) {
    console.log("redis.set " , reply);
    logger.info(`elemento adicionado ${reply}`)
  });
  
  redis.get("framework", function (err, reply) {
    logger.info(`elemento resgatado ${reply}`);
  });

}
