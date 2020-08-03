import express from 'express'
import bodyParser from 'body-parser'
import Quote from './Quote.js'

const router = express.Router()

// router.use(bodyParser.urlencoded({
//   extended: true
// }))
router.use(bodyParser.json())

router.get('/', (req, res, next) => {
  Quote.find({},(err, quotes) => {
    if(err){
      next(err)
    } else {
      res.status(200).send(quotes)
    }
  })  
 })

 router.get('/:id', (req, res, next) => {
  Quote.findById(req.params.id,(err, quotes) => {
    if(err){
      next(err)
    } else {
      res.status(200).send(quotes)
    }
  })  
 })

router.post(`/`, (req, res, next) => {
  const newQuote = {
    author: req.body.author, 
    categories: req.body.categories,
    quote: req.body.quote,
    notes: req.body.notes,
  }
  Quote.create(newQuote,(err, quote) => {
    if(err){
      next(err)
    } else {
      res.status(200).send(quote)
    }
  })
})

router.put(`/:id`, (req, res, next) => {
  const quoteUpdate = {
    author: req.body.author, 
    categories: req.body.categories,
    quote: req.body.quote,
    notes: req.body.notes,
  }
  Quote.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, quote) => {
    if(err){
      next(err)
    } else {
      res.status(200).send(quote)
    }
  })
})

router.delete('/:id', (req, res, next)=> {
  Quote.findByIdAndRemove(req.params.id, (err, quote) => {
    if(err) {
      next(err)
    } else {
      res.status(200).send('quote was delted')
    }
  })
})


export default router;