var React = require('react'),
	Router = require('react-router'),
	DefaultRoute = Router.DefaultRoute,
	Route = Router.Route;

var App = require('./components/App.react'),
	Login = require('./components/Login.react'),
	Homepage = require('./components/Homepage.react');

var routes = (
	<Route handler={App}>
		<Route path="/login" name="login" handler={Login}/>
		<DefaultRoute name="homepage" handler={Homepage}/>
	</Route>
);

module.exports = routes;