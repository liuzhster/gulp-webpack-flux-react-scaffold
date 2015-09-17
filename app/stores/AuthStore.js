var assign = require('object-assign'),
	EventEmitter = require('events').EventEmitter,
	AppDispatcher = require('../dispatcher/AppDispatcher'),
	AuthConstants = require('../constants/AuthConstants'),
	EventConstants = require('../constants/EventConstants'),
	StorageUtil = require('../utils/StorageUtil'),
	settings = require('../settings');

var token = null;
var account = {

};

function login(user,password,callback){
	//TODO
	account = {
		id: 1,
		name: user
	};
	token = new Date();
	AuthStore.emit(EventConstants.CHANGE_EVENT);
}

var AuthStore = assign({}, EventEmitter.prototype, {

	isLoggedIn: function(){
		return !!token;
	},

	requireLogin: function(){
		return settings.FORCE_LOGIN && !this.isLoggedIn();
	},

	getAccount: function(){
		return account;
	},

	addChangeListener: function(callback) {
		this.on(EventConstants.CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(EventConstants.CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(function(action){
	switch(action.actionType) {
	case AuthConstants.LOGIN:
		login(action.user, action.password);
		break;
	default:

	}
});

module.exports = AuthStore;