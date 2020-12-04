const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let studentArr = require("./InitialData");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

app.get("/api/student", (req, res) => {
  res.send(studentArr);
});

app.get("/api/student/:id", (req, res) => {
  const student = studentArr.filter((s) => s.id == req.params.id);
  if (student.length === 1) {
    res.send(student[0]);
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/student", (req, res) => {
  const { name, currentClass, division } = req.body;
  console.log(req.body);
  if (req.body != {}) {
    if (name !== "" && currentClass !== "" && division !== "") {
      const id = studentArr.length + 1;
      const student = {
        id,
        name,
        currentClass,
        division,
      };
      studentArr.push(student);
      res.send({ id });
    }
    res.sendStatus(400);
  } else {
    res.sendStatus(400);
  }
});

app.put("/api/student/:id", (req, res) => {
  const student = studentArr.filter((s) => s.id == req.params.id);
  //   console.log(req.body);
  if (req.body !== {} && student.length == 1) {
    const { name, currentClass, division } = req.body;

    if (name != undefined && name != "") {
      student[0].name = name;
    }
    if (currentClass != undefined && currentClass != "") {
      student[0].currentClass = currentClass;
    }
    if (division != undefined && division != "") {
      student[0].division = division;
    }
    let newStudentArr = studentArr.filter((s) => s.id != req.params.id);
    newStudentArr.push(student[0]);
    studentArr = [...newStudentArr];
    res.send({ name: student.name });
  } else {
    // console.log("in");
    //   res.status(400);
    res.sendStatus(400);
  }
});

app.delete("/api/student/:id", (req, res) => {
  const student = studentArr.filter((s) => s.id == req.params.id);
  console.log(student);
  if (student.length === 1) {
    const newStudentArr = studentArr.filter((s) => s.id != req.params.id);
    studentArr = newStudentArr;
    res.send("ok");
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
