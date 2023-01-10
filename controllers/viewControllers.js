module.exports = {
  
  displayDashboard: (req, res) => {
    res.render('dashboard', {
      title: 'Dashboard | ' + process.env.WEB_TITLE,
      displayTitle: process.env.WEB_TITLE,
      username: req.session.username
    });
  },

  displayLogin: (req, res) => {
    res.render('login', {
      title: 'Login | ' + process.env.WEB_TITLE
    });
  }

}