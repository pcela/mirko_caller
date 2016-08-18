// ==UserScript==
// @name        Mirko caller
// @namespace   caller
// @include     http://www.wykop.pl/tag/*
// @include		http://www.wykop.pl/ludzie/*
// @include		http://www.wykop.pl/mikroblog/*
// @include		http://www.wykop.pl/wpis/*
// @version     1
// @author        toussaint1
// @updateURL     https://raw.githubusercontent.com/toussaint1/mirko_caller/master/Mirko_caller.user.js
// @downloadURL   https://raw.githubusercontent.com/toussaint1/mirko_caller/master/Mirko_caller.user.js
// @grant       none
// ==/UserScript==

var tagsSeparator = '&';
var notFoundUsersToCallMessage = 'Nie znaleziono żadnego użytkownika do zawołania';
var buttonName = 'mirko caller';
var spreadsheetId = '1pJOE-61smYpsabKIQBLJdsrGr2bZa4-8tPINtv1EfQQ';

$(document).ready(function(){
		
	var callerFunction = function(){
		
		var textAreaObject = $(this).parent().parent().find('fieldset.arrow_box textarea');
		
		var textTagsList = textAreaObject.val().match(/#([a-zA-Z0-9]+)/g); 
		var calledUsersString = '';
		var calledUsers = [];

		$.getJSON('https://spreadsheets.google.com/feeds/list/'+ spreadsheetId +'/od6/public/values?alt=json', function(callList) {
      
			var entries = callList.feed.entry;
			
      for (var i = 0; i < entries.length; i++){
				var userName = entries[i]['gsx$user']['$t'];
				var tagsList = entries[i]['gsx$tags']['$t'].split(' ');
				for (var j = 0; j < tagsList.length; j++){
					//if at least one tag is matching, add user to calledUsers list
					if (tagsMatch(textTagsList,tagsList[j])){
						calledUsers.push(userName);
						break;
					}
				}
      };
			
			if (calledUsers.length > 0){
				
				//sort called users alphabetically
				calledUsers.sort();
				
				for (var i = 0; i < calledUsers.length; i++) 
					calledUsersString+= calledUsers[i] + ' ';
					
				textAreaObject.val(textAreaObject.val() + '\n' + calledUsersString);
			} else {
				if (notFoundUsersToCallMessage.length > 0)
					alert(notFoundUsersToCallMessage);
			}
		});	

	};
	$('div#commentFormContainer').on('click','a#callerButton',callerFunction);
	$('ul#itemsStream').on('click','a#callerButton',callerFunction);
	$('<a class="button" id ="callerButton" style="margin-left:4px;">' + buttonName +'</a>').insertAfter($('form#commentForm fieldset.row.buttons.dnone a.button.openAddMediaOverlay'));
	
	
});

function tagsMatch(textTagsList,tagsString){
	var userTagsList = tagsString.split(tagsSeparator);
	for (var i=0; i<userTagsList.length; i++){
		if (textTagsList == null || textTagsList.indexOf(userTagsList[i]) == -1)
			return false;
	}
	return true;
}
