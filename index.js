import { inserelancamento } from 'dynamo.js'
import { v4 as uuidv4 } from 'uuid'
const express = require('express')
const app = express()
const port =  process.env.PORT || 3000


const router = express.Router();

router.get('/consulta', (req, res) => {

  inserelancamento(uuidv4(), 356)
  res.status(200).send({resposta: 'valor inserido com sucesso'})
})

router.post('/lancamento', (req, res) => {
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
