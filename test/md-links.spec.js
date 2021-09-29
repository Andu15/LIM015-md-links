const { pathExist, pathAbsolute, pathIsDirectory,
  readDirectory, extIsMd, readFile, concatRoute } = require('../src/api/path');
const { traverseDirectoryFindFiles, traverseFilesToFindLinks, validateStatus } = require('../src/api/mdLinksApi');
const { mdLinks } = require('../src/api/index');

describe('pathExist', () => {
  it('Debería ser una función', () => {
    expect(typeof pathExist).toBe('function');
  });
  it('Debería retornar true', () => {
    expect(pathExist('/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/prueba.txt')).toBeTruthy();
  });
  it('Debería retornar false', () => {
  expect(pathExist('/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/prueba2.txt')).toBeFalsy();
});
});

describe('pathAbsolute', () => {
  it('Debería ser una función', () => {
    expect(typeof pathAbsolute).toBe('function');
  });
  it('Debería retornar una ruta absoluta', () => {
    expect(pathAbsolute('lib/READMELAB.md')).toBe('/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/READMELAB.md');
  });
  it('Debería ser true para ruta absoluta', () => {
    expect(pathAbsolute('/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/READMELAB.md')).toBeTruthy();
  });
});

describe('pathIsDirectory', () => {
  it('Debería ser una funcion', () => {
    expect(typeof pathIsDirectory).toBe('function');
  });
  it('Debería ser true para un directorio', () => {
    expect(pathIsDirectory('lib')).toBeTruthy();
  });
  it('Debería ser false para un archivo', () => {
    expect(pathIsDirectory('lib/prueba.txt')).toBeFalsy();
  });
});

describe('readDirectory', () => {
  it('Debería ser una función', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('Debería mostrar todos los archivos', () => {
    expect(readDirectory('lib')).toEqual([ 'READMELAB.md', 'archivoDePrueba.md','mdlinks.md', 'prueba', 'prueba.txt' ]);
  });
});

describe('extIsMd', () => {
  it('Debería ser una función', () => {
    expect(typeof extIsMd).toBe('function');
  });
  it('Debería ser true para .md', () => {
    expect(extIsMd('lib/prueba.txt')).toBeFalsy();
  });
  it('Debería ser true para .md', () => {
    expect(extIsMd('lib/READMELAB.md')).toBeTruthy();
  });
});

describe('readFile', () => {
  it('Debería ser una función', () => {
    expect(typeof readFile).toBe('function');
  });
  it('Debería leer el contenido de un archivo', () => {
    expect(readFile('lib/prueba.txt')).toBe('Este es un archivo de prueba');
  });
});

describe('concatRoute', () => {
  it('Debería ser una función', () => {
    expect(typeof concatRoute).toBe('function');
  });
  it('Debería unir las rutas', () => {
    expect(concatRoute('lib/prueba', 'prueba2')).toBe('lib/prueba/prueba2');
  });
});

describe('traverseDirectoryFindFiles', () => {
  it('Debería ser una función', () => {
    expect(typeof traverseDirectoryFindFiles).toBe('function');
  });
  it('Debería mostrarme todos los archivos .md', () => {
    const result = [
      '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/READMELAB.md',
      '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/archivoDePrueba.md',
      '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/mdlinks.md',
      '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/prueba/prueba.md',
      '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/prueba/prueba2/prueba2.md',
      '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/prueba/prueba2/prueba3.md'
    ]
    expect(traverseDirectoryFindFiles('lib')).toEqual(result);
  });
  it('Debería ser null para archivos diferentes a .md', () => {
    expect(traverseDirectoryFindFiles('lib/prueba.txt')).toEqual([]);
  });
});

describe('traverseFilesToFindLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof traverseFilesToFindLinks).toBe('function');
  });
  it('Debería retornar info de los links de archivos .md', () => {
    const result = [
      {
        href: 'https://nodejs.org/es/',
        title: 'Node.js',
        text: '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/prueba/prueba.md'
      }
    ];
    expect(traverseFilesToFindLinks('lib/prueba/prueba.md')).toEqual(result);
  });
  it('Debería retornar vacio si no hay links', () => {
    expect(traverseFilesToFindLinks('lib/prueba/prueba2/prueba2.md')).toEqual([]);
  });
});

describe('validateStatus', () => {
  it('Debería ser una promesa', () => {
    expect(typeof validateStatus).toBe('function');
  });
  it('Deberia retornar Ok', () => {
    const result = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/prueba/prueba.md',
        status: 200,
        message: 'ok'
      }
    ];
    return validateStatus('/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/prueba/prueba.md')
      .then(data => {
        expect(data).toEqual(result);
      })
  });
  it('Deberia retornar el fail', () => {
    const result = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/mdlinks.md',
        status: 200,
        message: 'ok'
      },
      {
        href: 'https://nodejs.org/es/400',
        text: 'Node.js',
        file: '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/mdlinks.md',
        status: 404,
        message: 'fail'
      }
    ];
    return validateStatus('/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/mdlinks.md')
      .then(data => {
        expect(data).toEqual(result);
      })
  });
  it('Deberia retornar el error', () => {
    const result = [
      {
        href: '#2-resumen-del-proyecto',
        text: '2. Resumen del proyecto',
        file: '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/archivoDePrueba.md',
        status: undefined,
        message: 'fail'
      }
    ];
    return validateStatus('/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/archivoDePrueba.md')
      .catch(err => {
        expect(err).toEqual(result);
    })
  });
});

describe('mdLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Debería mostrar ruta no existe', () => {
    return mdLinks('lib/prueba/prueba1000.md', { validate: false })
      .catch(reject => {
        expect(reject).toBe('La ruta no existe');
    })
  });
  it('Debería mostrar sin archivos .md', () => {
    return mdLinks('lib/prueba.txt', { validate: false })
      .catch(reject => {
        expect(reject).toBe('No existen archivos markdown');
    })
  });
  it('Debería mostrar sin links', () => {
    return mdLinks('lib/prueba/prueba2/prueba2.md', { validate: false })
      .catch(reject => {
        expect(reject).toBe('No existen links');
    })
  });
  it('Debería mostrar el status de links', () => {
    const result = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/prueba/prueba.md',
        status: 200,
        message: 'ok'
      }
    ];
    return mdLinks('lib/prueba/prueba.md', { validate: true })
      .then(resolve => {
        expect(resolve).toEqual(result);
    })
  });
  it('Debería mostrar prop para validate false', () => {
    const result = [
      {
        href: 'https://nodejs.org/es/',
        title: 'Node.js',
        text: '/Users/katy/Desktop/LABORATORIA-ANDREA/LIM015-md-links/lib/prueba/prueba.md',
      }
    ];
    return mdLinks('lib/prueba/prueba.md', { validate: false })
      .then(resolve => {
        expect(resolve).toEqual(result);
    })
  });
});
