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
  console.log("Request incoming.")
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

    //find if tasks has already been entered
    for (let i = 0; i < appdata.length; i++) {
      if (appdata[i]["Task"] === JSON.parse(dataString)["Task"]) {
        appdata.splice(i, 1)
        console.log("Removed old task.")

        //done
        break
      }
    }

    //add new task and check if overdue

    // get due date from newdata
    const newdata = JSON.parse(dataString)

    //add newdata to appdata and update overdue
    appdata.push(newdata)
    checkOverdue()
    console.log(appdata)

    // send a response
    response.writeHead(200, "OK", { "Content-Type": "text/plain" })
    response.end("test")
  })
}

//check for overdues
const checkOverdue = function () {
  // get current day
  const currentdate = new Date()
  const month = currentdate.getMonth() + 1 //months from 1-12
  const day = currentdate.getDate()
  const year = currentdate.getFullYear()

  //check all tasks for overdue
  for (let i = 0; i < appdata.length; i++) {
    //get date of task

    const duedate = appdata[i]["Duedate"]
    const duedatestring = duedate.toString()
    const duedateyear = duedatestring.slice(0, 4)
    const duedatemonth = duedatestring.slice(4, 6)
    const duedateday = duedatestring.slice(6, 8)

    //compare to current date
    if (duedateyear < year) {
      appdata[i]["Overdue"] = true
    } else if (duedateyear == year && duedatemonth < month) {
      appdata[i]["Overdue"] = true
    } else if (duedateyear == year && duedatemonth == month && duedateday < day) {
      appdata[i]["Overdue"] = true
    } else {
      appdata[i]["Overdue"] = false
    }
  }
}

// function for sending a file
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

// tell server which port to run on
server.listen(process.env.PORT || port)
