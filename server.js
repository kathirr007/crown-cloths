// const express = require('express')
import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser'
import path from 'path'
import dotenv from 'dotenv'

process.env.NODE_ENV !== 'production' ? dotenv.config() : ''

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import Stripe from 'stripe'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

// console.log(stripe)

const app = express()

const port = process.env.PORT || 3100

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// for express V4.16.0 and higher
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', function (req, res) {
    res.sendFile(path.__dirname, 'client/build', 'index.html')
  })
}

app.listen(port, (error) => {
  if (error) throw error
  console.log(`Server is listening on ${port}`)
})

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    // currency: 'usd',
    currency: 'inr',
    description: 'Software development services'
  }

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr })
    } else {
      res.status(200).send({ success: stripeRes })
    }
  })
})
