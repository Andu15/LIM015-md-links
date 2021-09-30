// cantidad de links u objetos
const totalLinks = (arrayLinks) => `Total: ${arrayLinks.length}`;

// número de links únicos
const uniqueLinks = (arrayLinks) => {
  const mySet = new Set();
  arrayLinks.forEach((link) => mySet.add(link.href));
  return `Unique: ${mySet.size}`;
};

// obtener el numero de links rotos
const brokenLinks = (arrayLinks) => {
  const result = arrayLinks.filter((obj) => obj.status >= 400);
  return `Broken: ${result.length}`;
}

// obtener el numero de links ok
const okLinks = (arrayLinks) => {
  const result = arrayLinks.filter((obj) => obj.message === 'ok');
  return `ok: ${result.length}`;
}

// ------------------------------ Mensaje de ayuda de consola ------------------------------
const help = `
█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█ Prueba los sgtes comandos:
█░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗░█ --validate: Obtendras el href, title, file, status y message de cada link
█░║║║╠─║─║─║║║║║╠─░█ --stats: Obtendras el numero de links totales y unicos
█░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝░█ --validate --stats: Obtendras el numero de links totales, unicos y rotos
█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█ 

PDTA: No olvides que para ejecutar el programa es necesario ingresar:
md-links <ruta> <comando>
`;

const errRouteDoesntExist = `
              ░░░░░░░░░░░░░░░░░░░░░░░░░
              ░░░░░░▄█░░░░░░░░░░░░██░░
              ░░░░░▄██░░░░░░░░░░░███░░░
              ░░░░░███░░░░░░░░░░████░░░
              ░░░░████░░▄▄▄▄░░░█████░░░
              ░░░███████████████████░░░
              ░░░███████████████████░░░
              ░▄█████████████████████░░
              ░██████████████████████░░
              ░██████████████████████░░
              ░█░▀████████▀░▄████████░░
              ▄██▄▄█████▄▄▄██████████▄░
              ██▀███████▀▀█▀▀░░███████░
              ░█░░░▀▀▀░░░░▀▀░░░███████░
              ░█░░░████▄░░░░░░░████████
              ░█░░░░░░░░░░░░░░░████████
              ░██░░░░░░░░░░░░░░████████
              ░▀█░░░░░░░░░░░░▄█████████
█╔╗╔╗███████████╔╗╔╗████╔╗███████████████╔╗███████████╔╗█
╔╝╚╣║██████████╔╝╚╣║████║║██████████████╔╝╚╗█████████╔╝╚╗
╚╗╔╣╚═╦══╗╔══╦═╩╗╔╣╚═╗╔═╝╠══╦══╦══╗╔═╗╔═╩╗╔╝╔══╦╗╔╦╦═╩╗╔╝
█║║║╔╗║║═╣║╔╗║╔╗║║║╔╗║║╔╗║╔╗║║═╣══╣║╔╗╣╔╗║║█║║═╬╬╬╬╣══╣║█
█║╚╣║║║║═╣║╚╝║╔╗║╚╣║║║║╚╝║╚╝║║═╬══║║║║║╚╝║╚╗║║═╬╬╬╣╠══║╚╗
█╚═╩╝╚╩══╝║╔═╩╝╚╩═╩╝╚╝╚══╩══╩══╩══╝╚╝╚╩══╩═╝╚══╩╝╚╩╩══╩═╝
██████████║║█████████████████████████████████████████████
██████████╚╝█████████████████████████████████████████████
`;

const filesMdDoesntExist = `
             ͡๏_͡๏
╔══════════════════════════════════╗
║ ░░░░░░░░░░░░░░░╔╗░░░╔╗░░░░░░░░░░░║
║ ░░░░░░░░░░░░░░░║║░░░║║░░░░░░░░░░░║
║ ╔═╗╔══╗╔╗╔╦══╦═╣║╔╦═╝╠══╦╗╔╗╔╦═╗░║
║ ║╔╗╣╔╗║║╚╝║╔╗║╔╣╚╝╣╔╗║╔╗║╚╝╚╝║╔╗╗║
║ ║║║║╚╝║║║║║╔╗║║║╔╗╣╚╝║╚╝╠╗╔╗╔╣║║║║
║ ╚╝╚╩══╝╚╩╩╩╝╚╩╝╚╝╚╩══╩══╝╚╝╚╝╚╝╚╝║
║ ░░░░╔═╗╔╗░░░░░░░░░░░░░░░░░╔╗░░░░░║
║ ░░░░║╔╝║║░░░░░░░░░░░░░░░░╔╝╚╗░░░░║
║ ░░░╔╝╚╦╣║╔══╦══╗╔══╦╗╔╦╦═╩╗╔╝░░░░║
║ ░░░╚╗╔╬╣║║║═╣══╣║║═╬╬╬╬╣══╣║░░░░░║
║ ░░░░║║║║╚╣║═╬══║║║═╬╬╬╣╠══║╚╗░░░░║
║ ░░░░╚╝╚╩═╩══╩══╝╚══╩╝╚╩╩══╩═╝░░░░║
╚══════════════════════════════════╝
`;

const linksDoesntExist = `
                     ......               
                  .:||||||||:.            
                 /            \           
                (   o      o   )          
      --@@@@----------:  :----------@@@@--
              THERE ARE NO LINKS
`;

const otherReject = `
                      /^--^\   
                      \____/   
                     /      \  
     NOT FOUND!     |        | 
                     \__  __/  
|^|^|^|^|^|^|^|^|^|^|^|^\ \^|^|
| | | | | | | | | | | | |\ \| |
########################/ /####
| | | | | | | | | | | | \/| | |
|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|
`;

module.exports = {
  totalLinks,
  uniqueLinks,
  brokenLinks,
  okLinks,
  help,
  errRouteDoesntExist,
  filesMdDoesntExist,
  linksDoesntExist,
  otherReject
};