const express = require('express')
const cors = require('cors')
const createPayment = require('./create-payment')
const checkingPayment = require('./checking-payment')

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/payment', createPayment)
app.post('/checking-payment', checkingPayment)

app.listen(8080, () => {
  console.log('Node payment gateway run on port 8080!');
})
