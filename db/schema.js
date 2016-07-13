const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    // REQUIRED FOR AUTHENTICATION: Do Not Touch
    email: String,
    password: String,
})


const todoSchema = new Schema({
	todo: String,
})

module.exports = {
  User: createModel('User', usersSchema),
  Todo: createModel('Todo', todoSchema)
}