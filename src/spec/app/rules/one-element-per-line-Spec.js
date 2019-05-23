const specFileName = require('path').basename(__filename);
const SpecHelper   = require('../../SpecHelper');
const rule         = SpecHelper.getTreeRule(specFileName);

describe(rule.name, () => {
    beforeEach(() => {
        SpecHelper.beforeEach();
    });

    afterEach(() => {
        SpecHelper.afterEach();
    });

    it('detects elements in the same line', () => {
        const result = SpecHelper.parseAndApplyRuleToTemplate(rule, 0)[0];

        expect(result.line).toEqual('${Resource.msg(\'field.billing.address.last.name\',\'address\',null)}');
        expect(result.lineNumber).toEqual(7);
        expect(result.globalPos).toEqual(360);
        expect(result.length).toEqual(65);
        expect(result.rule).toEqual(rule.name);
        expect(result.message).toEqual(rule.description);
    });

    it('allows one element per line', () => {
        const result = SpecHelper.parseAndApplyRuleToTemplate(rule, 1);

        expect(result).toEqual([]);
    });
});
