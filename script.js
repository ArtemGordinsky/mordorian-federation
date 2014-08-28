var MordorianFederation = function() {
    this._textNodes = null;
    this._dictionary = {
        'россияне': 'Мордоряне',
        'россия': 'Мордор',
        'рф': 'М',
        ' из россии': ' из Мордора',
        ' для россии': ' для Мордора',
        ' у россии': ' у Мордора',
        ' в россии': ' в Мордоре',
        'россии': 'Мордора',
        'россию': 'Мордор',
        'россией': 'Мордором',
        'российская федерация': 'Мордор',
        'российскую федерацию': 'Мордор',
        'российской федерации': 'Мордора',
        'российск': 'мордорск',

        'росіян': 'Мордорян',
        'росія': 'Мордор',
        ' у росії': ' у Мордорі',
        ' з росії': ' з Мордору',
        ' через росію': ' через Мордор',
        'росії': 'Мордору',
        'росію': 'Мордор',
        'росією': 'Мордором',
        'російська федерація': 'Мордор',
        'російську федерацію': 'Мордор',
        'російської федерації': 'Мордору',
        'російськ': 'мордорськ',

        'russian federation': 'Mordor',
        'russian': 'Mordorian',
        'russia': 'Mordor'
    };

    this._replacementRegex = new RegExp(Object.keys(this._dictionary).join('|').replace(/\s/g, '\\s'), 'gi');
};

MordorianFederation.prototype.run = function() {
    this._replaceInTextNodes();
};

MordorianFederation.prototype._replaceInTextNodes = function() {
    var self = this,
        textNodes = this._getTextNodes(),
        textNodesCount = textNodes.length;

    if (textNodesCount === 0) {
        return;
    }

    for (var textNodeIterator = 0; textNodeIterator < textNodesCount; textNodeIterator++) {
        var node = textNodes[textNodeIterator],
            nodeText = node.textContent;

        node.textContent = nodeText.replace(this._replacementRegex, function(match) {
            // TODO: preserve the case
            return self._dictionary[match.toLowerCase()];
        });
    }
};

MordorianFederation.prototype._getTextNodes = function() {
    if (this._textNodes === null) {
        this._textNodes = this._collectTextNodes();
    }

    return this._textNodes;
};

MordorianFederation.prototype._collectTextNodes = function(element) {
    element = (element || document.body);
    var nodes = element.childNodes,
        nodeCount = nodes.length;

    var textNodes = [];
    for (var nodeIterator = 0; nodeIterator < nodeCount; nodeIterator++) {
        var node = nodes[nodeIterator];
        if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node);
        } else {
            textNodes = textNodes.concat(this._collectTextNodes(node));
        }
    }

    return textNodes;
};

var mordorianFederation = new MordorianFederation();
mordorianFederation.run();