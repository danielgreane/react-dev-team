require('jasmine-as-promised')();
var service = require('./../app/scripts/GitHubService.js');
service.init({BASE_GITHUB_URL:'https://api.github.com/repos/'});

describe('GitHubService', function() {


  it('should be able to get a single repo info', function(done) {


	    var full_name = 'facebook/flux';
    	return service
    					.getRepo(full_name)
    					.then(e => {
    						console.log(e); 
    						expect(e.full_name).toEqual(full_name); 
    						done();
    					});
  });
});
