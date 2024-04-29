const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
var mongoose_delete = require('mongoose-delete');

const Course = new Schema({
  name: { type: String, require: true },
  description: { type: String },
  image: { type: String },
  videoId: { type: String,require: true  },
  level: { type: String },
  slug: { type: String, slug: 'name' ,unique:true},
},{
  timestamps:true
});

mongoose.plugin(slug);
mongoose.plugin(mongoose_delete,{ 
  deletedAt : true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
