import {
  getSong,
  getSongs,
  createSong,
  updateSong,
  __RewireAPI__ as SongServiceAPI
} from './SongService';

describe('services:SongService', () => {
  let queryStub;
  let joinStub;
  let selectStub;
  let orderByStub;
  let whereStub;
  let firstStub;
  let patchAndFetchByIdStub;
  let insertStub;
  let result;

  beforeEach(() => {
    setupStubs();
    SongServiceAPI.__Rewire__('Song', createMockModel());
  });

  describe('getSongs', () => {
    const songs = [{song: 1}, {song: 2}];

    beforeEach(async () => {
      orderByStub.returnsPromise().resolves(songs);
      result = await getSongs();
    });

    it('queries Songs', () => {
      expect(queryStub).to.have.been.calledOnce;
    });

    it('selects category name from Categories', () => {
      expect(joinStub).to.have.been.calledWithExactly('Category', 'Category.id', '=', 'Song.category_id');
      expect(selectStub).to.have.been.calledWithExactly('Song.*', 'Category.name as category_name');
    });

    it('orders by Song id', () => {
      expect(orderByStub).to.have.been.calledWithExactly('Song.id');
    });

    it('returns songs', () => {
      expect(result).to.eql(songs);
    });
  });

  describe('getSong', () => {
    const id = '123';
    const song = {song: 1};

    beforeEach(async () => {
      firstStub.returnsPromise().resolves(song);
      result = await getSong(id);
    });

    it('queries Songs', () => {
      expect(queryStub).to.have.been.calledOnce;
    });

    it('selects category name from Categories', () => {
      expect(joinStub).to.have.been.calledWithExactly('Category', 'Category.id', '=', 'Song.category_id');
      expect(selectStub).to.have.been.calledWithExactly('Song.*', 'Category.name as category_name');
    });

    it('selects song by id', () => {
      expect(whereStub).to.have.been.calledWithExactly('Song.id', parseInt(id, 10));
    });

    it('returns first from results', () => {
      expect(firstStub).to.have.been.calledOnce;
      expect(result).to.eql(song);
    });
  });

  describe('updateSong', () => {
    const id = '123';
    const songData = {
      title: 'song title',
      category_id: '12',
      lyrics: 'song lyrics',
      dirty: 'false',
      disabled: 'on'
    };
    const updatedSong = {song: 1};

    beforeEach(async () => {
      patchAndFetchByIdStub.returnsPromise().resolves(updatedSong);
      result = await updateSong(id, songData);
    });

    it('queries Songs', () => {
      expect(queryStub).to.have.been.calledOnce;
    });

    it('patches song with parsed data', () => {
      const expectedData = {
        title: songData.title,
        category_id: parseInt(songData.category_id, 10),
        lyrics: songData.lyrics,
        dirty: false,
        disabled: true
      };
      expect(patchAndFetchByIdStub).to.have.been.calledWithExactly(id, expectedData);
    });

    it('returns updated song', () => {
      expect(result).to.eql(updatedSong);
    });
  });

  describe('createSong', () => {
    const songData = {
      title: 'song title',
      category_id: '12',
      lyrics: 'song lyrics',
      dirty: 'on'
    };

    beforeEach(async () => {
      await createSong(songData);
    });

    it('queries Songs', () => {
      expect(queryStub).to.have.been.calledOnce;
    });

    it('inserts parsed song data', () => {
      const expectedData = {
        title: songData.title,
        category_id: parseInt(songData.category_id, 10),
        lyrics: songData.lyrics,
        dirty: true,
        disabled: false
      };
      expect(insertStub).to.have.been.calledWithExactly(expectedData);
    });
  });

  function setupStubs () {
    queryStub = sinon.stub();
    joinStub = sinon.stub();
    selectStub = sinon.stub();
    orderByStub = sinon.stub();
    whereStub = sinon.stub();
    firstStub = sinon.stub();
    patchAndFetchByIdStub = sinon.stub();
    insertStub = sinon.stub();
  }

  function createMockModel () {
    return {
      query: function () {
        queryStub();
        return this;
      },
      join: function (...params) {
        joinStub(...params);
        return this;
      },
      select: function (...params) {
        selectStub(...params);
        return this;
      },
      orderBy: function (params) {
        return orderByStub(params);
      },
      where: function (...params) {
        whereStub(...params);
        return this;
      },
      first: function () {
        return firstStub();
      },
      patchAndFetchById: function (id, data) {
        return patchAndFetchByIdStub(id, data);
      },
      insert: function (data) {
        return insertStub(data);
      }
    };
  }
});
