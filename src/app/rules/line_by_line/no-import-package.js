const SingleLineRulePrototype = require('../prototypes/SingleLineRulePrototype');

const ruleName       = require('path').basename(__filename).slice(0, -3);
const description    = 'Avoid using importPackage()';
const occurrenceText = 'importPackage';

const Rule = Object.create(SingleLineRulePrototype);

Rule.init(ruleName, description);

Rule.isBroken = function(line) { return line.indexOf(occurrenceText) !== -1; };

Rule.getFirstOccurrence = function(line) {

    let result = null;

    if (this.isBroken(line)) {

        const matchPos = line.indexOf(occurrenceText);

        result = {
            globalPos : matchPos,
            length      : occurrenceText.length
        };
    }

    return result;
};

module.exports = Rule;
