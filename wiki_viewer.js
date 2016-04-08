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
}


function tearDownResults() {
	var ul = document.getElementsByTagName("ul")[0];
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
}



//extract information from response	 
function getTitles(searchResponse) {
	var titles = [];
	for (var i = 0; i < searchResponse.length; i++) {
		titles.push(searchResponse[i].title);
	}
	console.log(titles);
	return titles;
}


function getSnippets(searchResponse) {
	var snippets = [];
	for (var i = 0; i < searchResponse.length; i++){
		snippets.push(searchResponse[i].snippet);
	}
	return snippets;
}


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
