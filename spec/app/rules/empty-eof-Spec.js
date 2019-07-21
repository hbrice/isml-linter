const specFileName = require('path').basename(__filename);
const SpecHelper   = require('../../SpecHelper');

const rule = SpecHelper.getTreeRule(specFileName);

describe(rule.name, () => {
    beforeEach(() => {
        SpecHelper.beforeEach();
    });

    afterEach(() => {
        SpecHelper.afterEach();
    });

    it('allows an empty last line', () => {
        const occurrence = SpecHelper.parseAndApplyRuleToTemplate(rule, 0);

        expect(occurrence.length).toEqual(0);
    });

    it('detects a non-empty-last line', () => {
        const occurrence = SpecHelper.parseAndApplyRuleToTemplate(rule, 1)[0];

        expect(occurrence.line      ).toEqual('I\'m a hardcoded-text');
        expect(occurrence.lineNumber).toEqual(4);
        expect(occurrence.globalPos ).toEqual(21);
        expect(occurrence.length    ).toEqual(1);
        expect(occurrence.rule      ).toEqual(rule.name);
        expect(occurrence.message   ).toEqual(rule.description);
    });

    it('detects a last line with blank spaces', () => {
        const occurrence = SpecHelper.parseAndApplyRuleToTemplate(rule, 2)[0];

        expect(occurrence.line      ).toEqual('   ');
        expect(occurrence.lineNumber).toEqual(3);
        expect(occurrence.globalPos ).toEqual(20);
        expect(occurrence.length    ).toEqual(1);
        expect(occurrence.rule      ).toEqual(rule.name);
        expect(occurrence.message   ).toEqual(rule.description);
    });
});