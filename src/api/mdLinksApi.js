// traer el modulo de path
const { pathAbsolute,
  pathIsDirectory, readDirectory, extIsMd, readFile, concatRoute } = require('./path.js');
const marked = require('marked');
const fetch = require('node-fetch');

// función recursiva para detectar archivos .md
const traverseDirectoryFindFiles = (route) => {
  let container = [];
  if (pathIsDirectory(route)) {
    readDirectory(route).forEach((element) => {
      const newRoute = concatRoute(route, element);
      const loopOfRoutes = traverseDirectoryFindFiles(newRoute);
      container = container.concat(loopOfRoutes);
    });
  } else {
    extIsMd(route) ? container.push(pathAbsolute(route)) : false
  }
  return container;
};

// falta la propiedad line a cada objeto link indicando en qué línea del archivo se encontró el link---
// función para obtener un array con los objs(href, textContent y ruta) de archivos .md
const traverseFilesToFindLinks = (route) => {
  let arrLinks = [];
  const renderer = new marked.Renderer();
  traverseDirectoryFindFiles(route).forEach((file) => {
    const md = readFile(file);
    renderer.link = (href, title, text) => {
      const obj = {
        href: href,
        title: text,
        text: file,
        // link: false
      }
      arrLinks.push(obj);
    };
    marked(md, { renderer });
  });
  return arrLinks;
};

// funcion con fetch(antes XMLHttpRequest) (con validate true)
const validateStatus = (route) => {
  const fetchPromises = traverseFilesToFindLinks(route).map((objPropLink) => {
    // console.log(objPropLink); OBJETO CON HREF(HTTPS), TITLE(NAME), TEXT(RUTA-FILE)
    return fetch(objPropLink.href)
      .then((res) => {
        const objRes = {
          href: objPropLink.href,
          text: objPropLink.title,
          file: objPropLink.text,
          status: res.status,
          message: (res.status >= 200 && res.status < 400) ? 'ok' : 'fail',
        }
        return objRes;
      })
      .catch((err) => {
        const objErr = {
          href: objPropLink.href,
          text: objPropLink.title,
          file: objPropLink.text,
          status: err.status,
          message: 'Error request:' + err.statusText,
        }
        return objErr;
      });
  });
  return Promise.all(fetchPromises);
};

// validateStatus('/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/mdlinks.md')
//   .then(resolve => console.log(resolve))
//   .catch(reject => console.log(reject))

module.exports = {
  traverseDirectoryFindFiles,
  traverseFilesToFindLinks,
  validateStatus,
}