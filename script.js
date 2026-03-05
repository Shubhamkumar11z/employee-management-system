let output = document.getElementById("output");
let input = document.getElementById("input");

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let step = "menu";
let temp = {};

function saveData(){
localStorage.setItem("employees", JSON.stringify(employees));
}

function showMenu(){
print(`
Employee Management System
1. Add Employee
2. List Employees
3. Update Employee
4. Delete Employee
5. Exit

Select an option:`);

step="menu";
}

function print(text){
output.textContent += text + "\n";
}

showMenu();

input.addEventListener("keydown",function(e){

if(e.key==="Enter"){

let value=input.value;
print(value);
input.value="";

switch(step){

case "menu":

if(value=="1"){
print("Employee Name:");
step="name";
}

else if(value=="2"){
listEmployees();
showMenu();
}

else if(value=="3"){
print("Enter Employee ID to update:");
step="updateID";
}

else if(value=="4"){
print("Enter Employee ID to delete:");
step="deleteID";
}

else if(value=="5"){
print("Exiting...");
}

else{
print("Invalid option");
showMenu();
}

break;


case "name":
temp.name=value;
print("Position:");
step="position";
break;

case "position":
temp.position=value;
print("Salary:");
step="salary";
break;

case "salary":

temp.salary=value;
temp.id=Date.now();

employees.push(temp);
saveData();

print("Employee added successfully!");
temp={};

showMenu();
break;


case "updateID":

let emp=employees.find(e=>e.id==value);

if(emp){
temp=emp;
print("New Name:");
step="updateName";
}else{
print("Employee not found");
showMenu();
}

break;

case "updateName":
temp.name=value;
print("New Position:");
step="updatePosition";
break;

case "updatePosition":
temp.position=value;
print("New Salary:");
step="updateSalary";
break;

case "updateSalary":
temp.salary=value;
saveData();
print("Employee updated successfully!");
showMenu();
break;


case "deleteID":

employees=employees.filter(e=>e.id!=value);
saveData();

print("Employee deleted successfully!");
showMenu();

break;

}

}

});

function listEmployees(){

print("\nEmployee List:");

employees.forEach(emp=>{
print(`ID: ${emp.id}, Name: ${emp.name}, Position: ${emp.position}, Salary: $${emp.salary}`);
});

print(`Total employees: ${employees.length}\n`);

}
