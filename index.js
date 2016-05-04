'use strict';

module.exports = (options) => {
	options = Object.assign({
		scheme: 'Basic',
		realm: 'Realm'
	}, options);

	const SCHEME = options.scheme;
	delete options.scheme;

	const HEADER = Object.keys(options).reduce((result, key) => {
		result.push(`${key}=\"${options[key]}\"`);
		return result;
	}, [SCHEME]).join(' ');

	return function *(next) {
		try {
			yield next;
		}
		catch (err) {
			if (401 == err.status) {
				err.headers = Object.assign({
					'WWW-Authenticate': HEADER
				}, err.headers);
			}
			throw err;
		}
	};
};
