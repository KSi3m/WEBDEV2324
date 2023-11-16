'use strict';
module.exports = {
	listImages,
	createImage,
	readImage,
	updateImage,
	deleteImage
};


var id_counter = 0;
var testData = {
	id: "0123456789abcd",
	title: "Testowy obrazek",
	description: "Opis do obrazka",
	date: "2017-11-09T10:20:00.214Z",
	path: "/library/images/",
	size: 1024
};
var createImageTestData = {
	"id": "Sample text",
	"title": "Sample text",
	"description": "sample text",
	"date": "2023-11-16T15:47:21.926Z",
	"path": "Sample text",
	"size": 1
}
var images = {};
images['images'] = []
images['images'].push({"id": "Sample text",
			"title": "Sample sex",
			"path": "Sample text"})


function listImages(req, res, next) {
	console.log(images);
	res.json(images);
}
function createImage(req, res, next) {
	
	
	var title = req.swagger.params.title.value;
	var description = req.swagger.params.description.value
	var original_name = req.swagger.params.upfile.value.originalname
	
	createImageTestData['title'] = title;
	createImageTestData['description'] = description;
	createImageTestData['path'] = "/library/images/"+original_name;
	createImageTestData['id']=id_counter.toString();
	id_counter += 1;
	
	images['images'].push({"id": createImageTestData['id'],
			"title": createImageTestData['description'],
			"path": createImageTestData['path']})
	
	console.log(images);
	res.json(createImageTestData);
}
function readImage(req, res, next) {
	res.json(testData);
}
function updateImage(req, res, next) {
	
	var id = req.swagger.params.id.value;
	var title = req.swagger.params.image.value.title;
	var description = req.swagger.params.image.value.description;
	var date = req.swagger.params.image.value.date;
	
	
	testData['id'] = id;
	testData['title'] = title;
	testData['description'] = description;
	testData['date'] = date;
	
	res.json(testData);
}
function deleteImage(req, res, next) {
	var id = req.swagger.params.id.value;
	var tempArr = []
	for (const x of images['images']){
		if (id !== x['id'])
		{
			tempArr.push(x)
		}
	}
	images['images'] = tempArr;
	var deleteImageTestData = {
		"id": id,
		"status": "Deleted",
	}
	res.json(deleteImageTestData);
}