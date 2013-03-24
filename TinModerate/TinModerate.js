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
	
	alert (_.isEqual({msg:'hi',name:'ho'},{msg:'hi'}));
	
	//Set Up LRS
	//Add one blank LRS to the page by default
	appendLRS();
	//hide the LRS endpoint field
	$('#endpoint0').parents('tr').addClass('displayNone');
	
	//add default values for testing:
	$('.basicLogin').val('9yqDHeqmp5hP8us4YJKq');
	$('.basicPass').val('dujAptG9qkljj5ysrZAf');
	
	//send statement
	$('#sendStatement').click(launchModeratorUI);
});
/*============END DOCUMENT READY==============*/


/*============SEND STATEMENT==============*/
function launchModeratorUI()
{
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
		}
	};
	
	var launchLink = '../TinReport/tinreport.htm?params=' + JSON.stringify(launchString);
	
	window.open(launchLink);
}

