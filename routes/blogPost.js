const express = require('express');
const BlogPost = require('../models/blogPost');

const router = express.Router();

// Create a blog post
router.post('/post', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const blogPost = new BlogPost({
      title,
      content,
      author,
    });

    await blogPost.save();

    res.status(201).json({ message: 'Blog post created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the blog post.' });
  }
});

// Read all blog posts
router.get('/posts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ createdAt: -1 });

    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving blog posts.' });
  }
});

// Read a single blog post
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving the blog post.' });
  }
});

// Update a blog post
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blogPost = await BlogPost.findByIdAndUpdate(id, { title, content });

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    res.status(200).json({ message: 'Blog post updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the blog post.' });
  }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const blogPost = await BlogPost.findByIdAndDelete(id);

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    res.status(200).json({ message: 'Blog post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the blog post.' });
  }
});

module.exports = router;
