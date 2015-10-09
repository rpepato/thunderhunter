'use strict';

const
  geojson = require('geojson'),
  toJson  = function(row) {
    var item = row.split(/\s+/);

    if (item.length !== 29) {
      throw new Error('Row has more or less than 29 columns.');
    }

    let result = {};

    let fields = ['year', 'month', 'day', 'utc_hour', 'minute', 'second',
                  'millisecond', 'latitude', 'longitude', 'major_elipse_error', 'atd_error', 'quality_control',
                  'polarity', 'number_of_empolyed_rx', 'number_of_atds_pairs', 'rx_1', 'rx_2', 'rx_3',
                  'rx_4', 'rx_5', 'rx_6', 'rx_7', 'rx_8', 'rx_9',
                  'rx_10', 'rx_11', 'rx_12', 'rx_13', 'rx_14'];

    for (var i=0; i<fields.length; i++) {
      if (i === 7 || i === 8) {
        result[fields[i]] = parseFloat(item[i]);
      } else {
        result[fields[i]] = item[i];
      }
    }



    return result;
  };

module.exports = {
  toGeoJson: function(data) {
    return new Promise(function(resolve, reject) {
      try {
        if (!data || data === '') {
          throw new Error('No data present to be converted.');
        }
        let json = data
                    .split('\n')
                    .filter(function(item) {
                      if (item !== '') {
                        return item;
                      }
                    }).map(toJson);
        geojson.parse(json, {Point: ['latitude', 'longitude']}, function(parsed_geojson) {
          resolve(parsed_geojson);
        });
      } catch (e){
        reject(e);
      }
    });
  }
};
