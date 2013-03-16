
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

//Create an instance of the Tin Can Library

var myTinCan = new TinCan();
myTinCan.DEBUG = 0;

var makeModeratorStatements;
var moderatorStatements;

//Details of the admin account hard coded here for now:
var adminAuth = {
	account:{
		homePage:"https://mrandrewdownes.waxlrs.com/TCAPI",
		name:"gddikCN6KrbdWZaXq36T@mrandrewdownes"
		}
	}

/*============DOCUMENT READY==============*/
$(function(){

	
	//Create an LRS and add to the list of record stores
	var myLRS = new TinCan.LRS({
		endpoint:"https://mrandrewdownes.waxlrs.com/TCAPI/", 
		version: "0.95",
		auth: 'Basic ' + Base64.encode("gddikCN6KrbdWZaXq36T" + ':' + "b7Q21MPlattwRn964bVW")
	});
	
	myTinCan.recordStores[0] = myLRS;
	
	getMakeModerator();
	
	
	//===================================
	//Create an actor to filter on
	var myActor = new TinCan.Agent({
		mbox : "mailto:mrdownes@hotmail.com"
	});

	//=======================================
});

function getMakeModerator()
{
	//get the make moderator statements
	myTinCan.getStatements({
		params:{
			verb:{id:"http://tincanapi.co.uk/tinrepo/verbs/make_moderator"},
		},
		callback: getRevokeModerator
	});
}

function getRevokeModerator (err,result){
	//validate and save the result of the previous step to a global variable
	makeModeratorStatements = validateAdministratorStatements(result.statements);
	//Get the revoke statements
	myTinCan.getStatements({
		params:{
			verb:{id:"http://tincanapi.co.uk/tinrepo/verbs/revoke_moderator"},
		},
		callback: processModeratorStatements
	});
}

function processModeratorStatements (err,result){
	//handle the result of the previous step
	moderatorStatements = validateAdministratorStatements(result.statements);
	
	//Merge the two sets of moderator statements into a single array and then sort them by timestamp, newest first. 
	moderatorStatements = moderatorStatements.concat(makeModeratorStatements);
	moderatorStatements.sort(function(x, y){
		timestamp1 = new Date(x.timestamp);
		timestamp2 = new Date(y.timestamp);
		return timestamp1 - timestamp2;
	});
	
	//dump the results on the page....(for now)
	outputStatements(moderatorStatements);
	$('body').append(JSON.stringify(moderatorStatements));
}

function validateAdministratorStatements(statements){
	return validateObjectType(validateAuth(statements,adminAuth),"Agent");
}

function validateAuth(statements,auth)
{
	var returnStatements = new Array();
	var statementsLength = statements.length;
	for (var i = 0; i < statementsLength; i++) {
		var statement = statements[i];
		if ((statement.authority.account.homePage == auth.account.homePage) && (statement.authority.account.name == auth.account.name)){
			returnStatements.push(statement);
		}
	}
	return returnStatements;
}

function validateObjectType(statements,objectType)
{
	var returnStatements = new Array();
	var statementsLength = statements.length;
	for (var i = 0; i < statementsLength; i++) {
		var statement = statements[i];
		if (statement.target.objectType == objectType) {
			returnStatements.push(statement);
		}
	}
	return returnStatements;
}



//===================================

function processStatements (err,result){
	outputStatements(result.statements);
	
	$('body').append(JSON.stringify(result));
}


function outputStatements(statements){
	//For each statement returned...
	var statementsLength = statements.length;
	for (var i = 0; i < statementsLength; i++) {
		var statement = statements[i];
		
		var actor = '<a target="blank" href="' + statement.actor.mbox + '">' + statement.actor.name + '</a>';
		var verb = (statement.verb.display['en-GB']) ? statement.verb.display['en-GB'] : statement.verb.display['en-US'];
var objectLink;

		if (statement.target.objectType == "Agent")
		{
			objectLink = '<a target="blank" href="' + statement.target.mbox + '">' + statement.target.name + '</a>'
		}
		else
		{
			var object
			if (statement.target.definition){
				object = getLangFromMapInGBOrDefault(statement.target.definition.name)
			}
			else
			{
				object = statement.target.id;
			}
			
			objectLink = '<a target="blank" href="' + statement.target.id + '">' + object + '</a>'
		}
		var statementDiv = $('<div class="section"></div>');
		statementDiv.html(actor + ' ' + verb + ' ' + objectLink +'<br />'+ statement.authority);

		$('body').append(statementDiv);
	}
	
}


