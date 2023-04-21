#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const PrettyConsole = require('../lib/PrettyConsole');
const TSCONFIG = require('../tsconfig.json');

const PROJECT_TYPESCRIPT_CONFIG_PATH = path.resolve(
    process.cwd(),
    'tsconfig.json',
);
const PROJECT_TYPESCRIPT_SAMPLE_CONFIG_PATH = path.resolve(
    process.cwd(),
    '.prettierrc.sample',
);

/**
 * Function to setup TypeScript configuration
 *
 * @param {string} option - Selected option, can be 'override', 'merge', 'create', 'sample'
 */
function updateTsconfig(option) {
    const prettyConsole = new PrettyConsole();
    prettyConsole.closeByNewLine = true;
    prettyConsole.useIcons = true;

    let projectTsConfig = {};

    if (option === 'override' || option === 'create') {
        fs.writeFileSync(
            PROJECT_TYPESCRIPT_CONFIG_PATH,
            JSON.stringify(TSCONFIG, null, 4),
        );
    } else if (option === 'merge') {
        try {
            projectTsConfig = JSON.parse(
                fs.readFileSync(PROJECT_TYPESCRIPT_CONFIG_PATH),
            );
        } catch (err) {
            prettyConsole.error('tsconfig.json file not found');
            prettyConsole.info('We will create a new one for you');
        }

        const mergedTsConfig = {
            ...TSCONFIG,
            ...projectTsConfig,
        };

        fs.writeFileSync(
            PROJECT_TYPESCRIPT_CONFIG_PATH,
            JSON.stringify(mergedTsConfig, null, 4),
        );
    } else if (option === 'sample') {
        fs.writeFileSync(
            PROJECT_TYPESCRIPT_SAMPLE_CONFIG_PATH,
            JSON.stringify(TSCONFIG, null, 4),
        );
    }
}

module.exports = updateTsconfig;
