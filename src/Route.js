;(function(){
	module.exports=function(_g){

		var app = _g.app;
		var http = _g.http;
		var mysql = _g.mysql;
		/*
		var config = {
			host     : 'localhost',
			user     : 'root',
			password : 'apmsetup',
			database : 'willhugu'
		}*///debug


		var config = {
			host     : 'localhost',
			user     : 'root',
			password : 'l323585@',
			database : 'willhugu'
		}


		function qry(qry,callback){
			var conn = mysql.createConnection(config);
			conn.connect();
			conn.query(qry, function (error, results, fields) {
				if (error) {
					console.log(error);
				}
				if(callback!=null){
					callback(results);
				}
				
			});
			conn.end();
		}


		function route(){
			app.get('/',function(req,res){
				loginCheckRouteHook(()=>{
					res.render('index.html',{});
				});
			});

			app.post('/apply',function(req,res){
				var name = encodeURIComponent(req.body.name);
				var email = req.body.email;
				var phone = req.body.phone;
				var m = encodeURIComponent(req.body.m);
				var q = `insert into apply values(null,'${name}','${email}','${phone}','${m}')`;
				qry(q,(ret)=>{
					res.send('success');
				});
			});

			//1. enetry point
			app.listen(1414,function(){
			  preLoad();
			  console.log('WillHugU#WILLHUGU! Server listen on *:1414');
			});
		}

		function loginCheckRouteHook(doInLoginCheckRouteHook){
			routeHook(()=>{
				return {result:"success"};
			},(params)=>{
				if(params==undefined || params.result==undefined){
					return;
				}
				if(params.result === "success"){
					//to-do-something
					doInLoginCheckRouteHook();
				} else { //in case of not having session, or not login..etc..
					//to-do
				}
				return {result:"success"};
			},(params)=>{
				return 1;
			});
		}

		function routeHook(onPreExecute,doInRoute,onPostExecute){
			var preReturn = onPreExecute();
			var doReturn = doInRoute(preReturn);
			return onPostExecute(doReturn);
		}

		function preLoad(){
			//to-do
		}

		var publicReturn = {
			route:route,
		}
		return publicReturn;
	}

})();



