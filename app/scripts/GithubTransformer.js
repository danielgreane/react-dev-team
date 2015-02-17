var instance = false;
var _ = require('underscore');
var events = require('./events');
var date = require('date-extended');


module.exports = (instance ? GithubTransformer : instance = GithubTransformer());




function GithubTransformer() {

	return {
		calculateTopRepoCommitters: calculateTopRepoCommitters,
		calculateTopCommitters: calculateTopCommitters,
		calculateRepoVelocities: calculateRepoVelocities
	};

	/**
	 * Calculates & sets the top repo for each 
	 * @return void
	 */
	function calculateTopRepoCommitters() {
    var authors;

    _.each(this.repos, (repo) => { // 1. Iterate through repos
      authors = [];

      _.each(repo.commits, function(commit) { // 2. Iterate through each commit
        if ('author' in commit && commit.author) {
          if (commit.author.id in authors) {
            authors[ commit.author.id ].count++;
          } else {
            authors[ commit.author.id ] = {
              count: 1,
              data: commit.author
            };
          }
        }
      });

      // 3. Sort resulting author
      authors.sort(function(a, b) {
        if (a.count > b.count)
          return -1;
        if (a.count < b.count)
          return 1;
        return 0;
      });

      // 4. Pick & set top committer
      repo.top_committer = authors[0];
  	}); 
  }

  /**
   * Calculates & sets the top committers (this.authors) 
   * @return void
   */
  function calculateTopCommitters() {
    var authors = {};

    // 1. Count all authors
    _.each(this.repos, (repo) => {
      _.each(repo.commits, (commit) => {
        if ('author' in commit && commit.author) {
          if (commit.author.id in authors) {
            authors[ commit.author.id ].count++;
          } else {
            authors[ commit.author.id ] = {
              count: 1,
              data: commit.author
            };
          }
        }
      });
    });

    // 2. Reset & attach totals to the global store variable
    this.authors = [];
    _.each(authors, (author) => this.authors.push(author) );

    // 3. Sort authors by the count we just gave it
    this.authors.sort( (a, b) => {
      if (a.count > b.count)
        return -1;
      if (a.count < b.count)
        return 1;
      return 0;
    });

    // 4. Broadcast the update to components
    this.emit(events.TOP_COMMITTERS_REFRESHED);
  }

  /**
   * Calculates & sets the velocity of each repo
   * @return void
   */
  function calculateRepoVelocities() {
  	var samples, d1, d2, lastC, total, average, v;

  	_.each(this.repos, (repo) => {  // 1. Calculate sample of min differences
  		if (!repo.commits.length) return;
  		samples = [];

  		_.each(repo.commits, (c, i) => {
  			if (!c.author) return;

  			d1 = new Date(c.commit.author.date);
  			if (i > 0) {
  				samples.push( date.difference( d1, d2, 'minutes' ) );
  				d2 = d1;
  			}
  		});

  		// 2. Work out average
  		total = _.reduce(samples, (memo, num) => ( memo + Math.abs(num) ), 0); 
  		average = total / samples.length;

  		// 3. Work out time between 1st & last
  		d1 = new Date(repo.commits[0].commit.author.date);
  		d2 = new Date(repo.commits[ repo.commits.length - 1 ].commit.author.date);

  		// 4. Calculate velocity & save
  		repo.velocity = date.difference(d2, d1, 'minutes');
  	});


  	
  }

};