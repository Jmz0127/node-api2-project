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

//POST
router.post('/', (req, res) => {
	const { title, contents } = req.body;
	if (!title || !contents) {
		res.status(400).json({
			message: 'Please provide title and contents for the post'
		});
	} else {
		Post.insert({ title, contents })
			.then(({ id }) => {
				return Post.findById(id);
			})
			.then((post) => {
				res.status(201).json(post);
			})
			.catch((err) => {
				res.status(500).json({
					message: 'The posts information could not be retrieved',
					err: err.message,
					stack: err.stack
				});
			});
	}
});

//DELETE
router.delete('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			res.status(404).json({
				message: 'The post with the specified ID does not exist'
			});
		} else {
			await Post.remove(req.params.id);
			res.json(post);
		}
	} catch (err) {
		res.status(500).json({
			message: 'The post could not be removed',
			err: err.message,
			stack: err.stack
		});
	}
});

//PUT
router.put('/:id', (req, res) => {
	const { title, contents } = req.body;
	if (!title || !contents) {
		res.status(400).json({
			message: 'Please provide title and contents for the post'
		});
	} else {
		Post.findById(req.params.id)
			.then((stuff) => {
				if (!stuff) {
					res.status(404).json({
						message: 'The post with the specified ID does not exist'
					});
				} else {
					return Post.update(req.params.id, req.body);
				}
			})
			.then((data) => {
				if (data) {
					return Post.findById(req.params.id);
				}
			})
			.then((post) => {
				if (post) {
					res.json(post);
				}
			})
			.catch((err) => {
				res.status(500).json({
					message: 'The post information could not be modified',
					err: err.message,
					stack: err.stack
				});
			});
	}
});

//GET
router.get('/:id/comments', (req, res) => {});

module.exports = router;
