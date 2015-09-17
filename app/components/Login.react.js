var React = require('react/addons'),
	AuthStore = require('../stores/AuthStore'),
	AuthAction = require('../actions/AuthAction');

function onSubmitClick(){
	//validate
	AuthAction.login(this.state.user, this.state.password);
}

var Login = React.createClass({

	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function(){
		return {
			user: '',
			password: ''
		};
	},

	render: function(){
		return (
			<form role="form">
				<div className="form-group">
					<input type="text" valueLink={this.linkState('user')} placeholder="Username" />
					<input type="password" valueLink={this.linkState('password')} placeholder="Password" />
				</div>
				<button type="button" onClick={onSubmitClick.bind(this)}>Submit</button>
			</form>
		);
	}
});

module.exports = Login;