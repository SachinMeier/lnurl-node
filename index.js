const _ = require('underscore');
const bech32 = require('bech32');

let lnurl = {
	bech32: require('./bech32-rules.json'),
	createServer(options) {
		return new this.Server(options);
	},
	generateApiKey(options) {
		return this.Server.prototype.generateApiKey(options);
	},
};

// Extend the top-level public interface with a few lib methods.
_.each([
	'createAuthorizationSignature',
	'createSignedUrl',
	'encode',
	'decode',
	'generateRandomLinkingKey',
	'verifyAuthorizationSignature',
], function(method) {
	lnurl[method] = require(`./lib/${method}`);
});

// Expose the server prototype.
lnurl.Server = require('./server')(lnurl);

// Expose the Lightning backend prototype - for creating custom backends.
lnurl.LightningBackend = require('./server/LightningBackend');

module.exports = lnurl;
