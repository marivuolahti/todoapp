// selectors
const inputForTask = document.querySelector(".input-for-task");
const AddTodoButton = document.querySelector(".add-todo");
const ToDoo = document.querySelector(".to_doo");
const Selectingfilter = document.querySelector(".tehtavien-erottelu");

// Adding event listeners
document.addEventListener('DOMContentLoaded', GetLife);
AddTodoButton.addEventListener('click', AddTodo);
ToDoo.addEventListener('click', Deleting);
Selectingfilter.addEventListener('change', Selectingitem);



//Functions
function AddTodo(event) {
    event.preventDefault();

    // if statement to check the values
const taskvalue = inputForTask.value;

if ((taskvalue==null || taskvalue=="") ||(taskvalue.length<4)) {
    inputForTask.style.border = "2px solid #DC143C";
    alert("Incorrect type of text");
    return false;
} else {
    inputForTask.style.border = "none";
}

    //Adding the to-do div
     

    const ToDodiv = document.createElement('div');
    ToDodiv.classList.add("to_do");

    //Creating the Li where the tasks will be listed
    const TodoLi = document.createElement('li');
    TodoLi.innerText = inputForTask.value;
    TodoLi.classList.add('todo-item');
    ToDodiv.appendChild(TodoLi);

//Local storage
     SavingtoLocal(inputForTask.value);

    // Doing the check button 
    const Checkbutton = document.createElement('button');
    Checkbutton.innerHTML = "Done";
    Checkbutton.classList.add("done-btn");
    ToDodiv.appendChild(Checkbutton);

    //Doing the delete button
    const Deletebutton = document.createElement('button');
    Deletebutton.innerHTML = "Delete";
    Deletebutton.classList.add('delete-btn');
    ToDodiv.appendChild(Deletebutton);

    // Appending the todos
    ToDoo.appendChild(ToDodiv);

    // clearing the input value

    inputForTask.value = "";
}
// Deleting the task items
function Deleting(e) {

    const item = e.target;
    if (item.classList[0] === "delete-btn") {
        const hmm = item.parentElement;

        // Drop animation when deleting the task
        hmm.classList.add("fall");
        DeleteLocal(hmm);
        hmm.addEventListener("transitionend", function () {
            hmm.remove();
        }
        );

    }

    //Marking the done button
    if (item.classList[0] === "done-btn") {
        const hmm = item.parentElement;
        hmm.classList.toggle("donee");
    }

}
//Making the selecting list
function Selectingitem(e) {
    console.log(e.target.value);
    const anything = ToDoo.childNodes;
    anything.forEach(function (to_do) {
        switch (e.target.value) {
            case "all":
                to_do.style.display = "flex";
                break;
            case "completed":
                if (to_do.classList.contains("donee")) {
                    to_do.style.display = "flex";
                } else {
                    to_do.style.display = "none";
                }
                break;
            case "unfinished":
                if (!to_do.classList.contains("donee")) {
                    to_do.style.display = "flex";
                } else {
                    to_do.style.display = "none";
                }
                break;
        }
    })
}

function SavingtoLocal(to_do) {
let anything;
if(localStorage.getItem('anything') === null) { //Checking if I have something in local storage already
    anything = [];
} else {
    anything = JSON.parse(localStorage.getItem("anything"));
}
anything.push(to_do);
localStorage.setItem("anything", JSON.stringify(anything));
}
//Data (tasks) in the page will be saved to the local storage.
function GetLife() {
let anything;
if(localStorage.getItem("anything") === null) {
    anything = [];
} else {
    anything = JSON.parse(localStorage.getItem("anything"));
}
anything.forEach(function(to_do) {

    const ToDodiv = document.createElement('div');
    ToDodiv.classList.add("to_do");

    
    const TodoLi = document.createElement('li');
    TodoLi.innerText = to_do;
    TodoLi.classList.add('todo-item');
    ToDodiv.appendChild(TodoLi);

    const Checkbutton = document.createElement('button');
    Checkbutton.innerHTML = "Done";
    Checkbutton.classList.add("done-btn");
    ToDodiv.appendChild(Checkbutton);

    
    const Deletebutton = document.createElement('button');
    Deletebutton.innerHTML = "Delete";
    Deletebutton.classList.add('delete-btn');
    ToDodiv.appendChild(Deletebutton);

    ToDoo.appendChild(ToDodiv);
});
}
//When deleting task, it will be deleted also from the local storage
function DeleteLocal(to_do) {
    let anything;
    if(localStorage.getItem("anything") === null) {
        anything = [];
    } else {
        anything = JSON.parse(localStorage.getItem("anything"));
    }
    const to_doIndex = to_do.children[0].innerText;
    anything.splice(anything.indexOf(to_doIndex),1);
    localStorage.setItem("anything", JSON.stringify(anything));
    
}
