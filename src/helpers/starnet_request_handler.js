'use strict';
const
  request = require('request'),
  zlib = require('zlib'),
  util = require('util');

module.exports = function(username, password) {
  let module = {};

  module.contentForUrl = function(url) {
    return new Promise(function(resolve, reject) {
      if (!username || !password) {
        reject(Error(('Username or password not provided.')));
      }

      let fileContent = '';

      let zippedStream = request
        .get(url)
        .auth(username, password);

      zippedStream.on('response', function(res) {
        if (res.statusCode === 401) {
          reject(Error('Invalid username or password.'));
        } else if (res.statusCode === 404) {
          reject(Error(util.format('The requested file wasn\'t found (requested url: %s).',
                        url)));
        } else if (res.statusCode === 200){
          if (res.headers['content-type'] !== 'application/x-gzip') {
            reject(Error('Response file not zipped.'));
          }
        }
      });

      zippedStream.on('error', function(err) {
        reject(err);
      });

      let unzippedStream = zippedStream.pipe(zlib.createGunzip());

      unzippedStream.on('data', function(buffer) {
        fileContent += buffer.toString();
      });

      unzippedStream.on('end', function() {
        resolve(fileContent);
      });
    });
  };
  return module;
};
