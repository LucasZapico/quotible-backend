import mongoose from 'mongoose'
import Joi from 'joi'

const QuoteSchema = new mongoose.Schema({
    author: String,
    categories: Object,
    quote: String,
    notes: String,
    links: [],
    like: Number,
    created: { type: Date, default: Date.now }, 
})

QuoteSchema.methods.joiValidate = (obj) => {
    const schema = {
        author: Joi.types.String().min(6),
        quote: joi.types.String().min(5).required(),
        created: Joi.types.Date(),
    }
    return Joi.validate(obj, schema)
}

mongoose.model('Quote', QuoteSchema)
export default mongoose.model('Quote')
