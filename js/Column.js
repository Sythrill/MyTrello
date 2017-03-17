function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="column-card-list"></ul>');
		var columnDelete = $('<button class="btn-delete-column">x</button>');
		var columnAddCard = $('<button class="column-add-card">+ add card</button>');
		var columnNameChange = $('<button class="column-ch-card">+ new column name</button>');
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function () {
			self.deleteColumn();
		});

		columnNameChange.click(function () {
			self.changeName();
		});

		columnAddCard.click(function (event) {
			var cardName = prompt("Wpisz nazwę karty");
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function (response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			});
		});

		// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnNameChange)
			.append(columnAddCard)
			.append(columnCardList);
		return column;
	}
}
Column.prototype = {
	createCard: function (card) {
		this.element.children('ul').append(card.element);
	},
	deleteColumn: function () {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function (response) {
				self.element.remove();
			}
		});
	},
	changeName: function () {
		var self = this;
		var Name = prompt("Wpisz nową nazwę");
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'PUT',
			data: {
				name: Name
			},
			success: function () {
				window.location.reload();
			}
		});
	}
};