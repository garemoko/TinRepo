/*
=============COPYRIGHT============ 
Tin Submit
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
	
	
	//Set Up LRS
	//Add one blank LRS to the page by default
	appendLRS();
	//When the user clicks '+LRS', append an extra LRS
	$('#lrsLrsAdd').click(appendLRS);
	$('#lrsLrsRemove').click({elementId: 'lrs', propertyClass: 'lrs', minimum:1},removeProperty);
	getLRSFromQueryString();
	
	
	//Set up Actor
	appendGroup('actorAgent').addClass('displayNone');
	appendAgent('actorAgent');
	$('#actorObjectType').change({elementId: 'actor'},ObjectTypeChanged);
	$('#actorAgentAdd').click({elementId: 'actorAgent'},appendAgentOnEvent);
	$('#actorAgentRemove').click({elementId: 'actorAgent', propertyClass: 'agent', minimum:1},removeProperty);
	
	var languageMap = ["en-GB","en-US"];
	
	//set up Object
	$('#objectType').change({elementId: 'object'},ObjectTypeChanged);
	//activity
	appendLanguageMap('activity','name',2, languageMap);
	$('#activityNameAdd').click({elementId: 'activity', propertyClass: 'name', languageMap: languageMap},appendLanguageMapOnEvent); 
	$('#activityNameRemove').click({elementId: 'activity', propertyClass: 'name', minimum:0},removeProperty);
	appendLanguageMap('activity','description',2, languageMap);
	$('#activityDescriptionAdd').click({elementId: 'activity', propertyClass: 'description', languageMap: languageMap},appendLanguageMapOnEvent); 
	$('#activityDescriptionRemove').click({elementId: 'activity', propertyClass: 'description', minimum:0},removeProperty);


	//Add events to buttons
	$('#sendStatement').click(statementGeneratorSendStatement);
	$('#addAnother').click(hideFeedback);
	$('#toTheRepository').click(launchRepository);
	
	//Set debug defaults
	var setDebugDefaults = true;
	
	if (setDebugDefaults){
		$('#endpoint0').val('https://mrandrewdownes.waxlrs.com/TCAPI/');
		$('#basicLogin0').val('gddikCN6KrbdWZaXq36T');
		$('#basicPass0').val('b7Q21MPlattwRn964bVW');
		$('#actorAgentName1').val('Andrew Downes');
		$('#actorAgentFunctionalIdentifier1').val('mrdownes@hotmail.com');
		$('#verbId').val('http://tincanapi.co.uk/tinrepo/verbs/make_moderator');
		$('#verbDisplayValue0').val('make moderator');
		$('#verbDisplayValue1').val('make moderator');
	}
	
});
/*============END DOCUMENT READY==============*/


/*============SEND STATEMENT==============*/
function statementGeneratorSendStatement()
{

	//Create an instance of the Tin Can Library
	var myTinCan = new TinCan();
	
	myTinCan.DEBUG = 1;
	
	//TODO: get this data from a properties file in root (or XML or properties.js or something)
	//LRS

	var myLRS = new TinCan.LRS({
		endpoint: 'https://mrandrewdownes.waxlrs.com/TCAPI/', 
		version: '0.95',
		auth: 'Basic ' + Base64.encode('uomcAcOeWBxCF6NvWUDh' + ':' + 'Weyr9VvZoGKic40lzNTv')
	});
	//don't pop up alerts on errors. 
	myLRS.alertOnRequestFailure = false;

	myTinCan.recordStores[0]= myLRS;
	
	switch($('#actorObjectType').val())
	{
		case 'Agent':
			myActor = getActor($('#actor').find('.agent:first'));
		break;
		case 'Group':
		console.log('1');
			var myActor = getActor($('#actor').find('.group:first'), 'Group');
			console.log(JSON.stringify(myActor));
			 $('#actor').find('.agent').each(function(index){
			 	var agentToAddToGroup = getActor($(this));
				myActor.member.push(agentToAddToGroup);
			 });
		break;
	}
	myTinCan.actor = myActor;
	
	//verb
	var myVerb = new TinCan.Verb({
		id : "http://tincanapi.co.uk/tinrepo/verbs/registered_extension",
		display : {
			"en-GB" : "Registered Extension",
			"en-US" : "Registered Extension"
		}
	});
	 
	
	//Object
	var myTarget;
	
	//Create the activity definition
	var myActivityDefinitionName = new Object();
	 $('#activity').find('.name').each(function(index) {
	   myActivityDefinitionName[$(this).find('.nameKey').val()] = $(this).find('.nameValue').val()
	 });
	 var myActivityDefinitionDescription = new Object();
	 $('#activity').find('.description').each(function(index) {
	   myActivityDefinitionDescription[$(this).find('.descriptionKey').val()] = $(this).find('.descriptionValue').val()
	 });
	 var myActivityDefinitionExtensions = new Object();
	  $('#activity').find('.extension').each(function(index) {
	   myActivityDefinitionExtensions[$(this).find('.extensionKey').val()] = $(this).find('.extensionValue').val()
	 });
	 
	 var myActivityDefinition = new TinCan.ActivityDefinition({
		type : $('#activity').find('.activityType').val(),
		name:  myActivityDefinitionName,
		description:  myActivityDefinitionDescription,
		extensions:  myActivityDefinitionExtensions
	});
	
	//Create the activity
	var myActivity = new TinCan.Activity({
		id : $('#activity').find('.activityId').val(),
		definition : myActivityDefinition
	});
	
	myTarget = myActivity;
	
	var stmt = new TinCan.Statement({
		actor : myActor,
		verb : myVerb,
		target : myTarget
	},true);
	
	console.log ('sending: ' + JSON.stringify(stmt));
	
	//TODO: add callback confirming that the extension has been registered. 
	try{
		myTinCan.sendStatement(stmt, statementSent);
	}
	catch (err)
	{
		//mimic the relevant bit of the returned http response 
		statementSent([{
			err : 'JS error',
			xhr : {responseText : '<p>JavaScript error: ' + err.message + '</p>'}
		}],null);
	}
}

//handle statement sending result
function statementSent (err,result){
	console.log(err);
	console.log(result);
	//hide all section divs
	$("div.section").addClass("displayNone");
	$("#sendStatement").addClass("displayNone");
	//show result div
	$("#feedback").removeClass("displayNone");
	//display an appropriate message
	if (!err[0].err){
		$("#feedback").find(".background_div").text('Success');
		$("#feedback").find("h2").text('Item added');
		$("#feedback").find("p").html('Congratulations, your item has been added to the respository.</p><p> Click <strong>Back</strong> to add another item. Click <strong>Onwards!</strong> to continue to the repository.');
	}
	else
	{
		var errorText;
		errorText = $(err[0].xhr.responseText).text();
		$("#feedback").find(".background_div").text('Error');
		$("#feedback").find("h2").text('Adding item failed');
		$("#feedback").find("p").html('An error has occured. Please make sure you are conencted to the internet and that you completed all the fields correctly. The error message was:</p><p class="errorText">'+ errorText +'</p><p> Click <strong>Back</strong> to try again. Click <strong>Onwards!</strong> to continue to the repository anyway.');

	}

}

function hideFeedback()
{
	//show all section divs
	$("div.section").removeClass("displayNone");
	$("#sendStatement").removeClass("displayNone");
	//hide result div
	$("#feedback").addClass("displayNone");
}

function launchRepository()
{
	window.location.href = "../TinReport/tinreport.htm";
}


