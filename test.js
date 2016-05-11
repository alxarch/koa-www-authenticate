'use strict';

const assert = require('assert');
const co = require('co');
const options = {
	scheme: null,
	realm: null
};
const createWWW = require('./index.js');

describe('tests error throwing', function () {
	it('tests status error', function () {
		let www = createWWW(options);
		const anError = {
			status: 401,
			headers: null
		};
		co(www.call(this, Promise.reject(anError)))
		.catch( function (err) {
			throw anError;
		})
		.then( function (res) {
			assert.equal(res.status, anError.status, 'Error status is 401');
			assert.ok(res.headers, "mpla" , 'Error headers are OK');
			console.log('Hello this is error', err.status, anError.status);
			console.log('got here');
			console.log(err.headers);
		})
	});
});
