import { User } from '../models/index.js';

export const loginUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(403).json({message: 'You must supply a username and password!'});
      return;
    }

    const userData = await User.findOne({
      where: {username: req.body.username}
    });

    if (!userData) {
      res.status(403).json({message: 'Invalid username or password, please try again!'});
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(403).json({message: 'Invalid username or password, please try again!'});
      return;
    }
    req.session.loggedIn = true;
    req.session.userid = userData.id;
    req.session.username = userData.username;
    req.session.access = userData.access;
    req.session.save(() => {
      res.status(200).json({userData, message: 'You are now logged in!'});
    });
  
  } catch (err) {
    res.status(500).json({message: `Internal Server Error: ${err.name}: ${err.message}`});
  }
}

export const logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
}
