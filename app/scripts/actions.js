var flux = require('flux-react');

/* Trigger actions by calling actions.methodName(); */
module.exports = flux.createActions([
  'fetchRepos',
  'refreshCommits'
]);