/**
* Tarif.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		url:{
			type:'string'
		},

		id:{
			type:'integer',
			autoIncrement:true,
			primaryKey:true
		},

		region:{
			type:'string'
		},

		departement:{
			type:'string'
		},

		prefecture:{
			type:'string'
		},

		ville:{
			type:'string'
		},
		quartier:{
			type:'string'
		},

		prix_mini:{
			type:'string'
		},

		prix_moyen:{
			type:'string'
		},

		prix_maxi:{
			type:'string'
		},

		lat:{
			type:'float'
		},
		lng:{
			type:'float'
		}
	}
};

