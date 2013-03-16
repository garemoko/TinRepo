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


//TODO: move these functions to TinCan.Utils

//=====================UTILITY FUNCTIONS==============

function getLangFromMapInGBOrDefault (languageMap){
	var defaultLang;
	for (var lang in languageMap) {
	    defaultLang = lang;
	    break;
	}
	object = (languageMap['en-GB']) ? languageMap['en-GB'] : languageMap[lang];
}


//removes any empty properties 
function deleteEmptyProperties(objectToTest)
{

    if (typeof objectToTest=="object"){
        for (i in objectToTest) {
            if (objectToTest[i] == null || objectToTest[i] == "" || (JSON.stringify(objectToTest[i])=="{}")) {
                delete objectToTest[i];
            }
            else {
                deleteEmptyProperties(objectToTest[i]);
            }
        }
    }
	return objectToTest;
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function urldecode(str) {
   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});
