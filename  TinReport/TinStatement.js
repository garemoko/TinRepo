/*
=============COPYRIGHT============ 
Tin Statement Sender - An I-Did-This prototype for Tin Can API 0.95
Copyright (C) 2012  Andrew Downes

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
<http://www.gnu.org/licenses/>.
*/


/*============DOCUMENT READY==============*/
$(function(){


	//Create an instance of the Tin Can Library
	var myTinCan = new TinCan();
	
	myTinCan.DEBUG = 0;
	
	//Create an LRS and add to the list of record stores
	var myLRS = new TinCan.LRS({
		endpoint:"https://cloud.scorm.com/ScormEngineInterface/TCAPI/public/", 
		version: "0.95",
		auth: 'Basic ' + Base64.encode("<account id>" + ':' + "<password>")
	});
	
	myTinCan.recordStores[0] = myLRS;
	
	var myActor = new TinCan.Agent({
		mbox : "mailto:dummy@example.com"
	});

	var cfg ={
		params:{
			actor:myActor,
		},
		callback: function(err, result){
				$('#report').html(JSON.stringify(result));
		}
	
	}
	
	myTinCan.getStatements(cfg);
	
	
});
