'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    console.log('request to /api/convert');
    if (!req.query.input) {

      res.json({ success: false });
      return
    }

    try {
      const initNum = convertHandler.getNum(req.query.input)
      const initUnit = convertHandler.getUnit(req.query.input)
      const returnNum = convertHandler.convert(initNum, initUnit)
      const returnUnit = convertHandler.getReturnUnit(initUnit)
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
      })
    } catch (err) {
      res.send(err.message);
      return
    }

  });
};
