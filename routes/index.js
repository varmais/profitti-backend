import admin from './admin';
import songs from './api/songs';
import user from './user';

export default (app) => {
  app.use('/api/songs', songs);
  app.use('/admin', admin);
  app.use('/', user);
};
