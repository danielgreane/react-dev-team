var $ = require('zepto-browserify').$;

var instance = false;

var GitHubService = function(){
	//var BASE_GITHUB_URL = config.BASE_GITHUB_URL;
	var _config = null;

	var init = function(config){
		_config = config;
	};

	var getRepo = function(full_name){
		return new Promise((res, rej) => {
			var url = _config.BASE_GITHUB_URL + full_name;
			return $.getJSON(url, e => res(e));
		});
	};

	return {
		init: init,
		getRepo: getRepo,

	};
};

module.exports = (instance ? GitHubService : instance = GitHubService());