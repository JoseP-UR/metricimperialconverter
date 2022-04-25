const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
function sendServerGetRequest(input, cb) {
    chai.request(server)
        .get('/api/convert')
        .query({ input })
        .end((err, res) => {
            if (err) {
                console.log(err);
            }
            cb(err, res);
        });
}

suite('Functional Tests', function () {
    test('Convert a valid input such as 10L: GET request to /api/convert.', () => {
        sendServerGetRequest('10L', (err, res) => {
            assert.equal(res.status, 200);
            const expectedResult = {
                initNum: 10,
                initUnit: 'l',
                returnNum: 2.6417217685798895,
                returnUnit: 'gal',
                string: '10 liters converts to 2.6417217685798895 gallons'
            }
            assert.deepEqual(res.body, expectedResult);
        });
    });

    test('Convert an invalid input such as 32g: GET request to /api/convert.', () => {
        sendServerGetRequest('32g', (err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'invalid unit');
        });
    });

    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', () => {
        sendServerGetRequest('3/7.2/4kg', (err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'invalid input');
        });
    });

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', () => {
        sendServerGetRequest('3/7.2/4kilomegagram', (err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'invalid input');
        });
    });

    test('Convert with no number such as kg: GET request to /api/convert.', () => {
        sendServerGetRequest('kg', (err, res) => {
            assert.equal(res.status, 200);
            const expectedResult = {
                initNum: 1,
                initUnit: 'kg',
                returnNum: 2.2046244201837775,
                returnUnit: 'lbs',
                string: '1 kilograms converts to 2.2046244201837775 pounds'
            }
            assert.deepEqual(res.body, expectedResult);
        });
    });
});
