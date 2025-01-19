const fs = require('fs')
console.log("--- START ---")
//Read File Async
// fs.readFile("input.txt", "utf-8", (err, data) => {
fs.readFile("input.txt", (err, data) => {
    if(err){
        console.log(err)
        return
    }

   console.log(`Async : ${data.toString()}`)
})

const dataSync = fs.readFileSync("input.txt")
console.log(`Sync : ${dataSync.toString()}`)

fs.promises.readFile("input.txt")
    .then((data => {
        console.log(`Sync : ${data.toString()}`)
    }))
    .catch((err) => {
        console.log(err)
    })
