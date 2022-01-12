// implement your posts router here
const express = require('express');
const Post = require('./posts-model.js');
const router = express.Router();

router.get('/');

router.get('/', (req, res) => {
	Post.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'Error retrieving the posts'
			});
		});
});

module.exports = router;
