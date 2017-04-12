const express = require('express')
const app = express()
const port = process.env.PORT || 3030

app.use(express.static('dist'))

app.listen(port, function () {
  console.log('Listening on port ' + port)
})
