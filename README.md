koa-www-authenticate
====================

Add WWW-Authenticate header on 401 errors

## Usage

```
wwwAuthenticate = require('koa-www-authenticate');
app.use(wwwAuthenticate({
	realm: 'foo',
	scheme: 'Basic'
}));
app.use(function *(next) {
	this.throw(401, "Test www-authenticate");
});

// Response will have 'WWW-Authenticate' header set to 'Basic realm="foo"'

```
