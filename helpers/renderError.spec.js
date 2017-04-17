import renderError from './renderError';

describe('helpers:renderError', () => {
  let statusStub;
  let renderStub;
  let nextStub;
  let getStub;
  let env;
  let error;
  let response;
  let request;
  const errorMessage = 'error message';

  beforeEach(() => {
    statusStub = sinon.stub();
    renderStub = sinon.stub();
    nextStub = sinon.stub();
    getStub = sinon.stub();
    request = {
      app: {
        get: (param) => {
          getStub(param);
          return env;
        }
      }
    };
    response = {
      status: statusStub,
      render: renderStub,
      locals: {}
    };
  });

  describe('when env is development', () => {
    beforeEach(() => {
      env = 'development';
      error = new Error(errorMessage);
      renderWithError(error);
    });

    it('sets locals', () => {
      expectLocalsWithError(error);
    });

    it('sets status and renders error', () => {
      expectErrorWithStatus(500);
    });
  });

  describe('when env is not development', () => {
    beforeEach(() => {
      env = 'production';
      error = new Error(errorMessage);
      renderWithError(error);
    });

    it('sets locals', () => {
      expectLocalsWithError({});
    });

    it('sets status and renders error', () => {
      expectErrorWithStatus(500);
    });
  });

  describe('when error has status', () => {
    const status = 404;

    beforeEach(() => {
      env = 'production';
      error = new Error(errorMessage);
      error.status = status;
      renderWithError(error);
    });

    it('sets locals', () => {
      expectLocalsWithError({});
    });

    it('sets status and renders error', () => {
      expectErrorWithStatus(status);
    });
  });

  function renderWithError (error) {
    renderError(error, request, response, nextStub);
    expect(nextStub).to.have.not.been.called;
  }

  function expectLocalsWithError (error) {
    expect(response.locals.message).to.eql(errorMessage);
    expect(response.locals.error).to.eql(error);
  }

  function expectErrorWithStatus (status) {
    expect(statusStub).to.have.been.calledWithExactly(status);
    expect(renderStub).to.have.been.calledWithExactly('error');
  }
});
