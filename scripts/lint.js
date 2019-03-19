#!/usr/bin/env node

require('../src/app/NativeExtensionUtils');

const Builder  = require('../index').Builder;
const exitCode = Builder.run();

process.argv.forEach( val => {
    val === '--build' && process.exit(exitCode);
});