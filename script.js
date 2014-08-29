var MordorianFederation = function() {
    this._textNodes = null;
    this._regex = null;
    this._dictionary = {
        'россияне': 'Мордоряне',
        'россиянин': 'Мордорянин',
        'россиян': 'Мордорян',
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

        'росіянин': 'Мордорянин',
        'росіян': 'Мордорян',
        'росія': 'Мордор',
        ' у росії': ' у Мордорі',
        ' з росії': ' з Мордору',
        ' через росію': ' через Мордор',
        'росії': 'Мордору',
        'росію': 'Мордор',
        'росією': 'Мордором',
        'росіє': 'Мордоре',
        'російська федерація': 'Мордор',
        'російську федерацію': 'Мордор',
        'російської федерації': 'Мордору',
        'російськ': 'мордорськ',

        'russian federation': 'Mordor',
        'russian': 'Mordorian',
        'russia': 'Mordor'
    };
};

MordorianFederation.prototype.init = function() {
    this._assembleTheRegex();
    return this;
};

MordorianFederation.prototype.run = function() {
    this._translateTextNodes();
    this._translateTheTitle();
};

MordorianFederation.prototype._translateTextNodes = function() {
    var textNodes = this._getTextNodes(),
        textNodesCount = textNodes.length;

    if (textNodesCount === 0) {
        return;
    }

    for (var textNodeIterator = 0; textNodeIterator < textNodesCount; textNodeIterator++) {
        var node = textNodes[textNodeIterator],
            nodeText = node.textContent;

        node.textContent = this._translateString(nodeText)
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
            if (node.textContent.trim().length > 0) {
                textNodes.push(node);
            }
        } else {
            textNodes = textNodes.concat(this._collectTextNodes(node));
        }
    }

    return textNodes;
};

MordorianFederation.prototype._translateTheTitle = function() {
    var title = document.title;
    document.title = this._translateString(title);
};

MordorianFederation.prototype._translateString = function(string) {
    var self = this,
        translatedString;

    translatedString = string.replace(this._regex, function(match) {
        var translation = self._dictionary[match.toLowerCase()];

        // keep first letter's case
        if (match[0] === match[0].toUpperCase()) {
            translation[0] = translation[0].toUpperCase();
        } else {
            translation[0] = translation[0].toLowerCase();
        }

        return translation;
    });

    return translatedString;
};

MordorianFederation.prototype._assembleTheRegex = function() {
    var regexString = Object.keys(this._dictionary).join('|');

    regexString = regexString.replace(/\s/g, '\\s');
    this._regex = new RegExp(regexString, 'gi');
};

var mordorianFederation = new MordorianFederation();
mordorianFederation.init().run();