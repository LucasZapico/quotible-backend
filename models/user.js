import mongoose from 'mongoose'
import Joi from 'joi'

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
})

UserSchema.methods.joiValidate = obj => {
  const schema = {
    email: Joi.types.String().min(6).required(),
    password: Joi.types.String().min(5).required(),
  }
  return Joi.validate(obj, schema)
}

mongoose.model('User', UserSchema)
export default mongoose.model('User')
