import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login', {env: process.env});
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/callback', passport.authenticate('auth0', {failureRedirect: '/login'}), (req, res) => {
  res.redirect(req.session.returnTo || '/admin');
});

export default router;