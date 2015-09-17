require('script!localforage/dist/localforage.js');

localforage.config();

module.exports = {

	store: function(key, data, expireIn, callback){
		localforage.setItem(key, {data: data, expire: Date.now() + expireIn}, callback);
	},

	get: function(key, callback){
		localforage.getItem(key, function(resp){
			var data = null;
			if(resp && resp.expire > Date.now()){
				data = resp.data;
			}else{
				this.remove(key);
			}
			if(callback instanceof Function){
				callback(data);
			}
		});
	},

	remove: function(key, callback){
		localforage.removeItem(key, callback);
	}
};