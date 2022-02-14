import express from 'express';

import {getPosts, createPost, updatePost, getPost, likePost, deletePost, deleteAll} from '../controllers/posts.js'

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/like', likePost);
router.get('/:id', getPost);
router.delete('/', deleteAll);

export default router;