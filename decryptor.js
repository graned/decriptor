var crypto = require('crypto');
const diccionary = require('./diccionary');
const getCombinations = require('./combination');
const fs = require('fs');

var hashes = [
  "e4820b45d2277f3844eac66c903e84be",
  "23170acc097c24edb98fc5488ab033fe",
  "665e5bcb0c20062fe8abaaf4628bb154"
]

var dicc = diccionary.readDiccionary();
var word1 = dicc
var word2 = dicc
var word3 = dicc

console.log('>>>>>>>>>>> diccionary search started');
for (var i1 = 0; i1 < word1.length; i1++) {
  for (var i2 = 0; i2 < word2.length; i2++) {
    for (var i3 = 0; i3 < word3.length; i3++) {
      phraseDecoded = [word1[i1], word2[i2], word3[i3]].join(' ')
      var hash = crypto.createHash('md5').update(phraseDecoded).digest("hex");
      // console.log('>>>>> phraseDecoded', phraseDecoded);
      if (hashes.includes(hash)) {
        console.log('FOUND PHRASE', hash, phrase);
        fs.writeFileSync('phrasesFound.txt', `hash: ${hash} = ${phrase}`)
      }
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////


// BRUTE FORCE ATTEMPT WITH CHECKPOINTS, SAVING FAILS DO TO STRING SIZE EXCEEDED, SAVE IN BITS?
// load checkpoint
// var chkPoint = {};
// try {
//   chkPoint = diccionary.readCheckPoint();
// } catch (e) {
//   fs.writeFileSync('checkpoint', chkPoint)
// }
// console.log('>>>>>>>> chkPoint', chkPoint);
//////////////////////////////////////////////////

///// process
// console.log('>>>>>>>>>>> starting');
// try {
//   var queue = phrase.split('')
//   // if (chkPoint.lastIndexProcess && chkPoint.lastIndexProcess !== queue.length) {
//   //   queue = queue.slice(chkPoint.lastIndexProcess)
//   //   combinations = chkPoint.combinations || []
//   // }
//   getCombinations(queue)
// } catch (e) {
//   console.log('>>> flush das memory');
//   console.log('>>>>>>> some error', e)
// }
// //////////////////////////////////////////////////////
