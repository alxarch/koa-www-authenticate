'use strict';

const assert = require('assert');
const co = require('co');
const createWWWMiddleware = require('.');

describe('Koa www auth middleware', function () {
	it('Fixes headers on 401 errors', function () {
		const ctx = {};
		let middleware = createWWWMiddleware({
			realm: 'foo'
		});
		const err = new Error();
		err.status = 401;
		co(middleware.call(ctx, Promise.reject(err)))
		.then(function(res) {
			assert(false, 'Should never get here');
		})
		.catch( function (err) {
			assert.equal(err.headers['WWW-Authenticate'], 'Basix realm=\"foo\"', 'Adds header');
		});
	});
	it('Ignores non 401 errors', function () {
		const ctx = {};
		let middleware = createWWWMiddleware({
			realm: 'foo'
		});
		const err = new Error();
		err.status = 400;
		co(middleware.call(ctx, Promise.reject(err)))
		.then(function(res) {
			assert(false, 'Should never get here');
		})
		.catch( function (err) {
			assert.equal(err.header, null, 'Added no headers');
		});
	});
});
