# MDLINKS
## INDICE:
[1. Preambulo:](#preambulo-☀️)  
[2. Descripción del módulo:](#descripción-del-módulo-💻)  
[3. Documentación del API:](#documentación-del-API-📂)  
[3. Ejemplos:](#ejemplos-📇)  
[4. Importante:](#importante!-📍)  
[5. Autor:](#autor-🔏)
***
### Preambulo ☀️
Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional README.md).

Estos archivos Markdown normalmente contienen links (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

<code>**md-links**</code> es una herramienta que usa Node.js, para leer y analizar archivos en formato Markdown, para verificar los links que contengan y reportar algunas estadísticas.

### Descripción del módulo 💻
Esta librería puedes instalarla desde [npm](https://www.npmjs.com/package/andu15-mdlinks) o desde [github](https://github.com/Andu15/LIM015-md-links), a continuación te dejo los detalles:
#### Instrucciones de instalación/uso
##### Instalación por npm
`
$ npm install andu15-mdlinks
`
##### Instalación por github
`
$ npm install Andu15-mdlinks/LIM015-md-links
`
##### Usabilidad
`
const mdLinks = require('andu15-mdlinks');
`
### Documentación del API 📂
Para realizar este proyecto fue fundamental la organización y el primer paso fue realizar un diagrama de flujo, que te muestro a continuación:  
![Diagrama de flujo!](images/diagramaDeFlujo.jpg 'mdLinks Diagrama de flujo')

Y este proyecto consta de dos partes:  
***1. JavaScript API***  
Conjunto de módulos donde:
- **path.js**, contiene funciones síncronas utilizando métodos del core de node.js como <code>fileSystem</code> y <code>path</code>
- **mdLinksApi.js**, contiene paquetes npm como: <code>marked</code> para convertir el texto de un archivo markdown a elementos html y junto con el [custom renderer](https://marked.js.org/using_pro#renderer) se puede extraer las propiedades de un elemento ancla y <code>node-fetch</code> para realizar las peticiones y obtener el status de los links, ello en conjunto con la funcion recursiva traverseDirectoryFindFiles, se construye las bases de lo que sera nuestra funcion mdLinks.
- **index.js**, contiene la funcion mdLinks como tal y que retornará una promesa en estado pending y que consumiremos más adelante...

***2. CLI (Command Line Interface - Interfaz de Línea de Comando)***  
Aquí hemos divido el proceso en 2 modulos: 
- **options.js**, posee pequeñas funciones donde obtiene un reporte de los links totales que existen en un archivo markdown, además de un conteo de los links unicos, links rotos y links ok. Como un plus contienen constantes con template strings que albergan arte ascii para personalizar los rejects del consumo de la funcion mdLinks.
- **cli.js**, posee el metodo de process.argv de node para poder capturar el input del usuario y luego una serie de condicionales para ver por consola el consumo de la promesa.
PDTA: Para varias los colores predeterminados de la consola, estoy usando una librería llamada <code>chalk</code>
### Ejemplos 📇
El ejecutable de esta aplicación debe poder ejecutarse de la siguiente manera a través de la terminal:  
`md-links <path> [options]`

***Por ejemplo:***

1. Cuando no ingresas una ruta

| `$ md-links`      |
|-------------------|
| ![imagen1](/images/image1.png)  |

2. Cuando ingresas una ruta incorrecta

|`$ md-links asdfg` |
|-------------------|
| ![imagen2](/images/image2.png)   |

3. Cuando ingresas una ruta de un archivo que no sea .md o carpeta que no tenga archivos.md

|`$ md-links lib/prueba.txt` |
|----------------------------|
| ![imagen3](/images/image3.png)   |

4. Cuando ingresas una ruta de un archivo markdown que no posee links

|`$ md-links lib/prueba/prueba2/prueba2.md` |
|----------------------------|
| ![imagen4](/images/image4.png)   |

5. Cuando ingresas el comando --help visualizaras una sección de ayuda:

|`$ md-links --help` |
|----------------------------|
| ![imagen5](/images/image5.png)   |

6. Cuando ingreses una ruta y luego el comando --validate

|`$ md-links lib/mdlinks.md --validate` |
|----------------------------|
| ![imagen6](/images/image6.png)   |

7. Cuando ingreses una ruta y luego el comando --stats

|`$ md-links lib/mdlinks.md --stats` |
|----------------------------|
| ![imagen7](/images/image7.png)   |

8. Cuando ingreses una ruta y luego los comandos --validate --stats

|`$ md-links lib/mdlinks.md --validate --stats` |
|----------------------------|
| ![imagen8](/images/image8.png)   |

9. En caso de que ingreses mas de 3 argumentos:

|`$ md-links lib/mdlinks.md --validate --stats --loqsea` |
|----------------------------|
|![imagen9](/images/image9.png) |

### Importante! 📍
Esta librería esta hecha en node.js en conjunto con CommonJS Modules, es decir, se implemento <code>require/module.exports</code>  

[Licencia MIT](https://github.com/Andu15/LIM015-md-links/blob/main/LICENSE.md)

* ___Inicio del proyecto:___ 08/09/2021  
* ___Fin del proyecto:___ 30/09/2021
### Autor 🔏
███▓▒░░ [Andu15](https://github.com/Andu15) ░░▒▓███  


