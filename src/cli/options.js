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
  return `Broken: ${result}`;
}