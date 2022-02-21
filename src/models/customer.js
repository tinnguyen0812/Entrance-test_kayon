const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    idc: { type: String},
    username: { type: String },
    password: { type: String },
  },
  {
    collection: 'CUSTOMER'
  });
module.exports = mongoose.model('CUSTOMER', schema);