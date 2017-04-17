import express from 'express';
import { getSongs } from '../../services/SongService';
import renderError from '../../helpers/renderError';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const songs = await getSongs();
    const enabledSongs = songs.filter(s => !s.disabled);
    if (req.query.dirty) {
      return res.json(enabledSongs);
    } else {
      return res.json(enabledSongs.filter(s => !s.dirty));
    }
  } catch (e) {
    return renderError(e, req, res);
  }
});

export default router;
