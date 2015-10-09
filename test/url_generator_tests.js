'use strict';

const
  assert = require('assert'),
  moment = require('moment'),
  url_generator = require('../src/helpers/url_generator');

describe('When generating urls', function() {
  describe('using date and timestamp', function () {

    it ('should generate url when no time is present', function() {
      let dt = moment('2015-01-31');
      let expected = 'http://www.zeus.iag.usp.br/ftp/data/2015-01/2015-01-31/2015-01-31_0000.dat.gz';
      assert.equal(url_generator.fromDateTime(dt.toDate()), expected);
    });

    it ('should use 5 minutes interval', function() {
      let dt = moment('2016-03-30 22:13');
      let expected = 'http://www.zeus.iag.usp.br/ftp/data/2016-03/2016-03-30/2016-03-30_2210.dat.gz';
      assert.equal(url_generator.fromDateTime(dt.toDate()), expected);
    });

    it('should append zeros to the left', function () {
      let dt = moment('2013-02-08 09:05');
      let expected = 'http://www.zeus.iag.usp.br/ftp/data/2013-02/2013-02-08/2013-02-08_0905.dat.gz';
      assert.equal(url_generator.fromDateTime(dt.toDate()), expected);
    });
  });

  describe('and no data is present', function() {
    it ('should raise an error', function() {
      assert.throws(function() { url_generator.fromDateTime(null); }, Error);
    });
  });
});
