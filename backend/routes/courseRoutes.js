// LearnSphere/backend/routes/courseRoutes.js
const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Import JWT auth middleware (copy or import from your previous code)
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

// JWT Auth Middleware (paste this if not imported)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Role check middleware
function instructorOnly(req, res, next) {
  if (req.user && req.user.role === 'instructor') {
    return next();
  }
  res.status(403).json({ message: 'Only instructors can perform this action' });
}

// CREATE: POST /courses (protected, instructor only)
router.post('/', authenticateToken, instructorOnly, async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      instructor: req.user.id // Use user id from JWT, matches ObjectId type
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// READ ALL: GET /courses (unprotected)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE: GET /courses/:id (unprotected)
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: PUT /courses/:id (protected, instructor only)
router.put('/:id', authenticateToken, instructorOnly, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: DELETE /courses/:id (protected, instructor only)
router.delete('/:id', authenticateToken, instructorOnly, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
