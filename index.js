const express = require('express')
const app = express()
const port = 5000

const router = express.Router();

router.get('/consulta', (req, res) => {
  res.status(200).send({saldo: 23,
  observacao: 'socorro'})
})

router.post('/lancamento', (req, res) => {
  res.status(200)
  res.send('OK')
})

router.post('/fechamento', (req, res) => {
  res.status(200)
  res.send('OK')
})

app.use('/birds',router)

app.listen(port, () => {
  console.log(`Sistema inicializado em ${port}`)
})
