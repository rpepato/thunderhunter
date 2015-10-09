'use strict';

const
  assert = require('assert'),
  converter = require('../src/helpers/converter');

describe('When converting content to GeoJson', function() {
  it ('should generate an error when content is null', function() {
    return converter.toGeoJson(null).then(function(result) {
      throw new Error('Promise was unexpectadly fullfiled. Result:' + result);
    }, function(err) {
      assert.equal(err.message, 'No data present to be converted.');
    });
  });

  it ('should generate an error when content is blank', function() {
    return converter.toGeoJson('').then(function(result) {
      throw new Error('Promise was unexpectadly fullfiled. Result:' + result);
    }, function(err) {
      assert.equal(err.message, 'No data present to be converted.');
    });
  });

  it ('should generate an error when number of columns is greater or less than 29', function() {
    let content = '1 2 3 \n4 5 6';
    return converter.toGeoJson(content).then(function(result) {
      throw new Error('Promise was unexpectadly fullfiled. Result:' + result);
    }, function(err) {
      assert.equal(err.message, 'Row has more or less than 29 columns.');
    });
  });

  it ('should generate a geojson representation when input data is valid', function() {
    let content = Array(30).join('1 ');
    content = content.substring(0, content.length -1);
    let geojson = '{"type":"FeatureCollection",\
"features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[1,1]},\
"properties":{"year":"1","month":"1","day":"1","utc_hour":"1","minute":"1","second":"1",\
"millisecond":"1","major_elipse_error":"1","atd_error":"1","quality_control":"1",\
"polarity":"1","number_of_empolyed_rx":"1","number_of_atds_pairs":"1","rx_1":"1",\
"rx_2":"1","rx_3":"1","rx_4":"1","rx_5":"1","rx_6":"1","rx_7":"1","rx_8":"1","rx_9":"1",\
"rx_10":"1","rx_11":"1","rx_12":"1","rx_13":"1","rx_14":"1"}}]}';
    return converter.toGeoJson(content).then(function(result) {
      assert.equal(JSON.stringify(result), geojson);
    }, function(err) {
      throw new Error('Promisse was unexpectadly rejected. Error: ' + err.message);
    });
  });
});
