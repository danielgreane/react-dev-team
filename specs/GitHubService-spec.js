var service = require('./../app/scripts/GitHubService.js');
service.init({BASE_GITHUB_URL:'https://api.github.com/repos/'});

describe('GitHubService', function() {


  it('should be able to get a single repo info', function(done) {
    var full_name = 'facebook/flux';
  	return service
  					.getRepo(full_name)
  					.then(e => {
  						expect(e.full_name).toEqual(full_name); 
  						done();
  					});
  });

  // info: this is for commits: https://api.github.com/repos/facebook/flux/commits
  it('should be able to get all the commits for a repo', done => {
  	var full_name = 'facebook/flux';
  	return service
  					.getCommits(full_name)
  					.then(e => {
  						expect(e.length).toEqual(30);
  						done();
  					});
  });
});