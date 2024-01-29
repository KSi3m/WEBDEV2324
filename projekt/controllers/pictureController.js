const Picture = require('../model/picture');
const Comment = require('../model/comment');

exports.index = function(req,res) {
    console.log("wywolanie get index")
    res.render('index',{title:'Galeria',parametr:true, tablica :[1,2,3], zmienna:5});
};

exports.picture_list = function(req,res) {
    let picturesList
    const getPictures = async () =>
    {
        try  {
            picturesList = await Picture.find()
            console.log(picturesList)
            //res.send(picturesList)
            //*res.sendFile(__dirname + '/index.html')
            res.render('index',{title:"Gallery",items:picturesList});
        }
        catch(error){
            console.log(error)
        }
    }
    getPictures()
};

exports.add_new_picture_get = function(req,res) {
  res.render('create')
};

exports.add_new_picture = function(req,res) {
    console.log("kek")
  
  try {
      const fields = {};
      for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
          fields[key] = req.body[key];
        }
      }
        const picture = new Picture(fields)
        picture.save()
        console.log(picture);
        res.send("New picture added");
    } catch (error) {
        console.error('Error adding picture:', error);
  }
};

exports.get_picture = async (req, res) => {
    try {
      const pictureId = req.params.id;

      const picture = await Picture.findById(pictureId);
  
      if (!picture) {
        return res.send('Picture not found');
      }

      res.send(picture);
    } catch (error) {
      console.error('Error getting picture:', error);

    }
  };

  exports.delete_picture = async (req, res) => {
    try {
      const pictureId = req.params.id;

      const picture = await Picture.findById(pictureId);
  
      if (!picture) {
        return res.send('Picture not found');
      }
      await Comment.deleteMany({ _id: { $in: picture.comments } })
      await Picture.findByIdAndDelete(pictureId);
      res.send("Picture has been deleted");
    } catch (error) {
      console.error('Error deleting picture:', error);

    }
  };

  exports.update_picture = async (req, res) => {
    try {
      const pictureId = req.params.id;
      const picture = await Picture.findById(pictureId);

      if (!picture) {
        return res.send('Picture not found');
      }
  
      const updateFields = {};
      for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
          updateFields[key] = req.body[key];
        }
      }
      updateFields['date'] = Date.now()
      Object.assign(picture, updateFields);
      await picture.save();

      //res.send("Picture has been updated successfully!");
      res.json({ message: 'Picture updated successfully', updatedPicture: picture });
    } catch (error) {
      console.error('Error updating picture:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  exports.get_comments = function(req,res) {

    const getComments = async () =>
    {
        try  {
            const pictureId = req.params.id;
            const picture = await Picture.findById(pictureId);

            if (!picture) {
                return res.send('Picture not found');
            }
            
            await picture.populate('comments')

            console.log(picture.comments)
            res.send(picture.comments)
        }
        catch(error){
            console.log(error)
        }
    }
    getComments()
};

  exports.add_comment = async (req, res) => {
    try {
      let pictureId = req.params.id;

      let picture = await Picture.findById(pictureId);
  
      if (!picture) {
        return res.send('Picture not found');
      }
      const content = req.body.content;
      let new_comment = new Comment({content:content})
      await new_comment.save()

      picture.comments.push(new_comment)
      await picture.save()
      res.send("Comment has been added");
    } catch (error) {
      console.error('Error adding comment:', error);

    }
  };

  exports.edit_comment = async (req, res) => {
    try {
      let pictureId = req.params.id;

      let picture = await Picture.findById(pictureId);
  
      if (!picture) {
        return res.send('Picture not found');
      }
      const commentId = req.params.id_c;
      let comment = await Comment.findById(commentId);

      if (!comment) {
        return res.send('Comment not found');
      }

      const updateFields = {};
      for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
          updateFields[key] = req.body[key];
        }
      }
      updateFields['date'] = Date.now()

      Object.assign(comment, updateFields);
      await comment.save()
     
      res.send("Comment has been updated");
    } catch (error) {
      console.error('Error updating comment:', error);

    }
  };

  exports.delete_comment = async (req, res) => {
    try {
      let pictureId = req.params.id;

      let picture = await Picture.findById(pictureId);
  
      if (!picture) {
        return res.send('Picture not found');
      }
      const commentId = req.params.id_c;
      await Comment.findByIdAndDelete(commentId);

      res.send("Comment has been deleted");
    } catch (error) {
      console.error('Error deleting comment:', error);

    }
  };


console.log('kontroler gotowy')