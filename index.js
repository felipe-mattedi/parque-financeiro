const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.status(200)
  res.send('OK')
})

app.get('/health', (req, res) => {
  res.status(200)
  res.send('OK')
})

app.listen(port, () => {
  console.log(`Sistema inicializado em ${port}`)
})