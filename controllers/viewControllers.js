export const displayDashboard = (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard | ' + process.env.WEB_TITLE,
    displayTitle: process.env.WEB_TITLE,
    username: req.session.username
  });
}

export const displayLogin = (req, res) => {
  res.render('login', {
    title: 'Login | ' + process.env.WEB_TITLE
  });
}