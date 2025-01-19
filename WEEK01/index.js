console.log("Week01 - Buffer Examples")

// let b1 = new Buffer('A Hello')

let b1 = Buffer.from('A Hello')
console.log(b1)

console.log(b1.toString())
console.log(b1[0])

console.log(b1.toString('ascii'))
console.log(b1.toString('utf8'))
console.log(b1.toString('hex'))
console.log(b1.toString('base64'))
console.log(b1.toString('ucs-2'))

console.log(b1.includes("He"))//true

console.log(b1.length)

//Alloc
let b2 = Buffer.alloc(10)
// let b2 = Buffer.alloc(10, 'A') 
console.log(b2)
b2[10] = 66
console.log(b2[10]) //undefined
console.log(b2.length)

b2[0] = 65//'🎁'
// b2[0] = 'A'
console.log(b2[0]) 
console.log(b2.toString())
console.log(b2)

let b3 = Buffer.allocUnsafe(20)
console.log(b3)
b3.fill('B')
// b3.fill('BYE')
console.log(b3)
console.log(b3.toString())

let b4 = Buffer.from('Hello🎁world')
console.log(b4)
console.log(b4.toString())
console.log(b4[0])

console.log(b4.toString('utf8', 5, 9))//🎁

//concat
let b6 = Buffer.concat([b3, b4])
console.log(b6.toString())

//slice
let b7 = b6.slice(20, 34) //Hello🎁world
console.log(b7.toString())

let b8 = Buffer.alloc(10)
b8.write('Buffer', 2)
console.log(b8)
console.log(b8.toString())

// console.log(b8.read())

// for(let c of b8){
//     console.log(c)
// }

console.log(Buffer.isBuffer(b8)) //true
console.log(Buffer.isBuffer(100)) //false

for(c of b8.entries()){
    console.log(c)
}

let b9 = Buffer.alloc(10)
b8.copy(b9, 0, 2, 8)//Buffer
console.log(b9.toString())

let bufferJson = b9.toJSON()
console.log(bufferJson.data)
let b10 = Buffer.from(bufferJson.data)
console.log(b10.toString())

const arrayBytes = [0x41, 0x20, 0x48, 0x65, 0x6c, 0x6c, 0x6f]
let b11 = Buffer.from(arrayBytes)
console.log(b11.toString())

let arrayBuffer = new ArrayBuffer(10)
arrayBuffer[0] = 65
let b12 = Buffer.from(arrayBuffer, 0, 2)
console.log(b12)