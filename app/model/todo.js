const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
}

const todoSchema = new Schema({
  title: {type: String, required: true},
  done: { type: Boolean, default: false}
}, schemaOptions);


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;