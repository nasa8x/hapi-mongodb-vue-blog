var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

module.exports = mongoose.model('member', new mongoose.Schema({
    uid: {
        type: String,
        index: true,
        unique: true
    },
    mail: {
        type: String,
        index: true,
        unique: true
    },
    pwd: String,
    fn: String,
    ln: String,
    bth: Date,
    sex: Number,
    //avata
    avt: String,
    //cover
    cv: String,
    //website   
    www: String,
    bio: String,
    // twitter
    tw: {},
    // facebook
    fb: {},
    // github
    git: {},
    // google
    gg: {},
    stt: {
        type: Number,
        default: 0
    },

    crt: {
        type: Date,
        default: Date.now()
    }

}, { collection: 'members' }).plugin(mongoosePaginate));
