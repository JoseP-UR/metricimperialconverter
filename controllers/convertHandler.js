function ConvertHandler() {

  this.convertionMap = {
    gal: 'l',
    l: 'gal',
    mi: 'km',
    km: 'mi',
    lbs: 'kg',
    kg: 'lbs'
  }

  this.spellOutUnitMap = {
    gal: 'gallons',
    l: 'liters',
    mi: 'miles',
    km: 'kilometers',
    lbs: 'pounds',
    kg: 'kilograms'
  }

  this.getNum = function (input) {

    if (input.includes('/')) {
      let split = input.split('/');
      if (split.length > 2) {
        throw new Error('invalid input');
      }
    }

    const num = input ? eval(input.replace(input.match(/[a-z]+$/gi)[0], '')) : 1;

    if (isNaN(num)) {
      return 1
    }
    return num
  };

  this.getUnit = function (input) {
    let result = input.match(/[a-z]+$/gi)[0].toLowerCase();

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result = this.convertionMap[initUnit];

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result = this.spellOutUnitMap[unit];

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal':
        return initNum * galToL;
      case 'l':
        return initNum / galToL;
      case 'lbs':
        return initNum * lbsToKg;
      case 'kg':
        return initNum / lbsToKg;
      case 'mi':
        return initNum * miToKm;
      case 'km':
        return initNum / miToKm;
      default:
        throw new Error('invalid unit');
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };

}

module.exports = ConvertHandler;
