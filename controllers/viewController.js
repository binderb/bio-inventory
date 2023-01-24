import { findSpecByPk } from './specController.js';

export const displayDashboard = (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard | ' + process.env.WEB_TITLE,
    displayTitle: process.env.WEB_TITLE,
    username: req.session.username,
    access: req.session.access,
  });
}

export const displayLogin = (req, res) => {
  res.render('login', {
    title: 'Login | ' + process.env.WEB_TITLE
  });
}

export const displaySpecDetails = async (req, res) => {
  const specData = await findSpecByPk(req.params.id);
  if (!specData) {
    res.render('404', {
      title: '404 | ' + process.env.WEB_TITLE,
      displayTitle: process.env.WEB_TITLE,
      username: req.session.username
    });
    return;
  }
  const spec = specData.get({plain:true});
  res.render('specDetails', {
    spec,
    title: 'Spec Details | ' + process.env.WEB_TITLE,
    displayTitle: process.env.WEB_TITLE,
    username: req.session.username,
    access: req.session.access,
    context: '/'
  });
}

export const displaySpecLogs = async (req, res) => {
  const specData = await findSpecByPk(req.params.id);
  if (!specData) {
    res.render('404', {
      title: '404 | ' + process.env.WEB_TITLE,
      displayTitle: process.env.WEB_TITLE,
      username: req.session.username
    });
    return;
  }
  const spec = specData.get({plain:true});
  res.render('specLog', {
    spec,
    title: 'Spec Log | ' + process.env.WEB_TITLE,
    displayTitle: process.env.WEB_TITLE,
    username: req.session.username,
    access: req.session.access
  });
}

export const displayItemDetails = (req, res) => {
  res.render('itemDetails');
}