'use strict';

const assert = require('assert');
const co = require('co');
const options = {
	scheme: 'Basic',
	realm: 'fooooo'
};
const createWWW = require('./index.js');

describe('tests error throwing', function () {
	it('tests status error', function () {
		const ctx = {};
		const err = new Error();
		err.status = 401;
		err.headers = null;
		let www = createWWW(options);
		co(www.call(ctx, Promise.reject(err)))
			.then(function(res) {
				assert(false, 'Should never get here');
			})
			.catch( function (err) {
				console.log('Hello this is error', err.headers);
				assert.equal(err.headers, 'foo', 'Error headers are ok');
			})
	});
});
