import mongoose from 'mongoose'
import Joi from 'joi'

const QuoteSchema = new mongoose.Schema({
  user: String,
  quote: String,
  author: String,
  private: Boolean,
  categories: Object,
  tags: Object,
  notes: String,
  links: [],
  like: Number,
  created: { type: Date, default: Date.now },
})

QuoteSchema.methods.joiValidate = obj => {
  const schema = {
    user: Joi.types.String().required(),
    quote: Joi.types.String().min(5).required(),
    author: Joi.types.String().min(6).required(),
    private: Joi.types.Boolean(),
    categories: Joi.types.Object(),
    tags: Joi.types.Object(),
    notes: Joi.types.String(),
    links: Joi.types.Object(),
    like: Joi.types.Number(),
    created: Joi.types.Date(),
  }
  return Joi.validate(obj, schema)
}

mongoose.model('Quote', QuoteSchema)
export default mongoose.model('Quote')
