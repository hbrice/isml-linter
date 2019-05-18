const SingleLineRulePrototype = require('../prototypes/SingleLineRulePrototype');

const ruleName    = require('path').basename(__filename).slice(0, -3);
const description = 'Line contains only blank spaces';

const Rule = Object.create(SingleLineRulePrototype);

Rule.init(ruleName, description);

Rule.isBroken = function(line) { return line !== '' && line !== '\r' && line !== '\n' && !/\S/.test(line); };

Rule.getFixedContent = function(fileContent) {
    return fileContent
        .split('\n')
        .map( line => line.trim() ? line : line.trim())
        .join('\n');
};

Rule.getFirstOccurrence = function(line) {

    let result = null;

    if (this.isBroken(line)) {
        result = {
            globalPos : 0,
            length      : line.length+1
        };
    }

    return result;
};

module.exports = Rule;
