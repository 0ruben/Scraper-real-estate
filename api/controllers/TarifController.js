/**
 * TarifController
 *
 * @description :: Server-side logic for managing tarifs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {


 	getTarif:function(req,res){
 		console.log(req.params.all());
 		if(req.param('ville')){
 			TarifQuartier.find({ville:CleanerService.clean(req.param('ville'))}).exec(function(err,quartiers){
 				if(quartiers.length>0){
 					var results = [];
 					var lat = req.param('lat');
 					var lng = req.param('lng');
 					async.each(quartiers,function(quartier,callback){
 						var radlat1 = Math.PI * lat/180;
 						var radlat2 = Math.PI * quartier.lat/180;
 						var radlon1 = Math.PI * lng/180;
 						var radlon2 = Math.PI * quartier.lng/180;
 						var theta = lng-quartier.lng;
 						var radtheta = Math.PI * theta/180;
 						var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
 						dist = Math.acos(dist);
 						dist = dist * 180/Math.PI;
 						dist = dist * 60 * 1.1515;
 						d = dist * 1.609344 ;
 						d=parseInt(d.toFixed(1)*10)/10;
 						quartier.distance=d;
 						results.push(quartier);
 						callback();
 					}, function(err) {
 						var theOne = _.sortBy(results, 'distance')[0];
 						res.status(200).json(theOne);
 					});
 				}
 				else{
 					Tarif.findOne({ville:CleanerService.clean(req.param('ville'))}).exec(function(err,ville){
 						console.log(CleanerService.clean(req.param('ville')));
 						console.log(ville);
 						if(err){
 							console.log(err);
 							return res.status(400).end();
 						} 
 						res.status(200).json(ville);
 					}); 
 				}
 			});
}
else
	res.status(200).json({message:"error"});
}

};

