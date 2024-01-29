const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    title:
    {
        type:String,
        required: true
    },
    summary:{
        type:String
    },
    date: {
        type:Date,
        default: Date.now
    },
    pictures: [{ type: Schema.Types.ObjectId, ref: 'Picture' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]

})

const Gallery = mongoose.model('Gallery',GallerySchema)

module.exports = Gallery