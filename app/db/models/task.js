const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model
const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Pole nazwy jest wymagane'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Pole opisu jest wymagane'],
    minLength: [3, 'Minimalna liczba znaków opisu to 3'],
  },
  done: {
    type: Number,
    default: 0,
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;