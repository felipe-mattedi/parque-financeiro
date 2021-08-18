import { inserelancamento, consultalancamentos, inicializaaws } from './dynamo.js'
import uuid from 'uuid/v4.js';
import express from 'express'
import bodyParser from 'body-parser'
import logger from './logger.js'
import { inicializalogger, inicializacatcher } from './middleware.js'
import axios from 'axios'
import { gettoken, autenticador, deletetoken } from './auth.js'
import { inicializametrics, starttime, endtime } from './estatistica.js'
import { conectacache, inserechache, deletacache, recuperacache } from './elasticache.js'
const app = express()
const port = process.env.PORT || 3000

const router = express.Router();

router.post('/lancamento', async (req, res, next) => {
  if (!req.body.descricao || !req.body.valor) {
    res.status(400).send({ status: "NOK", motivo: "Campo 'desricao' e 'valor' são obrigatórios para lancamentos" })
    next()
  }
  try {
    await deletacache("consulta")
    let uuidv4 = uuid()
    await inserelancamento(uuidv4, req.body.valor, req.body.descricao)
    res.status(200).send({ status: 'OK', id: uuidv4 })
    next()
  }
  catch (resposta) {
    res.status(resposta.statusCode || 500)
    next(resposta)
  }
})

router.get('/consulta', async (req, res, next) => {
  try {
    let consulta = await recuperacache("consulta")
    if(!consulta){ 
      consulta = await consultalancamentos()
      await inserechache("consulta", JSON.stringify(consulta))
    }
    else{
      consulta = JSON.parse(consulta)
    }
      let saldo = 0
      for (const k in consulta) {
      saldo = saldo + parseFloat(consulta[k].valor.N)
    }
    
    consulta.push({ saldo_total: saldo })
    res.status(200).send(consulta)
    next()
  }
  catch (resposta) {
    res.status(resposta.statusCode || 500)
    next(resposta)
  }
})


router.get('/balanco', async (req, res, next) => {
  let creditoinicial = 0
  let valor = 0
  try {
    let resposta = await axios.get('http://parque-ingressos.herokuapp.com/exportacompras', {
      headers: {
        Authorization: await gettoken()
      }
    })
    for (const k in resposta.data) {
      creditoinicial = creditoinicial + resposta.data[k].creditoInicial
      valor = valor + resposta.data[k].valor
    }
    let total = creditoinicial + valor
    res.status(200).send({ creditoinicial: creditoinicial, valor: valor, total: total })
    next()
  }
  catch (resposta) {
    res.status(resposta.response.status || 500)
    next(resposta)
  }
})

router.delete('/token', async (req, res, next) => {
  deletetoken()
  res.status(200).send()
  next()
}
)

router.get('/', async (req, res, next) => {
  res.status(200).send()
  next()
}
)


inicializaaws()
inicializametrics()
await conectacache()
app.use(bodyParser())
app.use(inicializalogger())
app.use(starttime())
app.use(autenticador())
app.use('/', router)
app.use(inicializacatcher())
app.use(endtime())
const server = app.listen(port, () => {
  logger.info(`SERVIDOR EM LISTEN - PORTA ${port}`)
})

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.on('SIGKILL', shutDown);

async function shutDown() {
  logger.info(`TERMINO DO SISTEMA`)
  await deletetoken()
  server.close(() => {
      process.exit(0);
  })} 