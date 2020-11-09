import express from 'express'
import bodyParser from 'body-parser'
import Quote from '../models/quote.js'
import checkAuth from '../middleware/auth'

const router = express.Router()

router.get('/', (req, res, next) => {
  Quote.find({})
    .then(quotes => {
      res.status(200).send(quotes)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.get('/:id', (req, res, next) => {
  Quote.findById(req.params.id)
    .then(quote => {
      res.status(200).send(quote)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

// todo: make private
router.get('/:user', (req, res, next) => {
  console.log(req.params.user)
  Quote.find({ user: req.params.user })
    .exec()
    .then(quotes => {
      res.status(200).send(quotes)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.post(`/`, (req, res, next) => {
  const newQuote = {
    quote: req.body.data.quote,
    author: req.body.data.author,
    categories: req.body.data.categories,
    tags: req.body.data.tags,
    links: req.body.data.links,
    like: req.body.data.like,
    notes: req.body.data.notes,
  }
  // check quote does not already exist
  console.log('post', req)
  Quote.exists({ quote: newQuote.quote })
    .then(result => {
      if (result) {
        res.status(409).send('quote already exist')
      } else {
        Quote.create(newQuote)
          .then(quote => res.status(200).send(quote))
          .catch(err => next(err))
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.put(`/:id`, (req, res, next) => {
  console.log(req.body.data)
  const quoteUpdate = {
    quote: req.body.data.quote,
    author: req.body.data.author,
    categories: req.body.data.categories,
    tags: req.body.data.tags,
    links: req.body.data.links,
    like: req.body.data.like,
    notes: req.body.data.notes,
  }

  Quote.findByIdAndUpdate(req.params.id, req.body.data, {
    new: true,
  })
    .exec()
    .then(quote => res.status(200).send(quote))
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.delete('/:id', (req, res, next) => {
  Quote.findByIdAndRemove(req.params.id)
    .then(quote =>
      res.status(200).send(`Quote id ${quote._id} was deleted`)
    )
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

export default router
