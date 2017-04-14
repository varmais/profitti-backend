import Song from '../models/Song';

export function getSongs () {
  return Song.query()
    .join('Category', 'Category.id', '=', 'Song.category_id')
    .select('Song.*', 'Category.name as category_name')
    .orderBy('Song.id');
}

export function getSong (id) {
  return Song.query()
    .join('Category', 'Category.id', '=', 'Song.category_id')
    .select('Song.*', 'Category.name as category_name')
    .where('Song.id', parseInt(id, 10))
    .first();
}

export function updateSong (id, data) {
  return Song.query().patchAndFetchById(id, parseSong(data));
}

export function createSong (data) {
  return Song.query().insert(parseSong(data));
}

function parseSong (data) {
  return {
    title: data.title,
    category_id: parseInt(data.category_id, 10),
    lyrics: data.lyrics,
    dirty: data.dirty === 'on',
    disabled: data.disabled === 'on'
  };
}