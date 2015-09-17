var AppDispatcher = require('../dispatcher/AppDispatcher'),
	AuthConstants = require('../constants/AuthConstants');

var AuthActions = {

	login: function(user,password) {
		AppDispatcher.dispatch({
			actionType: AuthConstants.LOGIN,
			user: user,
			password: password
		});
	}
};

module.exports = AuthActions;