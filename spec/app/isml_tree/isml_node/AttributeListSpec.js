const SpecHelper = require('../../../SpecHelper');
const IsmlNode   = require('../../../../src/isml_tree/IsmlNode');
const Constants  = require('../../../../src/Constants');

describe('IsmlNode', () => {

    beforeEach(() => {
        SpecHelper.beforeEach();
    });

    afterEach(() => {
        SpecHelper.afterEach();
    });

    it('lists its attributes for single values', () => {
        const node   = new IsmlNode('<table class="some_class" style="width:7px">');
        const actual = node.getAttributeList();

        expect(actual[0].name).toEqual('class');
        expect(actual[0].value).toEqual('some_class');

        expect(actual[1].name).toEqual('style');
        expect(actual[1].value).toEqual('width:7px');
    });

    it('lists its attributes for value-less attributes', () => {
        const node   = new IsmlNode('<input type="checkbox" checked>');
        const actual = node.getAttributeList();


        expect(actual[0].name).toEqual('type');
        expect(actual[0].value).toEqual('checkbox');

        expect(actual[1].name).toEqual('checked');
        expect(actual[1].value).toEqual(null);
    });

    it('lists its attributes for attributes with more than one value', () => {
        const node   = new IsmlNode('<span class="class_1 class_2" data-url="https://">');
        const actual = node.getAttributeList();

        expect(actual[0].name).toEqual('class');
        expect(actual[0].values).toEqual(['class_1', 'class_2']);

        expect(actual[1].name).toEqual('data-url');
        expect(actual[1].value).toEqual('https://');
        expect(actual[1].values).toEqual(['https://']);
    });

    it('lists its no attributes if there is none for non-self-closing element', () => {
        const node   = new IsmlNode('<span >');
        const actual = node.getAttributeList();

        expect(actual).toEqual([]);
    });

    it('lists no attributes for hardcodes', () => {
        const node   = new IsmlNode('hardcoded-text');
        const actual = node.getAttributeList();

        expect(actual).toEqual([]);
    });

    it('lists no attributes for expressions', () => {
        const node   = new IsmlNode('${"expression"}');
        const actual = node.getAttributeList();

        expect(actual).toEqual([]);
    });

    it('lists no attributes for empty nodes', () => {
        const node   = new IsmlNode(`${Constants.EOL}  ${Constants.EOL}${Constants.EOL}`);
        const actual = node.getAttributeList();

        expect(actual).toEqual([]);
    });

    it('lists no attributes for attribute-less self-closing elements', () => {
        const node   = new IsmlNode('<div />');
        const actual = node.getAttributeList();

        expect(actual).toEqual([]);
    });

    it('lists attributes for self-closing elements', () => {
        const node   = new IsmlNode('<div class="class_1 class_2" data-url="https://" />');
        const actual = node.getAttributeList();

        expect(actual[0].name).toEqual('class');
        expect(actual[0].values).toEqual(['class_1', 'class_2']);

        expect(actual[1].name).toEqual('data-url');
        expect(actual[1].value).toEqual('https://');
        expect(actual[1].values).toEqual(['https://']);
    });
});
