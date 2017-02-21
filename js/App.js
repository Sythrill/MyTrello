var baseUrl = 'https://kodilla.com/pl/bootcamp-api';

var myHeaders = { 
	'X-Client-Id': [1522], 
	'X-Auth-Token': [ebf50647bd6f4072d0383f2dbb873fc5]
 };

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	succes: function(response) {
		setupColumns(response.columns);
	}
});

function setupColumns(columns) {
	columns.forEach(function(column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col,column.cards);
	});
};

function setupCards(col, cards) {
	cards.forEach(function(card) {
		var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.createCard(card);
	});
};


