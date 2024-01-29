const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const TagSchema = new Schema({
    title:
    {
        type:String,
        required: true
    },
    pictures: [{ type: Schema.Types.ObjectId, ref: 'Picture' }],
    galleries: [{ type: Schema.Types.ObjectId, ref: 'Gallery' }],
})

const Tag = mongoose.model('Tag',TagSchema)

module.exports = Tag