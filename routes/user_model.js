var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String }
    , email: String
    , ip: String
    , result: String
    , token: String
});
module.exports = mongoose.model('users', userSchema);
