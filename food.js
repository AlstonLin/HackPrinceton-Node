var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = mongoose.Schema({
  name: String,
  calories: { type: Number, default: 0 },
  colesterol: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  protien: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
  sodium: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('food', foodSchema);
