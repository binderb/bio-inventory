const router = require('express').Router();
const { withAuthView } = require('../utils/auth');

// Dashboard view
router.get('/', withAuthView, (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard | ' + process.env.WEB_TITLE,
    displayTitle: process.env.WEB_TITLE,
    username: req.session.username
  });
});

// Login view
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login | ' + process.env.WEB_TITLE
  });
});

module.exports = router;