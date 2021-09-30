#!/usr/bin/env node
const { mdLinks } = require('../api/index.js');
const { totalLinks, uniqueLinks, brokenLinks, okLinks,
  help, errRouteDoesntExist, filesMdDoesntExist,
  linksDoesntExist, otherReject } = require('../cli/options.js');
const chalk = require('chalk');
// const yargs = require('yargs');

// argumentos desde la posicion 2:
const myArgs = process.argv.slice(2);

// si el usuario NO ingresa argumentos
if (myArgs.length === 0) {
  console.warn(chalk.white.bgRed.bold('Debes ingresar una ruta'));
}

// si pasa un argumento (sea --help o una ruta)
if (myArgs.length === 1) {
  switch (myArgs[0]) {
    case '--help':
      console.log(chalk.yellow('¿Necesitas ayuda?' + help));
      break;
    
    default:
      mdLinks(myArgs[0], { validate: false })
        .then(resolve => console.table(resolve))
        .catch(reject => {
          if (reject === 'La ruta no existe') {
            console.log(chalk.red.bold(errRouteDoesntExist));
          } else if (reject === 'No existen archivos markdown') {
            console.log(chalk.red.bold(filesMdDoesntExist));
          } else if (reject === 'No existen links') {
            console.log(chalk.red.bold(linksDoesntExist));
          } else {
            console.log(chalk.cyan(otherReject));
          }
        })
  }
}

/* ----------- Seccion de comandos: acepta validate, stats, ambos ----------- */
// si tiene solo 1 comando
if (myArgs.length === 2) {
  switch (myArgs[1]) {
    case '--validate':
      mdLinks(myArgs[0], { validate: true })
        .then(resolve => {
          for (const obj of resolve) {
            console.log('El informe de status del link %s es, %o', chalk.blueBright.italic(obj.href), obj);
          }
        })
        .catch(reject => console.log(chalk.red(reject)))
      break;

    case '--stats':
      mdLinks(myArgs[0], { validate: true })
        .then(resolve => {
          console.log(chalk.magenta.bold(totalLinks(resolve)));
          console.log(chalk.cyan.bold(uniqueLinks(resolve)));
        })
        .catch(reject => console.log(chalk.red(reject)))
      break;
    
    default:
      console.log(chalk.yellow(help));
  }
}

// si tiene 2 comandos
if (myArgs.length === 3) {
  if (myArgs[1] === '--validate' && myArgs[2] === '--stats' || myArgs[1] === '--stats' && myArgs[2] === '--validate') {
    mdLinks(myArgs[0], { validate: true })
      .then(resolve => {
        console.log(chalk.magenta.bold(totalLinks(resolve)));
        console.log(chalk.cyan.bold(uniqueLinks(resolve)));
        console.log(chalk.blueBright.bold(brokenLinks(resolve)));
        console.log(chalk.greenBright.bold(okLinks(resolve)));
      })
      .catch(reject => console.log(chalk.red(reject)))
  }
}

// si tiene mas de 2 comandos
if (myArgs.length >= 3) {
  console.error(chalk.white.bgRed.bold('Haz excedido el número de argumentos permitidos'));
  console.log(chalk.yellow(otherReject));
}
