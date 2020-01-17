
const express = require('express');

//Routes
const projectRoutes = require('./projectRoutes');
/*
const postRoutes = require('./postRoutes');
*/
const router = express.Router();
router.use('/projects', projectRoutes);
/*
router.use('/posts', postRoutes);
*/
module.exports = router;
