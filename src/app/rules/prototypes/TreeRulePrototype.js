const RulePrototype = require('./RulePrototype');

const TreeRulePrototype = Object.create(RulePrototype);

TreeRulePrototype.check = function(node, result) {

    const that  = this;
    this.result = result || {
        occurrences: []
    };

    node.children.forEach( child => this.check(child, this.result));

    if (this.isBroken(node)) {
        that.add(
            node.getValue().trim(),
            node.getLineNumber() - 1,
            node.getGlobalPos(),
            node.getValue().length
        );
    }

    return this.result;
};

module.exports = TreeRulePrototype;