"use strict"

var a = {
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

var results = document.getElementsByClassName("search-result");
console.log(results);
console.log(a.query.search[0].snippet);
