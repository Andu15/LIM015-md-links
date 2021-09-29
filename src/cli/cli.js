#!/usr/bin/env node
const { mdLinks } = require('../api/index.js');
const chalk = require('chalk');
const yargs = require('yargs');

const myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);
console.log(yargs)