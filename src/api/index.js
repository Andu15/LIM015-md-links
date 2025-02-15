// Desde este archivo debes exportar una función (mdLinks).
const { pathExist } = require('./path.js');
const { traverseDirectoryFindFiles, traverseFilesToFindLinks, validateStatus } = require('./mdLinksApi.js');

const mdLinks = (path, options) => {
  return new Promise(function (resolve, reject) {
    if (pathExist(path)) {
      if (traverseDirectoryFindFiles(path).length !== 0) {
        if (traverseFilesToFindLinks(path).length !== 0) {
          if (options.validate === true) {
            resolve(validateStatus(path));
              // .then((result) => resolve(result))
              // .catch((error) => resolve(error));
          } else {
            resolve(traverseFilesToFindLinks(path));
          }
        } else {
          reject('No existen links');
        }
      } else {
        reject('No existen archivos markdown');
      }
    } else {
      reject('La ruta no existe');
    }
  });
};

// mdLinks('lib/prueba/prueba5.md', { validate: false })
//   .then(resolve => console.log(resolve))
//   .catch(reject => console.log(reject))

module.exports = {
  mdLinks
};
