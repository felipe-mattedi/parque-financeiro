import { inserelancamento, consultalancamentos, inicializaaws } from './dynamo.js'
import uuid from 'uuid/v4.js';
import express from 'express'
import bodyParser from 'body-parser'
import logger from './logger.js'
import { inicializalogger, inicializacatcher } from './middleware.js'
import axios from 'axios'
import { gettoken, autenticador, deletetoken } from './auth.js'
import { conectacache, inserechache, deletacache, recuperacache } from './elasticache.js'
const app = express()
const port = process.env.PORT || 3000

const router = express.Router();

router.post('/lancamento', async (req, res) => {
  if (!req.body.descricao || !req.body.valor) {
    res.status(400).send({ status: "NOK", motivo: "Campo 'desricao' e 'valor' são obrigatórios para lancamentos" })
    return
  }
  try {
    await deletacache()
    let uuidv4 = uuid()
    await inserelancamento(uuidv4, req.body.valor, req.body.descricao)
    res.status(200).send({ status: 'OK', id: uuidv4 })
  }
  catch (resposta) {
    res.status(resposta.statusCode || 500)
    next(resposta)
  }
})

router.get('/consulta', async (req, res, next) => {
  try {
    let consulta = await recuperacache("consulta")
    logger.info(consulta)
    if(!consulta){ 
      consulta = await consultalancamentos()
      await inserechache("consulta", consulta)
    }
      let saldo = 0
      for (const k in consulta) {
      saldo = saldo + parseFloat(consulta[k].valor.N)
    
    consulta.push({ saldo_total: saldo })

    }
    
    res.status(200).send(consulta)
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
  }
  catch (resposta) {
    res.status(resposta.response.status || 500)
    next(resposta)
  }
})

router.delete('/token', async (req, res) => {
  deletetoken()
  res.status(200).send()
}
)

router.get('/', async (req, res) => {
  res.status(200).send()
}
)


inicializaaws()
await conectacache()
app.use(bodyParser())
app.use(inicializalogger())
app.use(autenticador())
app.use('/', router)
app.use(inicializacatcher())
app.listen(port, () => {
  logger.info(`SERVIDOR EM LISTEN - PORTA ${port}`)
})
