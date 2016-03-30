"use strict"
var searchResults = [{title: null, snippet: null, url: null}, 
	{title: null, snippet: null, url: null},
	{title: null, snippet: null, url: null},
	{title: null, snippet: null, url: null},
	{title: null, snippet: null, url: null},
	{title: null, snippet: null, url: null},
	{title: null, snippet: null, url: null},
	{title: null, snippet: null, url: null},
	{title: null, snippet: null, url: null},
	{title: null, snippet: null, url: null}];
	

function getTitles(searchResults) {
	var titles = [];
	for (var i = 0; i < searchResults.length; i++) {
		titles.push(searchResults[i].title);
	}
	return titles;
}


function getSnippets(searchResults) {
	var snippets = [];
	for (var i = 0; i < searchResults.length; i++){
		snippets.push(searchResults[i].snippet);
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


function getUrls(urlResults, searchResults) {
	
}
//for each title, compare it with every pageid result, if same then push to array
