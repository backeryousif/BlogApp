const express = require('express');
const router = express.Router();
const Blog = require('../models/blog.model');
const User = require('../models/user.model');

router.post('/blog', async function (req, res) {
  const { title, description, date, token } = req.body;
  console.log(req.body);
  try {
    const response = await Blog.create({ title, description, date });
    console.log('Blog', Blog);
    const updatedUser = await User.findOneAndUpdate(
      { token: token },
      { $push: { blogs: response._id } },
      { new: true }
    );
    console.log('updatedUser', updatedUser);
    return res.status(201).json({ response, updatedUser });
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

router.get('/blog/:token', async function (req, res) {
  const { token } = req.params;
  try {
    const response = await User.findOne({ token }).populate('blogs');
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

router.get('/blogs', async function (req, res) {
  try {
    const response = await User.find().populate('blogs');
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

router.put('/blog/:id', async function (req, res) {
  const { title, description } = req.body;
  const id = req.params.id;
  try {
    const response = await Blog.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true }
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

router.delete('/blog/:id/:token', async function (req, res) {
  const id = req.params.id;
  const { token } = req.params.token;
  try {
    const response = await Blog.findOneAndDelete({ _id: id });
    const response1 = await User.findOneAndUpdate(
      { token: token },
      { $pull: { blogs: id } }
    );
    return res.status(204).json({ response, response1 });
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

router.get('/blog/getUserblogs', async function (req, res) {
  const userid = req.body.userid;
  try {
    const response = await User.findOne({ _id: userid }).populate('blogs');
    return res.status(204).json(response);
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});
module.exports = router;
