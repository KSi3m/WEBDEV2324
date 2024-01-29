const express = require('express')
//const short = require('short-uuid');

//const uuid = short();

//function generateShortUniqueId() {
//  return uuid.new();
//}

const router = express.Router();
var picture_controller = require('../controllers/pictureController')


router.get('/',picture_controller.index);
router.get('/picturesList',picture_controller.picture_list);


router.get('/add',picture_controller.add_new_picture_get);
router.post('/add',picture_controller.add_new_picture);
router.put('/:id', picture_controller.update_picture);
router.delete('/:id', picture_controller.delete_picture);
router.get('/:id',picture_controller.get_picture);

router.get('/:id/comments',picture_controller.get_comments);
router.post('/:id/addComment', picture_controller.add_comment);
router.put('/:id/editComment/:id_c', picture_controller.edit_comment);
router.delete('/:id/deleteComment/:id_c', picture_controller.delete_comment);

console.log("router gotowy")

module.exports = router;