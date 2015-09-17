var _route = null;

module.exports = {

	set: function(route){
		_route = route;
	},

	get: function(){
		return _route;
	}

};
