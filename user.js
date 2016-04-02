var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Not sure at all, but this is a hackathon so whatever
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  totalCalories: { type: Number, default: 0 },
  totalColesterol: { type: Number, default: 0 },
  totalFat: { type: Number, default: 0 },
  totalProtien: { type: Number, default: 0 },
  totalCarbs: { type: Number, default: 0 },
  totalSugar: { type: Number, default: 0 },
  totalSodium: { type: Number, default: 0 },
  foods: [{type : mongoose.Schema.Types.ObjectId, ref: 'food'}]
});

module.exports = mongoose.model('user', userSchema);
