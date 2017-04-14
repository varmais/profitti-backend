import admin from './admin';
import songs from './api/songs';

export default (app) => {
  app.use('/api/songs', songs);
  app.use('/admin', admin);
}