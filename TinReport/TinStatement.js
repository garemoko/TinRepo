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
		endpoint:"https://mrandrewdownes.waxlrs.com/TCAPI/", 
		version: "0.95",
		auth: 'Basic ' + Base64.encode("gddikCN6KrbdWZaXq36T" + ':' + "b7Q21MPlattwRn964bVW")
	});
	
	myTinCan.recordStores[0] = myLRS;
	
	//Create an actor to filter on
	var myActor = new TinCan.Agent({
		mbox : "mailto:mrdownes@hotmail.com"
	});

	//Define the filter and callback
	var cfg ={
		params:{
			actor:myActor,
		},
		callback: processStatements
	}
	
	//get the statements
	myTinCan.getStatements(cfg);
	
	
});

function processStatements (err,result){
	
	//For each statement returned...
	var statementsLength = result.statements.length;
	for (var i = 0; i < statementsLength; i++) {
		var statement = result.statements[i];
		
		var actor = statement.actor.name;
		var verb = (statement.verb.display['en-GB']) ? statement.verb.display['en-GB'] : statement.verb.display['en-US'];

		var object
		if (statement.target.definition){
			object = (statement.target.definition.name['en-GB']) ? statement.target.definition.name['en-GB'] : statement.target.definition.name['en-US'];
		}
		else
		{
			object = statement.target.id;
		}
		
		var objectLink = '<a target="blank" href="' + statement.target.id + '">' + object + '</a>'
		
		var statementDiv = $('<div class="section"></div>');
		statementDiv.html(actor + ' ' + verb + ' ' + objectLink);
		
		
		
		$('body').append(statementDiv);
	}
	
}
