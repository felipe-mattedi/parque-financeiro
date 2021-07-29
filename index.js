const express = require('express')
const app = express()
const port = 5000

app.get('/health', (req, res) => {
  res.status(200)
  res.send('OK')
})

app.listen(port, () => {
  console.log(`Sistema inicializado em ${port}`)
})
