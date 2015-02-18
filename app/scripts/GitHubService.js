var $ = require('zepto-browserify').$;

var instance = false;

var GitHubService = function(){
	var _config = null;

	var init = function(config){
		_config = config;
	};

	var getRepo = fullName => {
		var url = _config.BASE_GITHUB_URL + fullName;
		return getJSON(url);
	};

	var getCommits = fullName => {
		var url = _config.BASE_GITHUB_URL + fullName + '/commits';
		return getJSON(url) ;
	};

	var getJSON = baseUrl => {
		var url = baseUrl + '?access_token=' + _config.access_token;
		return new Promise((res, rej) => {
			return $.getJSON(url, e => res(e));
		});
	};

	// todo: interface ???
	return {
		init: init,
		getRepo: getRepo,
		getCommits: getCommits,
	};
};

module.exports = (instance ? GitHubService : instance = GitHubService());