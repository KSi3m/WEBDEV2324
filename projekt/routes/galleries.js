const express = require('express')
//const short = require('short-uuid');

//const uuid = short();

//function generateShortUniqueId() {
//  return uuid.new();
//}

const router = express.Router();
var gallery_controller = require('../controllers/galleryController')


router.get('/',gallery_controller.index);
router.get('/galleryList',gallery_controller.gallery_list);
router.post('/add',gallery_controller.add_new_gallery);

router.get('/:id',gallery_controller.get_gallery);

router.put('/:id', gallery_controller.update_gallery);
router.delete('/:id', gallery_controller.delete_gallery);


router.post('/:id/addPicture',gallery_controller.add_picture);
router.get('/:id/getPictures', gallery_controller.get_pictures);
router.delete('/:id/deletePicture/:pic_id/', gallery_controller.delete_picture);




console.log("router gotowy")

module.exports = router;