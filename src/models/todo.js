const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: {type:String},
    name: { type: String},
    descript: { type: String},
    status: { type: String },
    UserId: { type: String },
    Date_complete: { type: Date }
  },
  {
    collection: 'TODO',
    timestamps:{createdAt: 'Date_creation',updateAt: 'Date_modify'}
  });
module.exports = mongoose.model('TODO', schema);