const { Transform } = require('stream');

class ToLowerCasePipe extends Transform {
   constructor() {
      super()
      this._transform = (chunk, encoding, cb) => {
         cb(null, chunk.toString().toLowerCase())
      }
   }
}

module.exports = {ToLowerCasePipe}