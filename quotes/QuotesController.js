import express from "express";
import bodyParser from "body-parser";
import Quote from "./Quote.js";

const router = express.Router();

// router.use(bodyParser.urlencoded({
//   extended: true
// }))
router.use(bodyParser.json());

router.get("/", (req, res, next) => {
  Quote.find({})
    .then((quotes) => {
      res.status(200).send(quotes);
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  Quote.findById(req.params.id)
    .then((quote) => {
      res.status(200).send(quote);
    })
    .catch((err) => next(err));
});

router.post(`/`, (req, res, next) => {
  const newQuote = {
    author: req.body.author,
    categories: req.body.categories,
    quote: req.body.quote,
    notes: req.body.notes,
  };
  Quote.create(newQuote)
    .then((quote) => res.status(200).send(quote))
    .catch((err) => next(err));
});

router.put(`/:id`, (req, res, next) => {
  const quoteUpdate = {
    author: req.body.author,
    categories: req.body.categories,
    quote: req.body.quote,
    notes: req.body.notes,
  };
  Quote.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((quote) => res.status(200).send(quote))
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  Quote.findByIdAndRemove(req.params.id)
    .then((quote) => res.status(200).send(`Quote id ${quote._id} was deleted`))
    .catch((err) => next(err));
});

export default router;
