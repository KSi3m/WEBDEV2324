const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/';
const dbName = 'galleryDB';

mongoose.connect(url+dbName);