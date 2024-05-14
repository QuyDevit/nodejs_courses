const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoose_delete = require('mongoose-delete');

const User = new Schema({
  username: { type: String, require: true },
  password: { type: String },
  email: { type: String },
  avatar:{ type: String }
},{
  timestamps:true
});

mongoose.plugin(mongoose_delete,{ 
  deletedAt : true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('User', User);
