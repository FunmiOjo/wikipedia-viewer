//get data from Wikimedia
QUnit.test("get data from first request", function(assert) {
	var done = assert.async();
	var titleAndSnippetData;
	setUpJSONP("Zadie Smith");
	
	assert.equal(typeof titleAndSnippetData, "object");
	done();
});

//changing structure and styling after initial search

QUnit.test("make background white", function(assert) {
	changeBackgroundColor();
	assert.equal(document.body.style.backgroundColor, "rgb(255, 255, 255)");
});

QUnit.test("change margin to 0 auto", function(assert) {
	changeFormMargin("0 auto");
	assert.equal(document.getElementsByTagName("form")[0].style.margin, "0px auto");
});

QUnit.test("change search bar padding", function(assert) {
	changeSearchBarPadding();
	assert.equal(document.getElementById("search-bar").style.padding, "10px");
});

QUnit.test("change search bar border", function(assert) {
	changeSearchBarBorder();
	assert.equal(document.getElementById("search-bar").style.borderBottom,
	 "1px solid rgb(197, 196, 195)");
});

QUnit.test("insert unordered list", function(assert) {
	insertUl();
	assert.ok(document.getElementsByTagName("ul"));
});

QUnit.test("set unordered list id", function(assert) {
	//insertUl();
	setUlId();
	assert.equal(document.getElementsByTagName("ul")[0].getAttribute("id"),
		"search-results");
});


QUnit.test("insert list item elements", function(assert) {
	insertUl();
	insertLis();
	assert.equal(document.getElementsByTagName("ul")[0].childNodes.length, 10);
});


QUnit.test("insert title into list items", function(assert) {
	insertTitleElements();
	
	var list = document.getElementsByTagName("ul")[0].childNodes;
	function checkH2() {
		for (var i = 0; i < list.length; i++) {
			if (list[i].firstChild.nodeName !== "H2") {
				return false;
			}
		}
		return true;
	}
	assert.ok(checkH2());
});


QUnit.test("Add anchors to titles", function(assert) {
	addAnchorsToTitles();
	assert.equal(document.getElementsByTagName("h2")[0].firstChild.nodeName,"A");
});


QUnit.test("Style post-search page", function(assert) {
	stylePageAfterSearch();
	console.log(document.body);
	assert.ok(document.getElementById("search-results"));
	assert.equal(document.getElementsByTagName("h2").length, 12);
	assert.equal(document.getElementsByClassName("title-link").length, 10);
	assert.equal(document.getElementsByClassName("search-result").length, 10);
});


//dealing with data from API
QUnit.test("extract titles from response", function(assert) {
	var titles = ["Julio Cortázar", "Último round", "The Winners (novel)", 
	"Final del juego", "62: A Model Kit", "Bestiario", 
	"Todos los fuegos el fuego", "Fantomas contra los vampiros multinacionales",
	"Prosa del Observatorio", "Hopscotch (Julio Cortázar novel)"];
	assert.deepEqual(getTitles(searchInfo), titles);
});

QUnit.test("extract snippets from response", function(assert) {
	var snippets = ["&quot;<span class=\"searchmatch\">Cortázar</span>&quot; redirects here. For other uses, see <span class=\"searchmatch\">Cortázar</span> (disambiguation). <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>, born Jules Florencio <span class=\"searchmatch\">Cortázar</span> (American Spanish: [ˈxuljo korˈtasar] (",
	"title translates as Last Round, as in boxing) is a two-volume work by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published by Siglo XXI Editores in 1969. Containing nearly one hundred",
	"The Winners (Spanish: Los premios) is a novel by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published in 1960. It was his first published novel (though not the first novel he wrote)",
	"juego (End of the Game) is a book of eighteen short stories written by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>.    Continuidad de los Parques (&quot;Continuity of Parks&quot;) No se culpe a",
	"62: A Model Kit (translated from 62/Modelo para armar) is a novel by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published in 1968.",
	"Bestiario is a book of eight short stories written by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>. All the stories (except &quot;Cefalea&quot;) were translated in English by Paul Blackburn and",
	"(&quot;All Fires The Fire&quot;) is a book of eight short stories written by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>.  &quot;La autopista del sur&quot; (South Highway) &quot;La salud de los enfermos&quot;",
	"Fantomas contra los vampiros multinacionales is a comic book by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published in 1975. The book mimics film noir-style comic book stories with",
	"translation of Prosa del observatorio, a book of text and photographs by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> originally published in Spanish in 1972. The photographs depict the",
	"Hopscotch (Spanish: Rayuela) is a novel by Argentine writer <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>. Written in Paris, it was published in Spanish in 1963 and in English in 1966"];
	assert.deepEqual(getSnippets(searchInfo), snippets);
});


QUnit.test("format titles for request", function(assert) {
	var titles = ["Julio Cortázar", "Último round", "The Winners (novel)", 
	"Final del juego", "62: A Model Kit", "Bestiario", 
	"Todos los fuegos el fuego", "Fantomas contra los vampiros multinacionales",
	"Prosa del Observatorio", "Hopscotch (Julio Cortázar novel)"];
	
	var formattedTitles = "Julio Cortázar|Último round|The Winners (novel)|" + 
	"Final del juego|62: A Model Kit|Bestiario|Todos los fuegos el fuego|" + 
	"Fantomas contra los vampiros multinacionales|Prosa del Observatorio|" + 
	"Hopscotch (Julio Cortázar novel)";
	assert.deepEqual(formatTitles(titles), formattedTitles);
});


QUnit.test("add titles to search results object", function(assert) {
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
	var titles = ["Julio Cortázar", "Último round", "The Winners (novel)", 
	"Final del juego", "62: A Model Kit", "Bestiario", 
	"Todos los fuegos el fuego", "Fantomas contra los vampiros multinacionales",
	"Prosa del Observatorio", "Hopscotch (Julio Cortázar novel)"];
	var searchResultsWithTitles = [{title: "Julio Cortázar", snippet: null, url: null}, 
	{title: "Último round", snippet: null, url: null}, 
	{title: "The Winners (novel)", snippet: null, url: null}, 
	{title: "Final del juego", snippet: null, url: null}, 
	{title: "62: A Model Kit", snippet: null, url: null}, 
	{title: "Bestiario", snippet: null, url: null}, 
	{title: "Todos los fuegos el fuego", snippet: null, url: null}, 
	{title: "Fantomas contra los vampiros multinacionales", snippet: null, url: null}, 
	{title: "Prosa del Observatorio", snippet: null, url: null}, 
	{title: "Hopscotch (Julio Cortázar novel)", snippet: null, url: null}];
	assert.deepEqual(addTitles(titles, searchResults), searchResultsWithTitles);
});


QUnit.test("add snippets to search results object", function(assert) {
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
	
	var snippets = ["&quot;<span class=\"searchmatch\">Cortázar</span>&quot; redirects here. For other uses, see <span class=\"searchmatch\">Cortázar</span> (disambiguation). <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>, born Jules Florencio <span class=\"searchmatch\">Cortázar</span> (American Spanish: [ˈxuljo korˈtasar] (",
	"title translates as Last Round, as in boxing) is a two-volume work by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published by Siglo XXI Editores in 1969. Containing nearly one hundred",
	"The Winners (Spanish: Los premios) is a novel by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published in 1960. It was his first published novel (though not the first novel he wrote)",
	"juego (End of the Game) is a book of eighteen short stories written by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>.    Continuidad de los Parques (&quot;Continuity of Parks&quot;) No se culpe a",
	"62: A Model Kit (translated from 62/Modelo para armar) is a novel by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published in 1968.",
	"Bestiario is a book of eight short stories written by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>. All the stories (except &quot;Cefalea&quot;) were translated in English by Paul Blackburn and",
	"(&quot;All Fires The Fire&quot;) is a book of eight short stories written by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>.  &quot;La autopista del sur&quot; (South Highway) &quot;La salud de los enfermos&quot;",
	"Fantomas contra los vampiros multinacionales is a comic book by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published in 1975. The book mimics film noir-style comic book stories with",
	"translation of Prosa del observatorio, a book of text and photographs by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> originally published in Spanish in 1972. The photographs depict the",
	"Hopscotch (Spanish: Rayuela) is a novel by Argentine writer <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>. Written in Paris, it was published in Spanish in 1963 and in English in 1966"];
	
	var searchResultsWithSnippets = [{title: "Julio Cortázar", snippet: snippets[0], url: null}, 
	{title: "Último round", snippet: snippets[1], url: null}, 
	{title: "The Winners (novel)", snippet: snippets[2], url: null}, 
	{title: "Final del juego", snippet: snippets[3], url: null}, 
	{title: "62: A Model Kit", snippet: snippets[4], url: null}, 
	{title: "Bestiario", snippet: snippets[5], url: null}, 
	{title: "Todos los fuegos el fuego", snippet: snippets[6], url: null}, 
	{title: "Fantomas contra los vampiros multinacionales", snippet: snippets[7], url: null}, 
	{title: "Prosa del Observatorio", snippet: snippets[8], url: null}, 
	{title: "Hopscotch (Julio Cortázar novel)", snippet: snippets[9], url: null}];
	assert.deepEqual(addSnippets(snippets, searchResults), searchResultsWithSnippets);
});


QUnit.test("extract urls", function(assert) {
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
	//need to come up with better test here
	//the function should return an array with all the same elements as urls 
	//but not necessarily in the same order
	function test(getUrls) {
		var urlResult = getUrls(urlResponse);
		
		if (urlResult.length !== urls.length) {
			return false;
		}
		
		//for (var i = 0; i < urls.length; i++) {
			//if (urlResult.indexOf(urls[i]) === -1) {
				//return false;
			//}
		//}
		return true;
	}
	assert.equal(test(getUrls), true);
});

QUnit.test("add urls to search results object", function(assert) {
	var links = [["62: A Model Kit", "https://en.wikipedia.org/wiki/62:_A_Model_Kit"],
		 ["Bestiario", "https://en.wikipedia.org/wiki/Bestiario"],
		 ["Fantomas contra los vampiros multinacionales", "https://en.wikipedia.org/wiki/Fantomas_contra_los_vampiros_multinacionales"],
		 ["Final del juego", "https://en.wikipedia.org/wiki/Final_del_juego"],
		 ["Hopscotch (Julio Cort\u00e1zar novel)", "https://en.wikipedia.org/wiki/Hopscotch_(Julio_Cort%C3%A1zar_novel)"],
		 ["Julio Cort\u00e1zar", "https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar"],
		 ["Prosa del Observatorio", "https://en.wikipedia.org/wiki/Prosa_del_Observatorio"],
		 ["The Winners (novel)", "https://en.wikipedia.org/wiki/The_Winners_(novel)"],
		 ["Todos los fuegos el fuego", "https://en.wikipedia.org/wiki/Todos_los_fuegos_el_fuego"],
		 ["\u00daltimo round", "https://en.wikipedia.org/wiki/%C3%9Altimo_round"]];
		 
	var results = [{title: "Julio Cortázar", snippet: null, url: null}, 
		{title: "Último round", snippet: null, url: null}, 
		{title: "The Winners (novel)", snippet: null, url: null}, 
		{title: "Final del juego", snippet: null, url: null}, 
		{title: "62: A Model Kit", snippet: null, url: null}, 
		{title: "Bestiario", snippet: null, url: null}, 
		{title: "Todos los fuegos el fuego", snippet: null, url: null}, 
		{title: "Fantomas contra los vampiros multinacionales", snippet: null, url: null}, 
		{title: "Prosa del Observatorio", snippet: null, url: null}, 
		{title: "Hopscotch (Julio Cortázar novel)", snippet: null, url: null}];
	
	
	var searchResultsUrls = [{title: "Julio Cortázar", snippet: null, 
		url: 'https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar'}, 
	{title: "Último round", snippet: null, 
		url: 'https://en.wikipedia.org/wiki/%C3%9Altimo_round'}, 
	{title: "The Winners (novel)", snippet: null, 
		url: 'https://en.wikipedia.org/wiki/The_Winners_(novel)'}, 
	{title: "Final del juego", snippet: null, 
		url: 'https://en.wikipedia.org/wiki/Final_del_juego'}, 
	{title: "62: A Model Kit", snippet: null, 
		url: 'https://en.wikipedia.org/wiki/62:_A_Model_Kit'}, 
	{title: "Bestiario", snippet: null, 
		url: 'https://en.wikipedia.org/wiki/Bestiario'}, 
	{title: "Todos los fuegos el fuego", snippet: null, 
		url: 'https://en.wikipedia.org/wiki/Todos_los_fuegos_el_fuego'}, 
	{title: "Fantomas contra los vampiros multinacionales", snippet: null, 
		url: 'https://en.wikipedia.org/wiki/Fantomas_contra_los_vampiros_multinacionales'}, 
	{title: "Prosa del Observatorio", snippet: null, 
		url: 'https://en.wikipedia.org/wiki/Prosa_del_Observatorio'}, 
	{title: "Hopscotch (Julio Cortázar novel)", snippet: null, 
		url: 'https://en.wikipedia.org/wiki/Hopscotch_(Julio_Cort%C3%A1zar_novel)'}];
	assert.deepEqual(addUrls(links, results), searchResultsUrls);
});

QUnit.test("create array containing 10 objects", function(assert) {
	var x = createSearchResultsObject(10);
	assert.equal(x.length, 10);
	assert.equal(typeof x[5], "object");
});

QUnit.test("get consolidated search results object", function(assert) {
	var completeObj = getConsolidatedSearchResultsObj();
	assert.ok(completeObj[5].title);
	assert.ok(completeObj[5].url);
	assert.ok(completeObj[5].snippet);
});

var wikiResponse = {
	"batchcomplete": true,
	"continue": {
		"sroffset": 10,
		"continue": "-||"
	},
	"query": {
		"searchinfo": {
			"totalhits": 375
		},
		"search": [{
			"ns": 0,
			"title": "Julio Cortázar",
			"snippet": "&quot;<span class=\"searchmatch\">Cortázar</span>&quot; redirects here. For other uses, see <span class=\"searchmatch\">Cortázar</span> (disambiguation). <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>, born Jules Florencio <span class=\"searchmatch\">Cortázar</span> (American Spanish: [ˈxuljo korˈtasar] ("
		}, {
			"ns": 0,
			"title": "Último round",
			"snippet": "title translates as Last Round, as in boxing) is a two-volume work by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published by Siglo XXI Editores in 1969. Containing nearly one hundred"
		}, {
			"ns": 0,
			"title": "The Winners (novel)",
			"snippet": "The Winners (Spanish: Los premios) is a novel by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published in 1960. It was his first published novel (though not the first novel he wrote)"
		}, {
			"ns": 0,
			"title": "Final del juego",
			"snippet": "juego (End of the Game) is a book of eighteen short stories written by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>.    Continuidad de los Parques (&quot;Continuity of Parks&quot;) No se culpe a"
		}, {
			"ns": 0,
			"title": "62: A Model Kit",
			"snippet": "62: A Model Kit (translated from 62/Modelo para armar) is a novel by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published in 1968."
		}, {
			"ns": 0,
			"title": "Bestiario",
			"snippet": "Bestiario is a book of eight short stories written by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>. All the stories (except &quot;Cefalea&quot;) were translated in English by Paul Blackburn and"
		}, {
			"ns": 0,
			"title": "Todos los fuegos el fuego",
			"snippet": "(&quot;All Fires The Fire&quot;) is a book of eight short stories written by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>.  &quot;La autopista del sur&quot; (South Highway) &quot;La salud de los enfermos&quot;"
		}, {
			"ns": 0,
			"title": "Fantomas contra los vampiros multinacionales",
			"snippet": "Fantomas contra los vampiros multinacionales is a comic book by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> published in 1975. The book mimics film noir-style comic book stories with"
		}, {
			"ns": 0,
			"title": "Prosa del Observatorio",
			"snippet": "translation of Prosa del observatorio, a book of text and photographs by <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span> originally published in Spanish in 1972. The photographs depict the"
		}, {
			"ns": 0,
			"title": "Hopscotch (Julio Cortázar novel)",
			"snippet": "Hopscotch (Spanish: Rayuela) is a novel by Argentine writer <span class=\"searchmatch\">Julio</span> <span class=\"searchmatch\">Cortázar</span>. Written in Paris, it was published in Spanish in 1963 and in English in 1966"
		}]
	}
};

var searchInfo = wikiResponse.query.search;

var urlResponse = 
{"batchcomplete":"","query":{"pages":
	{"13945880":{"pageid":13945880,"ns":0,"title":"62: A Model Kit","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":622266144,"length":879,"fullurl":"https://en.wikipedia.org/wiki/62:_A_Model_Kit","editurl":"https://en.wikipedia.org/w/index.php?title=62:_A_Model_Kit&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/62:_A_Model_Kit"},"14119524":{"pageid":14119524,"ns":0,"title":"Bestiario","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":696251568,"length":1609,"fullurl":"https://en.wikipedia.org/wiki/Bestiario","editurl":"https://en.wikipedia.org/w/index.php?title=Bestiario&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Bestiario"},"14063898":{"pageid":14063898,"ns":0,"title":"Fantomas contra los vampiros multinacionales","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":643907450,"length":1098,"fullurl":"https://en.wikipedia.org/wiki/Fantomas_contra_los_vampiros_multinacionales","editurl":"https://en.wikipedia.org/w/index.php?title=Fantomas_contra_los_vampiros_multinacionales&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Fantomas_contra_los_vampiros_multinacionales"},"14119796":{"pageid":14119796,"ns":0,"title":"Final del juego","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":712567889,"length":1969,"fullurl":"https://en.wikipedia.org/wiki/Final_del_juego","editurl":"https://en.wikipedia.org/w/index.php?title=Final_del_juego&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Final_del_juego"},"841100":{"pageid":841100,"ns":0,"title":"Hopscotch (Julio Cort\u00e1zar novel)","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":700005829,"length":21537,"fullurl":"https://en.wikipedia.org/wiki/Hopscotch_(Julio_Cort%C3%A1zar_novel)","editurl":"https://en.wikipedia.org/w/index.php?title=Hopscotch_(Julio_Cort%C3%A1zar_novel)&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Hopscotch_(Julio_Cort%C3%A1zar_novel)"},"334671":{"pageid":334671,"ns":0,"title":"Julio Cort\u00e1zar","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T17:28:29Z","lastrevid":712465349,"length":26469,"fullurl":"https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar","editurl":"https://en.wikipedia.org/w/index.php?title=Julio_Cort%C3%A1zar&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar"},"14064129":{"pageid":14064129,"ns":0,"title":"Prosa del Observatorio","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":693112986,"length":1239,"fullurl":"https://en.wikipedia.org/wiki/Prosa_del_Observatorio","editurl":"https://en.wikipedia.org/w/index.php?title=Prosa_del_Observatorio&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Prosa_del_Observatorio"},"14121254":{"pageid":14121254,"ns":0,"title":"The Winners (novel)","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":698374572,"length":1878,"fullurl":"https://en.wikipedia.org/wiki/The_Winners_(novel)","editurl":"https://en.wikipedia.org/w/index.php?title=The_Winners_(novel)&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/The_Winners_(novel)"},"14119906":{"pageid":14119906,"ns":0,"title":"Todos los fuegos el fuego","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":693112710,"length":1371,"fullurl":"https://en.wikipedia.org/wiki/Todos_los_fuegos_el_fuego","editurl":"https://en.wikipedia.org/w/index.php?title=Todos_los_fuegos_el_fuego&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/Todos_los_fuegos_el_fuego"},"13951844":{"pageid":13951844,"ns":0,"title":"\u00daltimo round","contentmodel":"wikitext","pagelanguage":"en","pagelanguagehtmlcode":"en","pagelanguagedir":"ltr","touched":"2016-03-30T16:50:09Z","lastrevid":693112919,"length":1114,"fullurl":"https://en.wikipedia.org/wiki/%C3%9Altimo_round","editurl":"https://en.wikipedia.org/w/index.php?title=%C3%9Altimo_round&action=edit","canonicalurl":"https://en.wikipedia.org/wiki/%C3%9Altimo_round"}}}};

var urlOre = urlResponse.query.pages;
//var searchResults = [];



//displaying search results
QUnit.test("insert titles", function(assert) {
	var results = getConsolidatedSearchResultsObj();
	stylePageAfterSearch();
	populateTitles(results);
	assert.ok(document.getElementsByClassName("title-link")[5].textContent);
});


QUnit.test("insert urls", function(assert) {
	var results = getConsolidatedSearchResultsObj();
	stylePageAfterSearch();
	populateUrls(results);
	assert.ok(document.getElementsByClassName("title-link")[0].getAttribute("href"),
	"https://en.wikipedia.org/wiki/Julio_Cort%C3%A1zar");
});


QUnit.test("insert snippets", function(assert) {
	var results = getConsolidatedSearchResultsObj();
	stylePageAfterSearch();
	populateSnippets(results);
	assert.ok(document.getElementsByClassName("search-result")[0].textContent);
});





































