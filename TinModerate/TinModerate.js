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

//TODO: For security, embed this form within TinReport so that credentials are not passed in querystrings!!!
//TODO: if you enter the wrong credentials, fail gracefully and politely. 

//Create an instance of the Tin Can Library
var myTinCan = new TinCan();
myTinCan.DEBUG = 1;


/*============DOCUMENT READY==============*/
$(function(){
	
	//Set Up LRS
	//Add one blank LRS to the page by default
	appendLRS();
	//hide the LRS endpoint field
	$('#endpoint0').parents('tr').addClass('displayNone');
	
	//add default values for testing:
	$('.basicLogin').val('9yqDHeqmp5hP8us4YJKq');
	$('.basicPass').val('dujAptG9qkljj5ysrZAf');
	
	//send statement and launch the moderator UI
	$('#sendStatement').click(launchModeratorUI);
});
/*============END DOCUMENT READY==============*/


/*============LAUNCH MODERATOR UI==============*/
function launchModeratorUI()
{
	var UUID = TinCan.Utils.getUUID();
	var launchString = {
		credentials : {
			login : $('.basicLogin').val(),
			pass : $('.basicPass').val()
		},
		actor : {
			objectType:"Agent",
			account:
			{
				name: $('.basicLogin').val() + "@mrandrewdownes",
				homePage: "https://mrandrewdownes.waxlrs.com/TCAPI"
			}
		},
		loginStatementId : UUID
	};
	
	SendILoggedInStatement('../TinReport/tinreport.htm?params=' + JSON.stringify(launchString), UUID);

}

function SendILoggedInStatement(launchLink, StatementId)
{

	
	//LRS
	$('#lrs').find('.lrs').each(function(index){
		var myLRS = new TinCan.LRS({
			endpoint:"https://mrandrewdownes.waxlrs.com/TCAPI/",
			version: "0.95",
			auth: 'Basic ' + Base64.encode($(this).find('.basicLogin').val() + ':' + $(this).find('.basicPass').val())
		});
		myTinCan.recordStores[index] = myLRS;
	});
	
	//actor
	var myActor = {
		objectType:"Agent",
		account:
		{
			name: $('.basicLogin').val() + "@mrandrewdownes",
			homePage: "https://mrandrewdownes.waxlrs.com/TCAPI"
		}
	};
	myTinCan.actor = myActor;

	//verb
	var myVerb = new TinCan.Verb({
		id : "http://tincanapi.co.uk/tinrepo/verbs/logged_in_to",
		display : {
			"en-GB" : "logged in to",
			"en-US" : "logged in to"
		}
	});
	 
	
	//Object
	 var myActivityDefinition = new TinCan.ActivityDefinition({
		type : "http://tincanapi.co.uk/tinrepo/activitytypes/repository",
		name:  {
			"en-GB" : "TinRepo",
			"en-US" : "TinRepo"
		},
		description:  {
			"en-GB" : "A repository for Tin Can API extensions",
			"en-US" : "A repository for Tin Can API extensions"
		}
	});
	
	//Create the activity
	var myActivity = new TinCan.Activity({
		id : "http://tincanapi.co.uk/tinrepo",
		definition : myActivityDefinition
	});

	
	var stmt = new TinCan.Statement({
		id: StatementId,
		actor : myActor,
		verb : myVerb,
		target : myActivity
	},true);
	
	console.log ('sending: ' + JSON.stringify(stmt));
	
	//send statement and launch moderator interface
	myTinCan.sendStatement(stmt, function() {window.location.href=launchLink});
}
