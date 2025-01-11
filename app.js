//const http = require('http')  

//  const server = http.createServer((req,res)=>{
      
    //const fs =require("fs")
      //res.writeHead(200,["content-type":'html']) 
    //res.write("hello from the server this is a node js course")
     
    //res.end("./contactus.html")
   // fs.readFileSync('contactus.html',(err,data)=>{
 //        if (err){

            //res.writeHead(500,{"content-type":'text/plain'})
           // console.log("sorry cant read from the server ")

         //}
       //  else{res.writeHead(200,{"content-type":'text/plain'})
     //   res.end(data )}
   // })

 // })




//const thePort =3000

//const HOST ="127.0.0.1";
 

 //server.listen(thePort,HOST,()=>{
  // console.log("")
//}
//)
//const http = require('http')
//const fs = require("fs")
//const server = http.createServer((req,res)=>{

    //part 1 

    // res.writeHead(200,{"content-type":'text/html'})
    // res.write("hello from the server this is a node js course ")

    // res.end("./contactUs.html")

    // part 2 

    //fs.readFile('contactUs.html',(err,data)=>{
        //if(err){

            //res.writeHead(500,{"content-type":'text/plain'})
          //  console.log("sorry can't read from the server")
        //}
        //else {
        //    res.writeHead(200,{"content-type":"text/html"})
      //      res.end(data)
    //    }
  //  })



//})

// 127.0.0.1 // localhost

//const thePort = 3000 
//const HOST = "127.0.0.1" ;

//server.listen(thePort,HOST,()=>{
  //  console.log(the server is now running on port # ${thePort} and host ${HOST})
//})
const http=require('http')
const fs=require("fs")
let data = "<h1><i>My name is atheer shtayat </i></h1>";

const server=http.createServer((req,res)=>{
    fs.writeFile("myFile.txt", data, (err)=> {
        if (err) {
            res.writeHead(500,{"content-type":'text/plain'})
            res.end("sorry can not read from the server")
        } else {
            res.writeHead(200,{"content-type":'text/html'})
            res.end(data)
        }
    })    
})

const thePort=3000
theHost="127.0.0.1"
server.listen(thePort,theHost,()=>{
    console.log(`the server is running on the port ${thePort} and host ${theHost}`)
})