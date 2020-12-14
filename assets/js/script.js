//use the DOM to find the element object representation of <button> & assign it to variable buttonEl.

var buttonEl = document.querySelector("#save-task");

// use the DOM to find the element object representation of the tasks to do <ul>
var tasksToDoEl = document.querySelector("#tasks-to-do");

//add event listener and change the text of the new task item dynamically using textContent property
var createTaskHandler = function(){
    //1. after button is clicked, create a new task item.
    var listItemEl = document.createElement("li");
    //2. style the new task item
    listItemEl.className = "task-item";
    //3. add the text dynamically using textContent property.
    listItemEl.textContent = "This is a new task.";
    //4. append the element to the task list.
    tasksToDoEl.appendChild(listItemEl);
    }

    //use callTaskHandler as callback function
    buttonEl.addEventListener("click", createTaskHandler);

