const Nexmo = require('nexmo');
require('dotenv').config();

const nexmo = new Nexmo({
  apiKey: '3726384b',
  apiSecret: 'zxb24BBGjyw31HS2'
})

const from = '19167019179'
const to = '19167019179'
const text = 'Hello from Nexmo'

nexmo.message.sendSms(from, to, text)
