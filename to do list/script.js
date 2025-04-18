let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")){
//check of any tasks in local storage
arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

submit.onclick=function(){
    if(input!==""){
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
 }
};

tasksDiv.addEventListener("click",(e) => {

    if(e.target.classList.contains("del")){

        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
     e.target.classList.toggle("done");
}
});

function addTaskToArray(taskText){
    //task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
      };
   arrayOfTasks.push(task);
    // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {

    tasksDiv.innerHTML = "";
 
    arrayOfTasks.forEach((task) => {
        
        let div = document.createElement("div");
    
        div.className = "task";

      // Check If Task is Done
    if (task.completed) {
        div.className = "task done";
      }

        div.setAttribute("data-id",task.id)
        div.appendChild(document.createTextNode(task.title));

        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks){

    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){

    let data=window.localStorage.getItem("tasks");

    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
      }
};

function deleteTaskWith(taskId) {

    arrayOfTasks=arrayOfTasks.filter((task)=>task.Id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}


function toggleStatusTaskWith(taskId) {

    for (let i=0 ;i<arrayOfTasks.length;i++){

        if (arrayOfTasks[i].id == taskId) {

            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}
