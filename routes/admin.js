import express from 'express';
import { getSongs, getSong, updateSong, createSong } from '../services/SongService';
import { getCategories } from '../services/CategoryService';
import renderError from '../helpers/renderError';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/index');
});

router.get('/songs', async (req, res) => {
  try {
    const songs = await getSongs();
    res.render('admin/songs', {songs});
  } catch (e) {
    return renderError(e, req, res);
  }
});

router.post('/songs', async (req, res) => {
  try {
    await createSong(req.body);
    const songs = await getSongs();
    res.render('admin/songs', {songs, songMessage: 'Song added successfully!'});
  } catch (e) {
    return renderError(e, req, res);
  }
});

router.get('/songs/new', async (req, res) => {
  try {
    const categories = await getCategories();
    res.render('admin/new-song', {categories});
  } catch (e) {
    return renderError(e, req, res);
  }
});

router.get('/songs/:song_id', async (req, res) => {
  try {
    const song = await getSong(req.params.song_id);
    const categories = await getCategories();
    res.render('admin/song', {song, categories});
  } catch (e) {
    return renderError(e, req, res);
  }
});

router.post('/songs/:song_id', async (req, res) => {
  try {
    const song = await updateSong(req.params.song_id, req.body);
    const categories = await getCategories();
    const songMessage = 'Song saved successfully!';
    res.render('admin/song', {song, categories, songMessage});
  } catch (e) {
    return renderError(e, req, res);
  }
});

export default router;