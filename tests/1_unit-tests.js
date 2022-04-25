const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    test('convertHandler should correctly read a whole number input.', () => {
        assert.equal(convertHandler.getNum('32mi'), 32);
        assert.equal(convertHandler.getNum('mi'), 1);
        assert.equal(convertHandler.getNum(''), 1);
    });

    test('convertHandler should correctly read a decimal number input.', () => {
        assert.equal(convertHandler.getNum('32.5mi'), 32.5);
        assert.equal(convertHandler.getNum('3.2mi'), 3.2);
        assert.equal(convertHandler.getNum('mi'), 1);
        assert.equal(convertHandler.getNum(''), 1);
    });

    test('convertHandler should correctly read a fractional input.', () => {
        assert.equal(convertHandler.getNum('1/2mi'), 0.5);
        assert.equal(convertHandler.getNum('1/4mi'), 0.25);
        assert.equal(convertHandler.getNum('1/8mi'), 0.125);
    });

    test('convertHandler should correctly read a fractional input with a decimal.', () => {
        assert.equal(convertHandler.getNum('1/2.5mi'), 0.4);
        assert.equal(convertHandler.getNum('2.5/2mi'), 1.25);
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
        try {
            convertHandler.getNum('3/2/3mi');
        } catch (err) {
            assert.equal(err.message, 'invalid input');
        }
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
        assert.equal(convertHandler.getNum(''), 1);
    });

    test('convertHandler should correctly read each valid input unit.', () => {
        assert.equal(convertHandler.getUnit('2mi'), 'mi');
        assert.equal(convertHandler.getUnit('2.3km'), 'km');
    });

    test('convertHandler should correctly return an error for an invalid input unit.', () => {
        try {
            convertHandler.getUnit('2.3kmkm');
        } catch (err) {
            assert.equal(err.message, 'invalid unit');
        }
    });

    test('convertHandler should return the correct return unit for each valid input unit.', () => {
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.equal(convertHandler.getReturnUnit('l'), 'gal');
        assert.equal(convertHandler.getReturnUnit('gal'), 'l');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('l'), 'liters');
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });

    test('convertHandler should correctly convert gal to L.', () => {
        assert.approximately(convertHandler.convert(3, 'gal'), 11.35623, 0.1);
    });

    test('convertHandler should correctly convert L to gal.', () => {
        assert.approximately(convertHandler.convert(3, 'l'), 0.7925165305739669, 0.1);
    });

    test('convertHandler should correctly convert mi to km.', () => {
        assert.approximately(convertHandler.convert(3, 'mi'), 4.82802, 0.1);
    });

    test('convertHandler should correctly convert km to mi.', () => {
        assert.approximately(convertHandler.convert(3, 'km'), 1.8641182099494202, 0.1);
    });

    test('convertHandler should correctly convert lbs to kg.', () => {
        assert.approximately(convertHandler.convert(3, 'lbs'), 1.360776, 0.1);
    });

    test('convertHandler should correctly convert kg to lbs.', () => {
        assert.approximately(convertHandler.convert(3, 'kg'), 6.613873260551332, 0.1);
    });
});