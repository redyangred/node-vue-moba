const mongoose = require('mongoose')

//定义模型字段

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
})

module.exports = mongoose.model('Item', schema)