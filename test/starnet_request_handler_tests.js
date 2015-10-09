'use strict';

const
  assert = require('assert'),
  RequestHandler = require('../src/helpers/starnet_request_handler'),
  util = require('util'),
  fileUrl = 'http://www.zeus.iag.usp.br/ftp/data/2015-01/2015-01-31/2015-01-31_0000.dat.gz',
  nock = require('nock');

describe('When making requests', function() {
  describe('with no credentials', function() {
    it ('an error should be reported', function() {
      let srh = new RequestHandler();
      return srh.contentForUrl('http://fileurl.foo').then(function(result) {
        throw new Error('Promise was unexpectadly fullfiled. Result:' + result);
      }, function(err) {
        assert.equal(err.message, 'Username or password not provided.');
      });
    });
  });

  let request;

  beforeEach(function() {
    request = nock('http://www.zeus.iag.usp.br');
  });

  describe('with invalid credentials', function() {
    it ('should report authentication error', function() {
      let srh = new RequestHandler('user', 'pass');
      request.get('/ftp/data/2015-01/2015-01-31/2015-01-31_0000.dat.gz')
             .reply(401);
      return srh.contentForUrl(fileUrl).then(function(result) {
        throw new Error('Promise was unexpectadly fullfiled. Result:' + result);
      }, function(err) {
        assert.equal(err.message, 'Invalid username or password.');
      });
    });
  });

  describe('with invalid credentials', function() {
    it ('should report authentication error', function() {
      let srh = new RequestHandler('user', 'pass');
      request.get('/ftp/data/2015-01/2015-01-31/2015-01-31_0000.dat.gz')
             .reply(401);
      return srh.contentForUrl(fileUrl).then(function(result) {
        throw new Error('Promise was unexpectadly fullfiled. Result:' + result);
      }, function(err) {
        assert.equal(err.message, 'Invalid username or password.');
      });
    });
  });


  describe('with valid credentials', function() {
    let srh = new RequestHandler('validUser', 'validPassword');

    describe('and an invalid url', function() {
      it ('should report file not found', function() {
        request.get('/ftp/data/2015-01/2015-01-31/2015-01-31_0000.dat.gz')
               .reply(404);
        return srh.contentForUrl(fileUrl).then(function(result) {
          throw new Error('Promise was unexpectadly fullfiled. Result:' + result);
        }, function(err) {
          assert.equal(err.message, util.format('The requested file wasn\'t found (requested url: %s).',
                                      fileUrl));
        });
      });
    });

    describe('and valid url', function() {
      it ('should report an error when the returned file is not zipped', function() {
        request.get('/ftp/data/2015-01/2015-01-31/2015-01-31_0000.dat.gz')
               .reply(200);
        return srh.contentForUrl(fileUrl).then(function(result) {
          throw new Error('Promise was unexpectadly fullfiled. Result:' + result);
        }, function(err) {
          assert.equal(err.message, 'Response file not zipped.');
        });
      });

      it ('should return data', function() {
        request = nock('http://www.zeus.iag.usp.br')
                    .defaultReplyHeaders({
                      'Content-Type': 'application/x-gzip',
                      'Content-Encoding': 'gzip'
                    });

        let input = 'this is some file data\n';

        request.get('/ftp/data/2015-01/2015-01-31/2015-01-31_0000.dat.gz')
               .replyWithFile(200, __dirname + '/fixtures/2015-01-31_0000.dat.gz');
        return srh.contentForUrl(fileUrl).then(function(result) {
          assert.equal(input, result);
        }, function(err) {
          assert.equal(err.message, 'Response file not zipped.');
        });
      });
    });
  });
});
