var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScanItemModel = new Schema({
    text: {type: String, required: true},
    format: {type: String, required: true},
    author: {type: String, required: false},
    identifier: {type: String, required: true},
    device: {type: String, required: true},
    ios: {type: String, required: true},
    udid: {type: String, required: true},
    engine: {type: String, required: true},
    date: {type: Date, default: Date.now},
    hyperlink: {type: Boolean, default:false},
    correct: {type: Boolean, default:false}
});

module.exports= mongoose.model('ScanItem', ScanItemModel);
