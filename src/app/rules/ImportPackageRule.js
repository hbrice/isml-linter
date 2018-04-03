const AbstractSingleLineRule = require('../AbstractSingleLineRule');

const ruleName = require('path').basename(__filename).slice(0, -3);
const description = 'Avoid using importPackage()';

class Rule extends AbstractSingleLineRule {
    constructor() { super(ruleName, description); }

    isBroken(line) { return line.indexOf('importPackage') !== -1; }
}

module.exports = new Rule;
