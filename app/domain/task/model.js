const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
}

const taskSchema = new Schema({
  title: {type: String, required: true},
  done: {type: Boolean, default: false},
  author: { type: Schema.Types.ObjectId, ref: 'User' }
}, schemaOptions);


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;