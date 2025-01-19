//Write Async callback
// let dataToWrite = "Welcome to George Brown College"
let dataToWrite = Buffer.from("Welcome to George Brown College, Toronto")
fs.writeFile("output.txt", dataToWrite, (err) => {
    if(err){
        console.log(err)
        return
    }

    console.log('Asyn callback write success')
    
})

//Sync
fs.writeFileSync("output.txt", dataToWrite)


fs.promises.writeFile("output.txt", dataToWrite)
    .then(() => {
        console.log('Asyn promise write success')
    })
    .catch((err) => {
         console.log(err)
    })