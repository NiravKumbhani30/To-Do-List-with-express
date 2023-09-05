const express = require('express');
const fs = require("fs");
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));


var task = [];
var complete = [];


app.post("/addtask", function (req, res) {
  var newTask = req.body.newtask;
  var tagValue = {};
  tagValue
  task.push(newTask);
  res.redirect("/");
});


app.post("/removetask", function (req, res) {
  var completeTask = req.body.check;

  if (typeof completeTask === "string") {
    complete.push(completeTask);
    task.splice(task.indexOf(completeTask), 1);
  }
  else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

app.post("/edittask", function (req, res) {
  
  res.redirect('/');
});

app.get("/", function (req, res) {
  res.render("todo", { task: task, complete: complete });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});