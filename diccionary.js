const fs = require('fs');

function readDiccionary(){
  var readResult = fs.readFileSync('./wordlist', 'utf8');
  return readResult.split(/\n/)
}

function readCheckPoint(){
  var readChk = fs.readFileSync('./checkpoint.txt', 'utf8');
  var result = readChk.split(/\n/)
  return {
    lastIndexProcess: result[0],
    combinations: result[1].split(/,/)
  }
}
function readCombinations(){
  try {
    var combinations = fs.readFileSync('./combinations');
    console.log('Read combinations', combinations.length);
    return combinations.split(/\n/)
  } catch (e) {
    console.log(e);
    fs.writeFileSync('./combinations')
    return [];
  }
}

module.exports = {
  readDiccionary,
  readCheckPoint,
  readCombinations,
};
