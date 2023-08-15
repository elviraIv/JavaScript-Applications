import { html, render } from "./node_modules/lit-html/lit-html.js";
// template:
// display item students
// highlight item based on match
const studentRow = (student) => html` 
<tr class=${student.match ? 'select': ''}>
  <td>${student.item.firstName} ${student.item.lastName}</td>
  <td>${student.item.email}</td>
  <td>${student.item.course}</td>
</tr>`;

const mock = {
  firstName: "John",
  lastName: "Dan",
  email: "john@john-dam.com",
  course: "JS-CORE",
  _id: "50537fbe-5d7e-44bf-a90f-69383c3b5bf4",
};
const input = document.getElementById('searchField');
document.getElementById('searchBtn').addEventListener('click', onSearch);
let students;

// start:
// fetch and parse students
// add event listeners
// call update
start();

async function start() {
  const res = await fetch("http://localhost:3030/jsonstore/advanced/table");
  const data = await res.json();
  students = Object.values(data).map(s => ({item: s, match: false}));
 

  update();
}

//update:
//render template
function update() {
  render(students.map(studentRow), document.querySelector("tbody"));
}

// on search:
// read input value
// comapre input with all students fields
// mark matching items
// call update

function onSearch(){
   const value = input.value.trim().toLocaleLowerCase();

   for (const student of students) {
      student.match = Object.values(student.item).some(v => value && v.toLocaleLowerCase().includes(value));
   }

   update();
}
