const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PictureSchema = new Schema({

    title:
    {
        type:String,
        required:true
    },
    path:
    {
        type:String,
        default: '/images'
    },
    size: 
    {
        type: Number,
        max: 10000
    },
    date: {
        type:Date,
        default: Date.now
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', autopopulate: true  }],
})




PictureSchema.plugin(require('mongoose-autopopulate'));

PictureSchema.pre('remove', async function (next) {
    try {
      const Comment = mongoose.model('Comment');
  

      await Comment.deleteMany({ _id: { $in: this.comments } });
  
      next();
    } catch (error) {
      next(error);
    }
  });



const Picture = mongoose.model('Picture',PictureSchema)

module.exports = Picture