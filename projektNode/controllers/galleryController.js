const Picture = require('../model/picture');
const Gallery = require('../model/gallery');
const Tag = require('../model/tag');

exports.index = function(req,res) {
    console.log("wywolanie get index")
    res.send("To implement INDEX")
};

exports.gallery_list = function(req,res) {
    let gallery_list
    const getGalleries = async () =>
    {
        try  {
            gallery_list = await Gallery.find()
            console.log(gallery_list)
            res.send(gallery_list)
        }
        catch(error){
            console.log(error)
        }
    }
    getGalleries()
};
exports.add_new_gallery = function(req,res) {
    try {
        const fields = {};
        for (const key in req.body) {
          if (Object.prototype.hasOwnProperty.call(req.body, key)) {
            fields[key] = req.body[key];
          }
        }
          const gallery = new Gallery(fields)
          gallery.save()
          console.log(gallery);
          res.send("New gallery added");
      } catch (error) {
          console.error('Error adding gallery:', error);
    }
};

exports.get_gallery = async (req, res) => {
    try {
      const galleryId = req.params.id;

      const gallery = await Gallery.findById(galleryId);
  
      if (!gallery) {
        return res.send('Gallery not found');
      }

      res.send(gallery);
    } catch (error) {
      console.error('Error getting gallery:', error);

    }
  };

  exports.delete_gallery = async (req, res) => {
    try {
      const galleryId = req.params.id;
      await Gallery.findByIdAndDelete(galleryId);
      res.send("Gallery has been deleted");
    } catch (error) {
      console.error('Error deleting gallery:', error);

    }
  };

  exports.update_gallery = async (req, res) => {
    try {
      const galleryId = req.params.id;
      const gallery = await Gallery.findById(galleryId);

      if (!gallery) {
        return res.send('Gallery not found');
      }
  
      const updateFields = {};
      for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
          updateFields[key] = req.body[key];
        }
      }
      updateFields['date'] = Date.now()
      Object.assign(gallery, updateFields);
      await gallery.save();

      //res.send("Picture has been updated successfully!");
      res.json({ message: 'Gallery updated successfully', updatedGallery: gallery });
    } catch (error) {
      console.error('Error updating gallery:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.get_pictures = function(req,res) {

    const getPictures = async () =>
    {
        try  {
            const galleryId = req.params.id;
            const gallery = await Gallery.findById(galleryId);

            if (!gallery) {
                return res.send('Gallery not found');
            }
            
            await gallery.populate('pictures')

            console.log(gallery.pictures)
            res.send(gallery.pictures)
        }
        catch(error){
            console.log(error)
        }
    }
    getPictures()
};

  exports.add_picture = async (req, res) => {
    try {
      let galleryId = req.params.id;

      let gallery = await Gallery.findById(galleryId);
  
      if (!gallery) {
        return res.send('Gallery not found');
      }
      const pictureId = req.body.pic_id;
      picture = await Picture.findById(pictureId);

      gallery.pictures.push(picture)
      await gallery.save()
      res.send("Picture has been added");
    } catch (error) {
      console.error('Error adding picture:', error);

    }
  };


  exports.delete_picture = async (req, res) => {
    
    try {

      let galleryId = req.params.id;
      let gallery = await Gallery.findById(galleryId);

      let pictureId = req.params.pic_id;

      const pictureIndex = gallery.pictures.findIndex(pic => pic && pic.toString() === pictureId);
        
     if (pictureIndex === -1) {
        return res.status(404).send('Picture not found in the gallery');
      }
  
      gallery.pictures.splice(pictureIndex, 1);
      await gallery.save();
      res.send("Picture has been removed from gallery");
    } catch (error) {
      console.error('Error removing picture:', error);

    }
  };


console.log('kontroler gotowy')