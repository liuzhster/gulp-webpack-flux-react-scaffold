var React = require('react'),
	AuthStore = require('../stores/AuthStore');

function getAccountState(){
	return {
		account: AuthStore.getAccount()
	};
}

function _onChange(){
	this.setState(getAccountState());
}

var Homepage = React.createClass({

	statics: {
		willTransitionTo: function(transition){
			if(AuthStore.requireLogin()) {
				transition.redirect('/login', {}, {'nextPath': transition.path});
			}
		}
	},

	getInitialState: function() {
		return getAccountState();
	},

	componentDidMount: function(){
		AuthStore.addChangeListener(_onChange.bind(this));
	},
	
	componentWillUnmount: function(){
		AuthStore.removeChangeListener(_onChange.bind(this));
	},

	render: function(){
		return (
			<div>
				{this.state.account.name}
			</div>
		);
	}
});

module.exports = Homepage;