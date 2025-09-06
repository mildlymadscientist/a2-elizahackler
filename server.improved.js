const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you"re testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000

//make new array to hold data
const appdata = [
  { "Task": "Dishes", "Duedate": 19991212, "Overdue": false },
  { "Task": "Homework", "Duedate": 20261210, "Overdue": true },
  { "Task": "Fix car", "Duedate": 20250916, "Overdue": false }
]

//makes server
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response)
  } else if (request.method === "POST") {
    handlePost(request, response)
  }
})

//handles get requests to get data
const handleGet = function (request, response) {
  //if requesting data, send it
  const filename = dir + request.url.slice(1)

  //if no file is specified, send index.html
  if (request.url === "/") {
    sendFile(response, "public/index.html")
  } else {
    sendFile(response, filename)
  }
}

//handles post requests to add/edit data
const handlePost = function (request, response) {
  let dataString = ""

  // listen for data to come in
  request.on("data", function (data) {
    dataString += data
  })

  // listen for the end of the data
  request.on("end", function () {
    console.log(JSON.parse(dataString))

    // ... do something with the data here!!!
    // get current day
    // get due date from newdata
    const newdata = JSON.parse(dataString)
    const currentdate = new Date()
    const month = currentdate.getMonth() + 1 //months from 1-12
    const day = currentdate.getDate()
    const year = currentdate.getFullYear()

    let dueon = newdata["Duedate"]
    let duedatestring = dueon.toString()
    let dueyear = parseInt(duedatestring.substring(0, 4))
    let duemonth = parseInt(duedatestring.substring(4, 6))
    let duedate = parseInt(duedatestring.substring(6, 8))

    const monthdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (duedate > monthdays[month - 1]) {
      duedate = duedate - monthdays[month - 1]
      duemonth = month + 1
      if (duemonth > 12) {
        duemonth = 1
        dueyear = year + 1
      }
    }

    //if task is overdue
    if (dueyear < year || (dueyear === year && duemonth < month) || (dueyear === year && duemonth === month && duedate < day)) {
      newdata["Overdue"] = true
    } else {
      newdata["Overdue"] = false
    }

    //add newdata to appdata
    appdata.push(newdata)
    console.log(appdata)

    // send a response
    response.writeHead(200, "OK", { "Content-Type": "text/plain" })
    response.end("test")
  })
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we"ve loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type })
      response.end(content)

    } else {

      // file not found, error code 404
      response.writeHeader(404)
      response.end("404 Error: File Not Found")

    }
  })
}

server.listen(process.env.PORT || port)
