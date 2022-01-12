// implement your posts router here
const express = require('express');
const Post = require('./posts-model.js');
const router = express.Router();

router.get('/');

//GET can get the correct number of posts, can get all the correct posts (4 ms)
router.get('/', (req, res) => {
	Post.find()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'The posts information could not be retrieved'
			});
		});
});

//GET can get all the correct posts by id, responds with a 404 if the post is not found
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts);
			} else {
				res.status(404).json({ message: 'The post with the specified ID does not exist' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'Error retrieving the post'
			});
		});
});

module.exports = router;
