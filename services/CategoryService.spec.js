import {
  getCategories,
  __RewireAPI__ as CategoryServiceAPI
} from './CategoryService';

describe('services:CategoryService', () => {
  let queryStub;
  let result;

  beforeEach(() => {
    queryStub = sinon.stub().returnsPromise();
    CategoryServiceAPI.__Rewire__('Category', {
      query: function () {
        return queryStub();
      }
    });
  });

  describe('getCategories', () => {
    const categories = [{category: 1}, {category: 2}];

    beforeEach(async () => {
      queryStub.resolves(categories);
      result = await getCategories();
    });

    it('returns categories', () => {
      expect(queryStub).to.have.been.calledOnce;
      expect(result).to.eql(categories);
    });
  });
});
