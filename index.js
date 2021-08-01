import { inserelancamento, consultalancamentos, inicializaaws } from './dynamo.js'
import uuid from 'uuid/v4.js';
import express  from 'express'
import bodyParser from 'body-parser'
const app = express()
const port =  process.env.PORT || 3000

const router = express.Router();

router.post('/lancamento', async (req, res) => {
  try{
    let uuidv4 = uuid()
    await inserelancamento(uuidv4, req.body.valor, req.body.descricao)
    res.status(200).send({status: 'OK', id: uuidv4})
  }
  catch(resposta){
    res.status(resposta.statusCode || 500).send(resposta || '')
  }
})

router.get('/consulta', async (req, res) => {
  try{
    let consulta = await consultalancamentos()
    let saldo = 0
    for (const k in consulta){
      saldo = saldo + parseFloat(consulta[k].valor.N)
    }
    consulta.push({saldo_total: saldo}) 
    res.status(200).send(consulta)
  }
  catch(resposta){
    res.status(resposta.statusCode || 500).send(resposta)
  }
})


inicializaaws()
app.use(bodyParser())
app.use('/',router)
app.listen(port, () => {
  console.log(`Sistema inicializado em ${port}`)
})
