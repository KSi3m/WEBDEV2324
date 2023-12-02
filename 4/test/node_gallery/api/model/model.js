const thinkagain = require('thinkagain')();

var Gallery = thinkagain.createModel('Gallery', {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
		images: { type: 'array', items: { type: 'object' } }
    },
    required: ['name']
});

var Image = thinkagain.createModel('Image', {
	type: 'object',
	properties: {
		id: { type: 'string' },
		title: { type: 'string' },
		description: { type: 'string' },
		date: {type: 'string', format:'date-time'},
		path: { type: 'string' },
		size: { type: 'integer'},
		idGallery: { type: 'string' }
	},
	required: [ 'title', 'path' ]
});


Image.belongsTo(Gallery, 'gallery', 'idGallery', 'id');

exports.Image = Image;
exports.Gallery = Gallery;