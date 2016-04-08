"use strict";
//search event listener
document.getElementsByTagName("form")[0].addEventListener("submit", function(e) {
	e.preventDefault();
	var value = e.target.getElementsByTagName("input")[0].value;
	makeFirstRequest(value);
	return false;
	
}, false);

//getting data from Wikimedia
var searchResults;
var titlesFromRequest;
var formattedTitles;

function makeFirstRequest(searchTerm) {
	var jsonpTag = document.createElement("script");
	jsonpTag.setAttribute("src", 
	"https://en.wikipedia.org/w/api.php?action=query&format=json&list=search" + 
	"&callback=firstSuccess&" + 
	"formatversion=2&srsearch=" + searchTerm + "&srprop=snippet&srlimit=10");
	jsonpTag.setAttribute("type", "application/javascript");
	document.getElementsByTagName("head")[0].appendChild(jsonpTag);
}
	

function makeSecondRequest(formattedTitles) {
	var jsonpTag2 = document.createElement("script");
	jsonpTag2.setAttribute("src", 
	"https://en.wikipedia.org/w/api.php?action=query&format=json&" + "prop=info" +
	"&callback=secondSuccess&titles=" + formattedTitles + "&formatversion=2" +
	"&inprop=url");
	jsonpTag2.setAttribute("type", "application/javascript");
	document.getElementsByTagName("head")[0].appendChild(jsonpTag2);
}


function firstSuccess(response) {
	getTitlesAndSnippetsIntoObj(response.query.search);
	titlesFromRequest = getTitles(response.query.search);
	console.log(searchResults);
	makeSecondRequest(formatTitles(titlesFromRequest));
}


function secondSuccess(response) {
	searchResults = addUrls(getUrls(response), searchResults);
	console.log(searchResults);
	if (!document.getElementsByTagName("ul")[0].firstChild) {
		stylePostSearchLayout();
		addResultStructure();
	}
	else {
		tearDownResults();
		addResultStructure();
	}
	console.log(document.getElementsByTagName("ul")[0].childNodes);
	populateResultFields();
}


//changing page structure and styling after initial search
function changeBackgroundColor() {
	document.body.style.backgroundColor = "#FFF";
}

function changeFormBackgroundColor() {
	
}

function changeFormMargin() {
	document.getElementsByTagName("form")[0].style.margin = "0px auto";
}


function changeSearchBarPadding() {
	document.getElementById("search-bar").style.padding = "10px";
}


function changeSearchBarBorder() {
	document.getElementById("search-bar").style.borderBottom = 
		"1px solid #C5C4C3";
}


function insertUl() {
	document.body.insertBefore(document.createElement("ul"),
		document.body.lastChild);
}


function setUlId() {
	var att = document.createAttribute("id");
	att.value = "search-results";
	document.getElementsByTagName("ul")[0].setAttributeNode(att);
}


function insertLis() {
	var ul = document.getElementsByTagName("ul")[0];
	var li;
	for (var i = 0; i < titlesFromRequest.length; i++) {
		li = document.createElement("li");
		li.setAttribute("class", "search-result");
		ul.appendChild(li);
	}
}


function insertPsInLis() {
	var lis = document.getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		lis[i].appendChild(document.createElement("p"));
	}
}


function insertTitleElements() {
	var items = document.getElementsByTagName("ul")[0].childNodes;
	var h2;
	for (var i = 0; i < items.length; i++) {
		h2 = document.createElement("h2");
		h2.setAttribute("class", "title");
		items[i].appendChild(h2);
	}
}


function addAnchorsToTitles() {
	var list = document.getElementsByClassName("title");
	var anchor;
	for (var i = 0; i < list.length; i++) {
		anchor = document.createElement("a");
		anchor.className = "title-link";
		list[i].appendChild(anchor);
	}
}


//function changeFooterPosition() {
	//document.getElementsByTagName("footer")[0].style.position = "relative";
//}

function stylePostSearchLayout() {
	changeBackgroundColor();
	changeFormMargin();
	changeSearchBarPadding();
	changeSearchBarBorder();
	//insertUl();
	setUlId();
}

function addResultStructure() {
	insertLis();
	insertTitleElements();
	insertPsInLis();
	addAnchorsToTitles();
	//if (document.getElementsByTagName("li").length >= 10) {
		//changeFooterPosition();
	//}
}

function tearDownResults() {
	var ul = document.getElementsByTagName("ul")[0];
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
}

//working with data	
//var searchResults = [{}, 
	//{}, 
	//{}, 
	//{}, 
	//{},
	//{},
	//{},
	//{}, 
	//{},
	//{}];
	
//var urls = [["62: A Model Kit", "https://en.wikipedia.org/wiki/62:_A_Model_Kit"],
		 //["Bestiario", "https://en.wikipedia.org/wiki/Bestiario"],
		 //["Fantomas contra los vampiros multinacionales", "https://en.wikipedia.org/wiki/Fantomas_contra_los_vampiros_multinacionales"],
		 //["Final del juego", "https://en.wikipedia.org/wiki/Final_del_juego"],
		 //["Hopscotch (Julio Cort\u00e1zar novel)", "https://en.wikipedia.org/wiki/Hopscotch_(Julio_Cort%C3%A1zar_novel)"],
		 //["Julio Cort\u00e1zar", "https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar"],
		 //["Prosa del Observatorio", "https://en.wikipedia.org/wiki/Prosa_del_Observatorio"],
		 //["The Winners (novel)", "https://en.wikipedia.org/wiki/The_Winners_(novel)"],
		 //["Todos los fuegos el fuego", "https://en.wikipedia.org/wiki/Todos_los_fuegos_el_fuego"],
		 //["\u00daltimo round", "https://en.wikipedia.org/wiki/%C3%9Altimo_round"]];


//var urlResponse = 
//{"batchcomplete":"","query":{"pages":
	//{"13945880":{"pageid":13945880,"ns":0,"title":"62: A Model Kit","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":622266144,"length":879,"fullurl":"https://en.wikipedia.org/wiki/62:_A_Model_Kit","editurl":"https://en.wikipedia.org/w/index.php?title=62:_A_Model_Kit&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/62:_A_Model_Kit"},"14119524":{"pageid":14119524,"ns":0,"title":"Bestiario","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":696251568,"length":1609,"fullurl":"https://en.wikipedia.org/wiki/Bestiario","editurl":"https://en.wikipedia.org/w/index.php?title=Bestiario&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Bestiario"},"14063898":{"pageid":14063898,"ns":0,"title":"Fantomas contra los vampiros multinacionales","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":643907450,"length":1098,"fullurl":"https://en.wikipedia.org/wiki/Fantomas_contra_los_vampiros_multinacionales","editurl":"https://en.wikipedia.org/w/index.php?title=Fantomas_contra_los_vampiros_multinacionales&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Fantomas_contra_los_vampiros_multinacionales"},"14119796":{"pageid":14119796,"ns":0,"title":"Final del juego","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":712567889,"length":1969,"fullurl":"https://en.wikipedia.org/wiki/Final_del_juego","editurl":"https://en.wikipedia.org/w/index.php?title=Final_del_juego&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Final_del_juego"},"841100":{"pageid":841100,"ns":0,"title":"Hopscotch (Julio Cort\u00e1zar novel)","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":700005829,"length":21537,"fullurl":"https://en.wikipedia.org/wiki/Hopscotch_(Julio_Cort%C3%A1zar_novel)","editurl":"https://en.wikipedia.org/w/index.php?title=Hopscotch_(Julio_Cort%C3%A1zar_novel)&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Hopscotch_(Julio_Cort%C3%A1zar_novel)"},"334671":{"pageid":334671,"ns":0,"title":"Julio Cort\u00e1zar","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T17:28:29Z","lastrevid":712465349,"length":26469,"fullurl":"https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar","editurl":"https://en.wikipedia.org/w/index.php?title=Julio_Cort%C3%A1zar&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar"},"14064129":{"pageid":14064129,"ns":0,"title":"Prosa del Observatorio","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":693112986,"length":1239,"fullurl":"https://en.wikipedia.org/wiki/Prosa_del_Observatorio","editurl":"https://en.wikipedia.org/w/index.php?title=Prosa_del_Observatorio&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Prosa_del_Observatorio"},"14121254":{"pageid":14121254,"ns":0,"title":"The Winners (novel)","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":698374572,"length":1878,"fullurl":"https://en.wikipedia.org/wiki/The_Winners_(novel)","editurl":"https://en.wikipedia.org/w/index.php?title=The_Winners_(novel)&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/The_Winners_(novel)"},"14119906":{"pageid":14119906,"ns":0,"title":"Todos los fuegos el fuego","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":693112710,"length":1371,"fullurl":"https://en.wikipedia.org/wiki/Todos_los_fuegos_el_fuego","editurl":"https://en.wikipedia.org/w/index.php?title=Todos_los_fuegos_el_fuego&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Todos_los_fuegos_el_fuego"},"13951844":{"pageid":13951844,"ns":0,"title":"\u00daltimo round","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":693112919,"length":1114,"fullurl":"https://en.wikipedia.org/wiki/%C3%9Altimo_round","editurl":"https://en.wikipedia.org/w/index.php?title=%C3%9Altimo_round&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/%C3%9Altimo_round"}}}};

//var urlOre = urlResponse.query.pages;

//extract titles from response	 
function getTitles(searchResponse) {
	var titles = [];
	for (var i = 0; i < searchResponse.length; i++) {
		titles.push(searchResponse[i].title);
	}
	console.log(titles);
	return titles;
}


function countDefinedTitles(titles) {
	
}

//extract snippets from response
function getSnippets(searchResponse) {
	var snippets = [];
	for (var i = 0; i < searchResponse.length; i++){
		snippets.push(searchResponse[i].snippet);
	}
	return snippets;
}

//format titles to be used in AJAX request for urls
function formatTitles(titles) {
	var formattedTitles = "";
	for (var i = 0; i < titles.length; i++) {
		if (i === titles.length - 1) {
			formattedTitles = formattedTitles.concat(titles[i]);
		}
		else {
			formattedTitles = formattedTitles.concat(titles[i] + "|");
		}
	}
	return formattedTitles;
}


function createSearchResultsObject(numResults) {
	var result = [];
	for (var i = 0; i < numResults; i++) {
		result.push({});
	}
	
	return result;
}


function addTitles(titles, searchResults) {
	for (var i = 0; i < titles.length; i++) {
		searchResults[i].title = titles[i];
	}
	return searchResults;
}


function addSnippets(snippets, searchResults) {
	for (var i = 0; i < snippets.length; i++) {
		searchResults[i].snippet = snippets[i];
	}
	return searchResults;
}


function getUrls(urlResponse) {
	var urls = [];
	for (var page in urlResponse.query.pages) {
		urls.push([urlResponse.query.pages[page].title,
		urlResponse.query.pages[page].fullurl]);
	}
	return urls;
}


function addUrls(urls, searchResults) {
	for (var i = 0; i < urls.length; i ++) {
		for (var j = 0; j < searchResults.length; j++) {
			if (searchResults[j].title === urls[i][0]) {
				searchResults[j].url = urls[i][1];
			}
		}
	}
	return searchResults;
}


function getTitlesAndSnippetsIntoObj(searchInfo) {
	//this will need to manipulate a global variable
	searchResults = createSearchResultsObject(10);
	var titles = getTitles(searchInfo);
	searchResults = addTitles(titles, searchResults);
	searchResults = addSnippets(getSnippets(searchInfo), searchResults);
}

//filling in search results

function populateTitles() {
	var titleBlanks = document.getElementsByClassName("title-link");
	for (var i = 0; i < titleBlanks.length; i++) {
		titleBlanks[i].textContent = searchResults[i].title;
	}
}


function populateUrls() {
	var titleBlanks = document.getElementsByClassName("title-link");
	for (var i = 0; i < titleBlanks.length; i++) {
		titleBlanks[i].setAttribute("href", searchResults[i].url);
	}
}


function populateSnippets() {
	var paras = document.getElementsByTagName("p");
	for (var i = 0; i < paras.length; i++) {
		paras[i].innerHTML = searchResults[i].snippet;
	}
}


function populateResultFields() {
	populateTitles();
	populateUrls();
	populateSnippets();
}
