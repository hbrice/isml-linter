const Constants = require('../Constants');

const types = {
    UNKNOWN_ERROR    : 'UNKNOWN_ERROR',
    INVALID_TEMPLATE : 'INVALID_TEMPLATE',
    NO_CONFIG        : 'NO_CONFIG',
};

const unbalancedElementError = (elementType, lineNumber, globalPos, length, templatePath) => {
    return {
        message      : `Unbalanced <${elementType}> element`,
        templatePath : templatePath,
        globalPos,
        length,
        lineNumber   : lineNumber,
        isCustom     : true,
        type         : types.INVALID_TEMPLATE
    };
};

const parseError = (elementType, lineNumber, globalPos, length, templatePath) => {
    return {
        message      : `An unexpected error happened while parsing element ${elementType} at ${templatePath}:${lineNumber}.`,
        templatePath : templatePath,
        globalPos,
        length,
        lineNumber   : lineNumber,
        isCustom     : true,
        type         : types.UNKNOWN_ERROR
    };
};

const noConfigError = () => {
    return {
        message  : `No configuration found. Please run the following command: ${Constants.EOL}${Constants.EOL}\tnode ./node_modules/.bin/isml-linter --init${Constants.EOL}${Constants.EOL}`,
        isCustom : true
    };
};

const emptyException = () => {
    return {
        isCustom : true
    };
};

const isLinterException = e => e && e.isCustom;

module.exports = {
    parseError,
    unbalancedElementError,
    noConfigError,
    emptyException,
    isLinterException,
    types
};
