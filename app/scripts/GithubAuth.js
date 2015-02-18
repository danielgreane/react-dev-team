var config = require('./config');
var $ = require('zepto-browserify').$;

module.exports = GithubAuth();

function GithubAuth() {

	var token = window.location.href.split('token=');

	function init(cb) {
		if (_checkForToken()) {
			cb(token);
		} else {
			alert('Please set an access token in the url (?token=XXXXXX)');
		}
	}

	function _checkForToken() {
		if (token.length < 2) {
			return false;
		} else {
			token = token[1];
			return true;
		}
	}

	return {
		init: init
	};

}