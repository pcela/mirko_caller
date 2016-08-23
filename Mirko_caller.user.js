// ==UserScript==
// @name        Mirko caller
// @namespace   https://github.com/toussaint1
// @description	skrypt ułatwia wołanie ludzi do określonych tagów na #randomanimeshit   
// @include     http://www.wykop.pl/tag/*
// @include     http://www.wykop.pl/ludzie/*
// @include     http://www.wykop.pl/mikroblog/*
// @include     http://www.wykop.pl/wpis/*
// @include     http://www.wykop.pl/moj/*
// @version     1.04
// @author      toussaint1
// @updateURL   https://raw.githubusercontent.com/toussaint1/mirko_caller/master/Mirko_caller.user.js
// @downloadURL https://raw.githubusercontent.com/toussaint1/mirko_caller/master/Mirko_caller.user.js
// @grant       none
// ==/UserScript==

var tagsSeparator = '&';
var notFoundUsersToCallMessage = '';
var buttonName = 'mirko caller';
var spreadsheetId = '1pJOE-61smYpsabKIQBLJdsrGr2bZa4-8tPINtv1EfQQ';
var loaderIconUrl = 'data:image/gif;base64,R0lGODlhEAALAPQAAIfg/zWNqnrT8nfQ7oDZ9zaOqzWNqkObuV621FOryXDJ5z+XtUykwmG511Wty3HK6EGYtjaNq02lw3/X9nnT8YPc+kaevHvU8oLb+m/H5mjB3nXO7IHZ+AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA';

$(document).ready(function(){
		
	addGlobalStyle('a#callerButtonLoader.isloading { background: url('+ loaderIconUrl +') no-repeat transparent center right; padding-left: 26px;}');

	var callerFunction = function(){
		
		var textAreaObject = $(this).parent().parent().find('fieldset.arrow_box textarea');
		var loaderObject = $(this).find('a#callerButtonLoader');
		//var callButtonLoaderObject = grandparent.find('div#callerButton a#callerButtonLoader');
		loaderObject.addClass( "isloading" );

		var textTagsList = textAreaObject.val().match(/#([a-zA-Z0-9]+)/g); 
		var calledUsersString = '';
		var calledUsers = [];
		var currentlyLoggedUser = '@' + $('.logged-user div.dropdown ul li:nth-child(1)').text().trim();

		$.getJSON('https://spreadsheets.google.com/feeds/list/'+ spreadsheetId +'/od6/public/values?alt=json', function(callList) {
      
			var entries = callList.feed.entry;
			
			for (var i = 0; i < entries.length; i++){
				var userName = entries[i]['gsx$user']['$t'];
				
				// don't check currently logged user
				if (currentlyLoggedUser === userName)
					continue;

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
			
			loaderObject.removeClass( "isloading" );

		}).fail(function(jqXHR, textStatus, errorThrown) { alert('Błąd wywołania getJSON ' + textStatus); });	

	};
	$('div#commentFormContainer').on('click','div#callerButton',callerFunction);
	$('ul#itemsStream').on('click','div#callerButton',callerFunction);
	$('<div class="button" id ="callerButton" style="margin-left:4px;"><i>' + buttonName + '</i><a id="callerButtonLoader" /></a>').insertAfter($('form#commentForm fieldset.row.buttons.dnone a.button.openAddMediaOverlay'));
	
	
});

var bindCommentFormOld = wykop.bindCommentForm;

// override default function
wykop.bindCommentForm = function(selector,selectorFromCallback){
	
	var returnValue = bindCommentFormOld(selector,selectorFromCallback);
	
	if (selectorFromCallback != null && selectorFromCallback.startsWith('#commentForm'))
		$('<div class="button" id ="callerButton" style="margin-left:4px;"><i>' + buttonName + '</i><a id="callerButtonLoader" /></a>').insertAfter($('form' + selectorFromCallback + ' fieldset.row.buttons.dnone a.button.openAddMediaOverlay'));
	
	return returnValue;
};

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function tagsMatch(textTagsList,tagsString){
	var userTagsList = tagsString.split(tagsSeparator);
	for (var i=0; i<userTagsList.length; i++){
		if (textTagsList == null || textTagsList.indexOf(userTagsList[i]) == -1)
			return false;
	}
	return true;
}
