import mongoose from 'mongoose'



const DB = process.env.DATABASEURL
console.log(typeof(DB))
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
    .then(client => {
      console.log(`${client} connected to database`)
      
      
    })
    .catch(error => console.error(error))

const db = mongoose.connection;
db.once('open', ()=> {
  // console.log('db', db.databaseName)
})

export default db;

