const RedisClustr = require('redis-clustr')
const RedisClient = require('redis');


  var redis = new RedisClustr({
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
  redis.on("connect", function () {
    console.log("connected");
  });
  
  //check the functioning
  redis.set("framework", "AngularJS", function (err, reply) {
    console.log("redis.set " , reply);
  
  });
  
  redis.get("framework", function (err, reply) {
    console.log("redis.get " , reply);
  });
