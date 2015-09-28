'use strict'

const 
  moment  = require("moment"),
  util    = require('util');

module.exports = {
  fromDateTime: function(date) {

    if (!(date instanceof Date)) {
      throw new Error('You should provide a valid date as parameter.')
    }

    let filterTime      = moment(date)
                            .subtract(date.getMinutes() % 5, 'minutes'),
        remoteFileName  = util.format('%s_%s.dat.gz', 
                                        filterTime.format("YYYY-MM-DD"), 
                                        filterTime.format("HHmm")),
        basepath        = "http://www.zeus.iag.usp.br/ftp/data";


                                     
    return util.format('%s/%s/%s/%s', 
                        basepath,
                        filterTime.format("YYYY-MM"),
                        filterTime.format("YYYY-MM-DD"),
                        remoteFileName);
  }

}