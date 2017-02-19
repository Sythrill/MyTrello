function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    var i = 0;
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};

function Column(name) {
    var self = this;
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();
    function createColumn() {
        var $column = $('<li>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete-column').text('-delete column');
        var $columnAddCard = $('<button>').addClass('add-card').text('+add card');
        $columnDelete.click(function () {
            self.removeColumn();
        });
        $columnAddCard.click(function () {
            var newCard;
            newCard = prompt('Wpisz nazwę karty');
             if (!newCard) {
                return;
            }
            self.addCard(new Card(newCard)); 
        });
        $column.append($columnTitle)
            .append($columnDelete)
            .append($columnAddCard)
            .append($columnCardList);
        return $column;
    }
};

Column.prototype = {
    addCard: function (card) {
        this.$element.children('ul').append(card.$element);
    },
    removeColumn: function () {
        this.$element.remove();
    }
};

function Card(description) {
    var self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard();
    function createCard() {
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.description);
        var $cardDelete = $('<button>').addClass('btn-delete').text('x');
        $cardDelete.click(function () {
            self.removeCard();
        });
        $card.append($cardDelete);
        $card.append($cardDescription);
        return $card;
    }
};

Card.prototype = {
    removeCard: function () {
        this.$element.remove();
    }
};

var board = {
    name: 'Tablica Kanban',
    addColumn: function (column) {
        this.$element.append(column.$element);
        columnSortable();
        cardSortable();
    },
    $element: $('#board .column-container > .column-list')
};

$('.create-column').click(function (column) {
    var name = prompt('Wpisz nazwę kolumny');
    var column = new Column(name);
        if (!name) {
        return;
    }
    board.addColumn(column);
});

function columnSortable() {
    $('.column-list').sortable({
        connectWith: '.column-list',
        placeholder: 'column-placeholder'
    }).disableSelection();
};

function cardSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
};