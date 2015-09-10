var cheerio = require('cheerio');
var request = require('request');
var cpt = 0;
var cpt2 = 0;
var villes = [
// "http://www.efficity.com/prix-immobiliers/alsace_z111152/villes",
// "http://www.efficity.com/prix-immobiliers/aquitaine_z111150/villes",
// "http://www.efficity.com/prix-immobiliers/auvergne_z111151/villes",
// "http://www.efficity.com/prix-immobiliers/basse-normandie_z111141/villes",
// "http://www.efficity.com/prix-immobiliers/bourgogne_z111149/villes",
// "http://www.efficity.com/prix-immobiliers/bretagne_z111148/villes",
// "http://www.efficity.com/prix-immobiliers/centre_z111147/villes",
// "http://www.efficity.com/prix-immobiliers/champagne-ardenne_z111159/villes",
// "http://www.efficity.com/prix-immobiliers/corse_z111153/villes",
// "http://www.efficity.com/prix-immobiliers/franche-comte_z111154/villes",
// "http://www.efficity.com/prix-immobiliers/haute-normandie_z111157/villes",
// "http://www.efficity.com/prix-immobiliers/languedoc-roussillon_z111140/villes",
// "http://www.efficity.com/prix-immobiliers/limousin_z111156/villes",
// "http://www.efficity.com/prix-immobiliers/lorraine_z111142/villes",
// "http://www.efficity.com/prix-immobiliers/midi-pyrenees_z111143/villes",
// "http://www.efficity.com/prix-immobiliers/provence-alpes-cote-d-azur_z111160/villes",
// "http://www.efficity.com/prix-immobiliers/nord-pas-de-calais_z111146/villes",
// "http://www.efficity.com/prix-immobiliers/pays-de-la-loire_z111155/villes",
// "http://www.efficity.com/prix-immobiliers/picardie_z111158/villes",
// "http://www.efficity.com/prix-immobiliers/poitou-charentes_z111139/villes",
// "http://www.efficity.com/prix-immobiliers/rhone-alpes_z111145/villes"
// ,
"http://www.efficity.com/prix-immobiliers/ile-de-france_z111144/villes"
];

var urls = [];

var getlatlng = function(script){
	try {
		var begin = script.indexOf('[');
		var end = script.indexOf(']');
		script = script.substring(begin,end+1);
		return JSON.parse(script);
	}
	catch (e) {
		console.log(e);
		console.log(script);
		return [0,0];
	}
	
};

module.exports = {


// 	getUrlQuartiers: function(callbackFunc)
// 	{
// 		var quartiers = _.map(villes, function(ville){return ville.substring(0, ville.length-6)});
// 		async.each(quartiers, function(quartier, callback){
// 			request(quartier, function (error, response, body) {
// 				if(error)
// 					console.log(error);
// 				if (!error && response.statusCode == 200) {
// 					$ = cheerio.load(body.toString());
// 					var tempUrls = _.pluck(_.pluck($(".box-c #most_searched_block").first().find('li a'),'attribs'),'href');
// 					tempUrls.forEach(function(tempUrl){
// 						request('http://www.efficity.com'+tempUrl, function (error, response, body) {
// 							if(error)
// 								console.log(error);
// 							if (!error && response.statusCode == 200) {
// 								$ = cheerio.load(body.toString());
// 								var spl = tempUrl.split('/');
// 								if (spl && spl[7]){
// 									console.log(_.pluck(_.pluck($(".box-c #most_searched_block").first().find('li a'),'attribs'),'href'));

// 									urls.push( _.pluck(_.pluck($(".box-c #most_searched_block").first().find('li a'),'attribs'),'href'));
// 									callback();
// 								}
// 							}
// 						});
// 					});
// 				}
// 			});
// 		}, function(err){
// 			callbackFunc();

// 		});
// },

// processDataQuartiers: function(){
// 	CrawlerService.getUrlQuartiers(function(){
// 		urls = _.flatten(urls);
// 		var cpt = 0;

// 		async.eachLimit(urls, 100, function(url,callback){

// 			var spl = url.split('/');
// 			if (spl && spl[7]){
// 				CrawlerService.getValues('http://www.efficity.com'+url, function(value){
// 					TarifQuartier.create({quartier:spl[6], url: 'http://www.efficity.com'+url, region : spl[2], departement:spl[3], prefecture:spl[4], ville:spl[5].split('_')[0], prix_mini:value[0], prix_moyen:value[1], prix_maxi:value[2], lat:value[3], lng:value[4] }).exec(function(err, prix){
// 						if(err)
// 							console.log(err);
// 						console.log(cpt++);
// 						callback();
// 					});
// 				});

// 			}
// 			else{
// 				console.log("lulu");
// 				callback();
// 			}

// 		}, function(err){
// 			if(err)
// 				console.log(err);
// 			console.log("DONE, VOUS POUVEZ QUITTER");
// 		});
// 	});



// },

getUrlVilles: function(callbackFunc)
{
	async.each(villes, function(ville, callback){
		request(ville, function (error, response, body) {
			if(error)
				console.log(error);
			if (!error && response.statusCode == 200) {
				$ = cheerio.load(body.toString());
				urls.push(_.pluck(_.pluck($('.most_searched ul.list-e').find('li.under-list-e a'),'attribs'),'href'));
				callback();
			}

		});	

	}, function(err){
		callbackFunc();
	});
},

// processData: function(){
// 	CrawlerService.getUrlVilles(function(){
// 		urls = _.flatten(urls);
// 		console.log(urls.length);
// 		var cpt = 0;
// 		async.eachLimit(urls, 10, function(url,callback){
// 			var spl = url.split('/');
// 			if (spl && spl[6]){
// 				CrawlerService.getValues(url,true);
// 				callback();
// 			}
// 			else
// 				callback();

// 		}, function(err){
// 			if(err)
// 				console.log(err);
// 			console.log("DONE, VOUS POUVEZ QUITTER");
// 		});
// 	});
// },

processData: function(){
	CrawlerService.getUrlVilles(function(){
		urls = _.flatten(urls);
		console.log(urls.length);
		var cpt = 0;
		async.eachLimit(urls,10, function(url, callback){
			var spl = url.split('/');
			if (spl && spl[6]){
				CrawlerService.getValues(url,true,function(){
					callback();
				});
			}
			else
				callback();
		}, function(err){
			console.log("DONE");
		});
	});
},




getValues: function(url, ville, callback){

	request('http://www.efficity.com'+url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			$ = cheerio.load(body.toString());	
			var values = $("p.price-per-sqm-values").text().split('<');
			var latlng = getlatlng($($('script')[26]).text());
			if(values[0])
				values[0] = values[0].replace(/ /g,"").replace(/\u20ac/g, '');
			if(values[1])
				values[1] = values[1].replace(/ /g,"").replace(/\u20ac/g, '');
			if(values[2])
				values[2] = values[2].replace(/ /g,"").replace(/\u20ac/g, '');
			if(latlng[0])
				values[3] = latlng[0];
			if(latlng[1])
				values[4] = latlng[1];

			if(ville){
				CrawlerService.insertVille(url,values, function(){
					var urlQuartiers = _.filter(_.pluck(_.pluck($(".box-c #most_searched_block").first().find('li.under-list-e a'),'attribs'),'href'), function(url){return url.split('/').length==8});
					if(urlQuartiers.length>0){
						async.eachLimit(urlQuartiers,10, function(urlQuartier, callback2){
							CrawlerService.getValues(urlQuartier, false,function(){
								callback2();
							});
						},function(){
							callback();
						});
					}
					else
						callback();
				});
			}
			else{
				CrawlerService.insertQuartier(url, values, function(){
					callback();
				});
			}
		}

	});

},

// insertVille: function(url,value, cb){
// 	var spl = url.split('/');
// 	Tarif.create({url: 'http://www.efficity.com'+url, region : spl[2], ville:spl[3].split('_')[0], prix_mini:value[0], prix_moyen:value[1], prix_maxi:value[2], lat:value[3], lng:value[4] }).exec(function(err, prix){
// 		cpt++;
// 		console.log("nb villes : "+cpt);
// 		cb();
// 	});
// },
// insertQuartier: function(url,value, cb){
// 	var spl = url.split('/');
// 	TarifQuartier.create({quartier: spl[6].split('_')[0], url: 'http://www.efficity.com'+url, region : spl[2], ville:spl[3].split('_')[0], prix_mini:value[0], prix_moyen:value[1], prix_maxi:value[2], lat:value[3], lng:value[4] }).exec(function(err, prix){
// 		cpt2++
// 		console.log("nb quartiers : "+cpt2);
// 		cb();
// 	});
// },

insertVille: function(url,value, cb){
	var spl = url.split('/');
	Tarif.create({url: 'http://www.efficity.com'+url, region : spl[2], departement:spl[3], prefecture:spl[4], ville:spl[5].split('_')[0], prix_mini:value[0], prix_moyen:value[1], prix_maxi:value[2], lat:value[3], lng:value[4] }).exec(function(err, prix){
		cpt++;
		console.log("nb villes : "+cpt);
		cb();
	});
},
insertQuartier: function(url,value, cb){
	var spl = url.split('/');
	TarifQuartier.create({quartier: spl[6].split('_')[0], url: 'http://www.efficity.com'+url, region : spl[2], departement:spl[3], prefecture:spl[4], ville:spl[5].split('_')[0], prix_mini:value[0], prix_moyen:value[1], prix_maxi:value[2], lat:value[3], lng:value[4] }).exec(function(err, prix){
		cpt2++
		console.log("nb quartiers : "+cpt2);
		cb();
	});
},


}

