const Constants = require('./Constants');

const LINTER_EXCEPTION = 'Linter Exception';
const types            = {
    UNKNOWN_ERROR    : 'UNKNOWN_ERROR',
    INVALID_TEMPLATE : 'INVALID_TEMPLATE'
};

const unbalancedElementError = (elementType, lineNumber) => {
    return {
        message : `Invalid ISML DOM :: Unbalanced <${elementType}> element at line ${lineNumber}`,
        type    : LINTER_EXCEPTION
    };
};

const parseError = fileName => {
    return {
        message : `An unexpected error happenned while parsing ${fileName}. Please report it to ${Constants.repositoryUrl} and add the file to the ignore list while a fix is not available.`,
        type    : LINTER_EXCEPTION
    };
};

module.exports = {
    parseError             : parseError,
    unbalancedElementError : unbalancedElementError,
    types,
    LINTER_EXCEPTION
};
