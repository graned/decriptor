var crypto = require('crypto');
var LineByLineReader = require('line-by-line')
const diccionary = require('./diccionary');
const fs = require('fs');

var hashes = [
  "e4820b45d2277f3844eac66c903e84be",
  "23170acc097c24edb98fc5488ab033fe",
  "665e5bcb0c20062fe8abaaf4628bb154"
]


function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

function mergeP(element, queue) {
  return new Promise((resolve, reject) => {
    var phrase
    var hash
    fs.renameSync('out', 'in')
    fs.writeFileSync('out','')

    var lineReader = require('readline').createInterface({
      input: fs.createReadStream('in')
    });

    lineReader.on('line', function (line) {
      for (var j = 0; j <= line.length; j++) {
        phrase = insert(line, j, element)
        if (!queue.length) {
          hash = crypto.createHash('md5').update(phrase).digest("hex");
          if (hashes.includes(hash)) {
            console.log('FOUND PHRASE', hash, phrase);
            fs.writeFileSync('phrasesFound.txt', `hash: ${hash} = ${phrase}`)
          }
        }
        fs.appendFileSync('out', `${phrase}\n`)
      }
    });
    lineReader.on('finish', () => resolve());
    lineReader.on('error', (err) => reject(err));
  });
}

module.exports = (queue) => {
  var originalLength = queue.length
  var lastIndexProcess;
  var element
  var combinations
  while(queue.length) {
    element = queue.shift();
    mergeP(element, queue).then(() => console.log('>>> finished combinations with element', element));
  }
}
