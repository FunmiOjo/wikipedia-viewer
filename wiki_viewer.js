"use strict";

var searchResults = [{title: "Julio Cortázar", snippet: null, url: null}, 
	{title: "Último round", snippet: null, url: null}, 
	{title: "The Winners (novel)", snippet: null, url: null}, 
	{title: "Final del juego", snippet: null, url: null}, 
	{title: "62: A Model Kit", snippet: null, url: null}, 
	{title: "Bestiario", snippet: null, url: null}, 
	{title: "Todos los fuegos el fuego", snippet: null, url: null}, 
	{title: "Fantomas contra los vampiros multinacionales", snippet: null, url: null}, 
	{title: "Prosa del Observatorio", snippet: null, url: null}, 
	{title: "Hopscotch (Julio Cortázar novel)", snippet: null, url: null}];
	
var urls = [["62: A Model Kit", "https://en.wikipedia.org/wiki/62:_A_Model_Kit"],
		 ["Bestiario", "https://en.wikipedia.org/wiki/Bestiario"],
		 ["Fantomas contra los vampiros multinacionales", "https://en.wikipedia.org/wiki/Fantomas_contra_los_vampiros_multinacionales"],
		 ["Final del juego", "https://en.wikipedia.org/wiki/Final_del_juego"],
		 ["Hopscotch (Julio Cort\u00e1zar novel)", "https://en.wikipedia.org/wiki/Hopscotch_(Julio_Cort%C3%A1zar_novel)"],
		 ["Julio Cort\u00e1zar", "https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar"],
		 ["Prosa del Observatorio", "https://en.wikipedia.org/wiki/Prosa_del_Observatorio"],
		 ["The Winners (novel)", "https://en.wikipedia.org/wiki/The_Winners_(novel)"],
		 ["Todos los fuegos el fuego", "https://en.wikipedia.org/wiki/Todos_los_fuegos_el_fuego"],
		 ["\u00daltimo round", "https://en.wikipedia.org/wiki/%C3%9Altimo_round"]];
		 
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


var urlResponse = 
{"batchcomplete":"","query":{"pages":
	{"13945880":{"pageid":13945880,"ns":0,"title":"62: A Model Kit","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":622266144,"length":879,"fullurl":"https://en.wikipedia.org/wiki/62:_A_Model_Kit","editurl":"https://en.wikipedia.org/w/index.php?title=62:_A_Model_Kit&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/62:_A_Model_Kit"},"14119524":{"pageid":14119524,"ns":0,"title":"Bestiario","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":696251568,"length":1609,"fullurl":"https://en.wikipedia.org/wiki/Bestiario","editurl":"https://en.wikipedia.org/w/index.php?title=Bestiario&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Bestiario"},"14063898":{"pageid":14063898,"ns":0,"title":"Fantomas contra los vampiros multinacionales","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":643907450,"length":1098,"fullurl":"https://en.wikipedia.org/wiki/Fantomas_contra_los_vampiros_multinacionales","editurl":"https://en.wikipedia.org/w/index.php?title=Fantomas_contra_los_vampiros_multinacionales&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Fantomas_contra_los_vampiros_multinacionales"},"14119796":{"pageid":14119796,"ns":0,"title":"Final del juego","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":712567889,"length":1969,"fullurl":"https://en.wikipedia.org/wiki/Final_del_juego","editurl":"https://en.wikipedia.org/w/index.php?title=Final_del_juego&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Final_del_juego"},"841100":{"pageid":841100,"ns":0,"title":"Hopscotch (Julio Cort\u00e1zar novel)","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":700005829,"length":21537,"fullurl":"https://en.wikipedia.org/wiki/Hopscotch_(Julio_Cort%C3%A1zar_novel)","editurl":"https://en.wikipedia.org/w/index.php?title=Hopscotch_(Julio_Cort%C3%A1zar_novel)&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Hopscotch_(Julio_Cort%C3%A1zar_novel)"},"334671":{"pageid":334671,"ns":0,"title":"Julio Cort\u00e1zar","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T17:28:29Z","lastrevid":712465349,"length":26469,"fullurl":"https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar","editurl":"https://en.wikipedia.org/w/index.php?title=Julio_Cort%C3%A1zar&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar"},"14064129":{"pageid":14064129,"ns":0,"title":"Prosa del Observatorio","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":693112986,"length":1239,"fullurl":"https://en.wikipedia.org/wiki/Prosa_del_Observatorio","editurl":"https://en.wikipedia.org/w/index.php?title=Prosa_del_Observatorio&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Prosa_del_Observatorio"},"14121254":{"pageid":14121254,"ns":0,"title":"The Winners (novel)","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":698374572,"length":1878,"fullurl":"https://en.wikipedia.org/wiki/The_Winners_(novel)","editurl":"https://en.wikipedia.org/w/index.php?title=The_Winners_(novel)&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/The_Winners_(novel)"},"14119906":{"pageid":14119906,"ns":0,"title":"Todos los fuegos el fuego","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":693112710,"length":1371,"fullurl":"https://en.wikipedia.org/wiki/Todos_los_fuegos_el_fuego","editurl":"https://en.wikipedia.org/w/index.php?title=Todos_los_fuegos_el_fuego&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Todos_los_fuegos_el_fuego"},"13951844":{"pageid":13951844,"ns":0,"title":"\u00daltimo round","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":693112919,"length":1114,"fullurl":"https://en.wikipedia.org/wiki/%C3%9Altimo_round","editurl":"https://en.wikipedia.org/w/index.php?title=%C3%9Altimo_round&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/%C3%9Altimo_round"}}}};

var urlOre = urlResponse.query.pages;

console.log(addUrls(urls, searchResults));





//for each title, compare it with every pageid result, if same then push to array
