const mongoose = require('mongoose')
module.exports = mongoose.model('feedbacks',mongoose.Schema({
    userData : Object,
    message  : String,
}))