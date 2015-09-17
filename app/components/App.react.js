var React = require('react'),
	RouteHandler = require('react-router').RouteHandler,
	AuthStore = require('../stores/AuthStore'),
	RouterUtil = require('../utils/RouterUtil');


function _onChange(){
	if(AuthStore.isLoggedIn){
		var nextPath = RouterUtil.get().getCurrentQuery().nextPath || '/';
		RouterUtil.get().transitionTo(nextPath);
	}
}

var App = React.createClass({

	componentDidMount: function(){
		AuthStore.addChangeListener(_onChange.bind(this));
	},
	
	componentWillUnmount: function(){
		AuthStore.removeChangeListener(_onChange.bind(this));
	},

	render: function(){
		return (
			<div>
				<RouteHandler/>
			</div>
		);
	}
});

module.exports = App;