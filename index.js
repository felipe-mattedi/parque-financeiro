import { inserelancamento, consultalancamentos } from './dynamo.js'
import uuid from 'uuid/v4.js';
import express  from 'express'
const app = express()
const port =  process.env.PORT || 3000

const router = express.Router();

router.get('/inserevalor/:valor', (req, res) => {
  inserelancamento(uuid(), valor)
  res.status(200).send({resposta: 'valor inserido com sucesso'})
})

router.get('/consulta', (req, res) => {
  res.status(200).send(consultalancamentos())
})

router.get('/lancamento', (req, res) => {
  res.status(200)
  res.send('OK')
})

router.post('/fechamento', (req, res) => {
  res.status(200)
  res.send('OK')
})

app.use('/',router)

app.listen(port, () => {
  console.log(`Sistema inicializado em ${port}`)
})
