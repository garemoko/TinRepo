
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

//TODO: handle 'more' in returned statements
//TODO: handle voided statements (note: hopefully the LRS will do this in 1.0, so holding off for now).
//TODO: get defintiions from the LRS (pending TinCanJs functionality).
//TODO: filters and searches.


//Create an instance of the Tin Can Library

var myTinCan = new TinCan();

//============SETTINGS=================================
//Create an LRS and add to the list of record stores
var myLRS = new TinCan.LRS({
	endpoint:"https://mrandrewdownes.waxlrs.com/TCAPI/", 
	version: "0.95",
	auth: 'Basic ' + Base64.encode("gddikCN6KrbdWZaXq36T" + ':' + "b7Q21MPlattwRn964bVW")
});

myTinCan.recordStores[0] = myLRS;

myTinCan.DEBUG = 0;

//define the arrays of statements as global variables
var makeModeratorStatements,
makeModeratorStatementsLength,
revokeModeratorStatements,
revokeModeratorStatementsLength,
revertExtensionStatements,
deprecateExtensionStatements,
recogniseExtensionStatements,
acceptExtensionStatements,
registerExtensionStatements;


//track the number of LRS requests completed:
var LRSGetsCompleted = 0,
LRSGetsDue=7;


//Define legal activity types (see profile)
var legalActivityTypes = [
	"http://tincanapi.co.uk/tinrepo/activitytypes/verb",
	"http://tincanapi.co.uk/tinrepo/activitytypes/activity_type",
	"http://tincanapi.co.uk/tinrepo/activitytypes/activity_definition_extension",
	"http://tincanapi.co.uk/tinrepo/activitytypes/result_extension",
	"http://tincanapi.co.uk/tinrepo/activitytypes/context_extension",
	"http://tincanapi.co.uk/tinrepo/activitytypes/attachment_extension",
	"http://tincanapi.co.uk/tinrepo/activitytypes/state_api_document",
	"http://tincanapi.co.uk/tinrepo/activitytypes/agent_profile_api_document",
	"http://tincanapi.co.uk/tinrepo/activitytypes/activity_profile_api_document"
];

//Details of the admin account hard coded here for now as a single item array of objects
var adminAuth = [{
	objectType:"Agent",
	account:{
		name:"gddikCN6KrbdWZaXq36T@mrandrewdownes",
		homePage:"https://mrandrewdownes.waxlrs.com/TCAPI"
		}
	}]

//============DOCUMENT READY=============================
$(function(){
	console.log (new Date().getTime() + ' HTML page loaded. LRS data retrieval will begin in a few milliseconds...');
	
	//Get all the data from the LRS. Calls getDataComplete when all requests are complete. 
	getDataFromLRS();
	
});
function getDataComplete(){
	validateStatements ();
	var repositoryItems = buildRespositoryObject();

	outputrepositoryItems(repositoryItems);
	
	console.log (new Date().getTime() + ' All done. Enjoy!');
}

//============XHR FUNCTIONS=================================
//Sets all the XHR requests running. We don't know the order they will complete. 
function getDataFromLRS()
{
	console.log (new Date().getTime() + ' Getting data from the LRS (this may take a few seconds, please wait)...');
	
	//get the make moderator statements
	myTinCan.getStatements({
		params:{
			verb:{id:"http://tincanapi.co.uk/tinrepo/verbs/make_moderator"},
			sparse:false
		},
		callback: getMakeModerator
	});
	
	//Get the revoke statements
	myTinCan.getStatements({
		params:{
			verb:{id:"http://tincanapi.co.uk/tinrepo/verbs/revoke_moderator"},
		},
		callback: getRevokeModerator
	});
	
	//Get the revert statements
	myTinCan.getStatements({
		params:{
			verb:{id:"http://tincanapi.co.uk/tinrepo/verbs/reverted_extension"},
		},
		callback: getRevertExtension
	});
	
	//Get the deprecate statements
	myTinCan.getStatements({
		params:{
			verb:{id:"http://tincanapi.co.uk/tinrepo/verbs/deprecated_extension"},
		},
		callback: getDeprecateExtension
	});
	
	//Get the recognise statements
	myTinCan.getStatements({
		params:{
			verb:{id:"http://tincanapi.co.uk/tinrepo/verbs/recognised_extension"},
		},
		callback: getRecogniseExtension
	});
	
	//Get the accept statements
	myTinCan.getStatements({
		params:{
			verb:{id:"http://tincanapi.co.uk/tinrepo/verbs/accepted_extension"},
		},
		callback: getAcceptExtension
	});
	
	//Get the statements
	myTinCan.getStatements({
		params:{
			verb:{id:"http://tincanapi.co.uk/tinrepo/verbs/registered_extension"},
		},
		callback: getRegisterExtension
	});

	
}

function getMakeModerator(err,result){	
	makeModeratorStatements = result.statements;
	handleDataReturned();
}

function getRevokeModerator (err,result){
	revokeModeratorStatements = result.statements;
	handleDataReturned();
	
}

function getRevertExtension (err,result){
	revertExtensionStatements = result.statements;
	handleDataReturned();

}

function getDeprecateExtension (err,result){
	deprecateExtensionStatements = result.statements;
	handleDataReturned();
}

function getRecogniseExtension (err,result){
	recogniseExtensionStatements = result.statements;
	handleDataReturned();
}

function getAcceptExtension (err,result){
	acceptExtensionStatements = result.statements;
	handleDataReturned();
}

function getRegisterExtension (err,result){
	registerExtensionStatements = result.statements;
	handleDataReturned();
}

function handleDataReturned ()
{
	LRSGetsCompleted++
	console.log (new Date().getTime() + ' ' + LRSGetsCompleted + ' ' + ' out of ' + LRSGetsDue + ' requests completed...');
	
	if (LRSGetsCompleted == LRSGetsDue){
		getDataComplete();
	}
}

//============VALIDATION FUNCTIONS==========================

//remove any statements that do not meet validation criteria defined in the profile or are not from authorised authorities
function validateStatements ()
{
	console.log (new Date().getTime() + ' Validating returned data...');
	
	//validate moderator statements
	makeModeratorStatements = validateAdministratorStatements(makeModeratorStatements);
	revokeModeratorStatements = validateAdministratorStatements(revokeModeratorStatements);
	//save the length as this will be used lots and will not change from here onwards
	makeModeratorStatementsLength = makeModeratorStatements.length;
	revokeModeratorStatementsLength = revokeModeratorStatements.length;

	//Validate administrator statements
	revertExtensionStatements = validateModeratorStatements(revertExtensionStatements);
	deprecateExtensionStatements = validateModeratorStatements(deprecateExtensionStatements);
	recogniseExtensionStatements = validateModeratorStatements(recogniseExtensionStatements);
	acceptExtensionStatements = validateModeratorStatements(acceptExtensionStatements);
	//save the length as this will be used lots and will not change from here onwards
	
	//Validate public statements
	registerExtensionStatements = validatePublicStatements(registerExtensionStatements);
	console.log (new Date().getTime() + ' Data validated.');
}

function validateAdministratorStatements(statements){
	//timestamp is important for administrator statements, not stored, so change the order
	return sortStatementsByTimestamp(
		//But before we check that, the object of all administrator statements will always be an Agent
		validateObjectType(
			//But first, the authority of all administrator statements will always be the authority defined above and stored in the global variable 'adminAuth'
			validateAuth(
				statements,
				adminAuth
			),
			"Agent"
		)
	);
}

function validateModeratorStatements(statements){
	var authorisedStatements = new Array(),
	statementsLength = statements.length;
	//cycle through the array of statements
	for (var i = 0; i < statementsLength; i++) {
		//get the current statement
		var statement = statements[i],
		//get the most recent time the authority was promoted to moderator prior to the stored time of the current statement
		matchingMakeModeratorStatement = matchModeratorStatement(makeModeratorStatements,makeModeratorStatementsLength,statement),
		//get the most recent time the authority was demoted from moderator prior to the stored time of the current statement
		matchingRevokeModeratorStatement = matchModeratorStatement(revokeModeratorStatements,revokeModeratorStatementsLength,statement);
		
		//If we have found a matching make moderator statement 
		//AND EITHER we have not found a matching revoke moderator statement OR the make moderator statement is most recent, THEN...
		if ((matchingMakeModeratorStatement.success) 
		&& ((!matchingRevokeModeratorStatement.success)||(matchingMakeModeratorStatement.timestamp >= matchingRevokeModeratorStatement.timestamp))){
			authorisedStatements.push(statement);
		}
	}
	
	//Check that the activity type is valid
	return validateActivityTypes(
		//but first, make sure it's an activity.
		validateObjectType(
			authorisedStatements,
			"Activity"
		),
	legalActivityTypes
	);
}

function matchModeratorStatement(moderatorManagementStatements,moderatorManagementStatementsLength,statementToValidate)
{
	var parsedStoredOfStatementToValidate = Date.parse(statementToValidate.stored);
	//cycle through the moderator management statements
	for (var i = 0; i < moderatorManagementStatementsLength; i++) {
		var moderatorManagementStatement = moderatorManagementStatements[i];
		//Find the most recent moderator management statement whose object matches the statement being validated.
		//To match, the timestamp of the moderator management statement must be before (or equal to) the stored property of the statement being validated
		if (_.isEqual(deleteEmptyProperties(moderatorManagementStatement.target),deleteEmptyProperties(statementToValidate.authority))
		&& (Date.parse(moderatorManagementStatement.timestamp) <= parsedStoredOfStatementToValidate)) {
			//return that a match has been found and give the timestamp.
			return {
				success:true,
				timestamp:moderatorManagementStatement.timestamp
			};
		}
	}
	//No match found
	return {
		success:false,
		timestamp:null
	};
}
//Make sure that the object is an activity with a legal activity type
function validatePublicStatements(statements){
	return validateActivityTypes(
		validateObjectType(
			statements,
			"Activity"
		),
	legalActivityTypes
	);
}

//Checks that the statements authority matches a given array if authorities
function validateAuth(statements,auths)
{	
	//some variables to be used in the loops
	var returnStatements = new Array(),
	statementsLength = statements.length,
	authsLength = auths.length;
	
	//cycle through the array of statements
	for (var i = 0; i < statementsLength; i++) {
		//get the current statement
		var statement = statements[i];
		//cycle through the array of authorities to compare against
		for (var j = 0; j < authsLength; j++) {
			//get the current authority
			var auth = auths[j];
			//If the statement authority and the comparision authority match...
			if (_.isEqual(deleteEmptyProperties(statement.authority),deleteEmptyProperties(auth))) {
				//add the statement to the array
				returnStatements.push(statement);
				//just in case the authority appears in our array twice, break the auths loop
				break;
			}
		}
	}
	//return an array of statements with invalid statements not included. 
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

//Note: make sure all statements passed to this function have an object objectType of Activity
function validateActivityTypes(statements,activityTypes)
{
	var returnStatements = new Array();
	var statementsLength = statements.length;
	for (var i = 0; i < statementsLength; i++) {
		var statement = statements[i];
		if ($.inArray(statement.target.definition.type,activityTypes) != -1) {
			returnStatements.push(statement);
		}
	}
	return returnStatements;
}

//==============DATA PROCESSING FUNCTIONS=====================

function buildRespositoryObject (){
	console.log (new Date().getTime() + ' Processing data...');
	var repositoryItems = {};
	
	//Add all registered items to the array
	var registerExtensionStatementsLength = registerExtensionStatements.length;
	for (var i = 0; i < registerExtensionStatementsLength; i++) {
		repositoryItems = modifyRepository(repositoryItems, registerExtensionStatements[i], "registered", ["registered","reverted","deprecated","recognised","accepted"])
	}
	
	//Get the most recent revert to registered status. 
	//The status "reverted" is used for now, but this will be replaced with "registered" at the end of processing. 
	//This prevents registered statements overwritting accept and recognise statements.
	//From here onwards, we know there are no revert statements after the modified timestamp of each extension.
	var revertExtensionStatementsLength = revertExtensionStatements.length;
	for (var i = 0; i < revertExtensionStatementsLength; i++) {
		repositoryItems = modifyRepository(repositoryItems, revertExtensionStatements[i], "reverted", [])
	}

	//Deprecate any extensions that have been deprecated after the most recent time they were reverted
	//If a statement has been deprecated after this point, it cannot have been accepted or recognised since. 
	var deprecateExtensionStatementsLength = deprecateExtensionStatements.length;
	for (var i = 0; i < deprecateExtensionStatementsLength; i++) {
		repositoryItems = modifyRepository(repositoryItems, deprecateExtensionStatements[i], "deprecated", ["deprecated"])
	}
	
	//Recognise any extensions that have been recognised after the most recent time they were reverted
	//If a statement has been recognised after this point, it cannot have been accepted since. 
	var recogniseExtensionStatementsLength = recogniseExtensionStatements.length;
	for (var i = 0; i < recogniseExtensionStatementsLength; i++) {
		repositoryItems = modifyRepository(repositoryItems, recogniseExtensionStatements[i], "recognised", ["deprecated","recognised"])
	}
	
	//Accept any extensions that have been accepeted after the most recent time they were reverted
	var acceptExtensionStatementsLength = acceptExtensionStatements.length;
	for (var i = 0; i < acceptExtensionStatementsLength; i++) {
		repositoryItems = modifyRepository(repositoryItems, acceptExtensionStatements[i], "accepted", ["deprecated","recognised","accepted"])
	}

	console.log (new Date().getTime() + ' Processing complete.');
	return repositoryItems;
}

function modifyRepository(repositoryItems, statement, status, dontOverwrite)
{
	var extensionId = statement.target.id;
	//if the extension already exists in the repository object..
	if (repositoryItems.hasOwnProperty(extensionId))
	{
		//if timstamp is older than the current statement and the status is ok to overwrite
		if((Date.parse(repositoryItems[extensionId].modified) < Date.parse(statement.stored))
		&&(!$.inArray(repositoryItems[extensionId].status, dontOverwrite))){
			repositoryItems[extensionId].status = status;
			repositoryItems[extensionId].modified = statement.stored;
		}
	}
	else{
		//create the extension in the repository object
		repositoryItems[extensionId] = {
			id:extensionId,
			status : status,
			definition : statement.target.definition,
			modified: statement.stored
		}
		
	}
	return repositoryItems;
}

//TODO: add additional parameters to this function and move to TinCan.Utils
//sorts by newest timestamp first - reverse chronological order
function sortStatementsByTimestamp(statements)
{
	return statements.sort(function(x, y){
		timestamp1 = new Date(x.timestamp);
		timestamp2 = new Date(y.timestamp);
		return timestamp2 - timestamp1;
	});
}

//==============OUTPUT TO DOM FUNCTIONS=====================


function outputrepositoryItems(repositoryItems){
		console.log(JSON.stringify(repositoryItems));
	//For each repo item...
	$.each(repositoryItems, function(i, repositoryItem){
		
		var itemDiv = $('<div id="' + encodeURIComponent(repositoryItem.id) + '" class="section ' + repositoryItem.type + ' ' + repositoryItem.status + '"></div>');
		itemDiv.append('<h2><a target="blank" href="' + repositoryItem.id + '">' + repositoryItem.definition.name + '</a></h2>');
		var propertiesTable = $('<table></table>');
		propertiesTable.append(propertiesTableRow('Extension type', repositoryItem.type));
		propertiesTable.append(propertiesTableRow('Extension status', repositoryItem.status));
		itemDiv.append(propertiesTable);
		itemDiv.append('<p>' + repositoryItem.definition.description + '</p>');
		
		console.log(itemDiv.html);
		$('body').append(itemDiv);
	});
	
}

function propertiesTableRow (label,value){
	return '<tr><td class="label">' + label + ':</td><td>' + value + '</td></tr>';
}

