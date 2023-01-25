import { findSpecByPk } from './specController.js';
import { findItemByPk } from './itemController.js';

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

export const displayItemDetails = async (req, res) => {
  const itemData = await findItemByPk(req.params.id);
  if (!itemData) {
    res.render('404', {
      title: '404 | ' + process.env.WEB_TITLE,
      displayTitle: process.env.WEB_TITLE,
      username: req.session.username
    });
    return;
  }
  const item = itemData.get({plain:true});
  const context = `/specs/${item.spec_id}`;
  res.render('itemDetails', {
    item,
    title: 'Item Details | ' + process.env.WEB_TITLE,
    displayTitle: process.env.WEB_TITLE,
    username: req.session.username,
    access: req.session.access,
    context: context
  });
}

export const displayItemLogs = async (req, res) => {
  const itemData = await findItemByPk(req.params.id);
  if (!itemData) {
    res.render('404', {
      title: '404 | ' + process.env.WEB_TITLE,
      displayTitle: process.env.WEB_TITLE,
      username: req.session.username
    });
    return;
  }
  const item = itemData.get({plain:true});
  res.render('itemLog', {
    item,
    title: 'Item Log | ' + process.env.WEB_TITLE,
    displayTitle: process.env.WEB_TITLE,
    username: req.session.username,
    access: req.session.access
  });
}