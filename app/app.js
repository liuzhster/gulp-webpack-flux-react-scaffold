var	React = require('react'),
	Router = require('react-router'),
	routes = require('./routes.js'),
	RouterUtil = require('./utils/RouterUtil');

var resolveHash = require('when/keys').all;

var router = Router.create(routes, Router.HashLocation);
RouterUtil.set(router);

router.run(function(Root, state){
	var promises = state.routes.filter(function (route) {
		// gather up the handlers that have a static `fetchData` method
		return route.handler.fetchData;
	}).reduce(function (promises, route) {
		// reduce to a hash of `key:promise`
		promises[route.name] = route.handler.fetchData(state.params);
		return promises;
	}, {});

	resolveHash(promises).then(function (data) {
		React.render(<Root/>, document.getElementById('app'));
	});
});
