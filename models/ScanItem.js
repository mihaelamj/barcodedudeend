var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScanItemModel = new Schema({
    text: {type: String, required: true},
    format: {type: String, required: true},
    author: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    hyperlink: {type: Boolean, default:false},
    correct: {type: Boolean, default:false}
});

module.exports= mongoose.model('ScanItem', ScanItemModel);
