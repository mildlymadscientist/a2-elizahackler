// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  // get the value of the input fields for Task and Date
  const input = document.querySelector("#Task"),
    json = { Task: input.value },
    TBody = JSON.stringify(json)

  const dateInput = document.querySelector("#Date"),
    json2 = { Date: dateInput.value },
    DBody = JSON.stringify(json2)

  //comebine into one object


  console.log("Task Body:", TBody)
  console.log("Date Body:", DBody)

  body = "{" + TBody.slice(1, -1) + "," + DBody.slice(1)

  console.log("Combined body:", body)


  // send the data to the server using fetch()
  const response = await fetch("/submit", {
    method: "POST",
    body
  })

  // read the text in the response
  const text = await response.text()

  console.log("text:", text)
}

// when the page loads set up the button
window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
}

//turn all objects from appdata into list items
const listItems = function () {
  const list = document.getElementById("todolist")
  appdata.forEach(item => {
    let li = document.createElement("li")
    li.innerText = item["Task"] + " " + item["Date"]
    if (item["Overdue"]) {
      li.style.color = "red"
    }
    list.appendChild(li)
  })
}