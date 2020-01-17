
const express = require('express');

//Routes
const projectRoutes = require('./projectRoutes');
const actionRoutes = require('./actionRoutes');
/*
const postRoutes = require('./postRoutes');
*/
const router = express.Router();
router.use('/projects', projectRoutes);
router.use('/actions', actionRoutes);
module.exports = router;
