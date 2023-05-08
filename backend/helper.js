const Papa = require('papaparse')

/**
 * 
 * str
 * 
 * @return an array of objects
 */
const csvParse = (str = "") => new Promise((resolve, reject) => {
  // const file = fs.createReadStream(importFile);
  console.log('Parsing');
  Papa.parse(str, {
      header: true,
      complete: function(results) {
          resolve(results.data);
      },
      error: function(error) {
          reject(error);
      }
  });
})

const csvUnparse =  (objectsArray) => {
  return Papa.unparse(objectsArray)
}

// Convert stream to text
async function streamToText(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}

module.exports = { csvParse, streamToText, csvUnparse }