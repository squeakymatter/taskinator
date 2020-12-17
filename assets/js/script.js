var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function (event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name'").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    var isEdit = formEl.hasAttribute("data-task-id");
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
// no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObj);
    }
    // check if inputs are empty (validate)
    if (taskNameInput === "" || taskTypeInput === "") {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    // reset form fields for next task to be entered
    document.querySelector( "input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
        // find the matching task list item
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// set new values
        taskSelected.querySelector("h3.task-name").textContent = taskType;
        taskSelected.querySelector("span.task-type").textContent = taskType;

        alert("Task Updated!");
        //reset form by removing task id and changing button text back to normal:
        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";

    }
// no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObj);
    }
};

var completeEditTask = function(taskName, taskType, taskId) {
    console.log(taskName, taskType, taskId);
}

var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    //increase task counter for next unique id
    taskIdCounter++;
};

//parameter taskID is how we pass a different ID into the function each time to keep track of which elements we're creating for which task.
var createTaskActions = function (taskId) {
//create new <div> element with the cass name "task-actions"

    var actionContainerEl = document.createElement("div"); //div will act as container for the other elements
    actionContainerEl.className = "task-actions";

//create edit button

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId); //taskID = parameter to pass a different id into the function each time to keep track of which elements we're creating for which task.

    actionContainerEl.appendChild(editButtonEl);

    //create delete button

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId)
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    ;

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

};




//this function is called from taskButtonHandler
var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); //notice no space between .task-item and data-task-id. This means both properties must be on the same element. a space means look for the element with the [data-task-id] element somewhere inside a .task-item element
    //code to actually delete the task
    taskSelected.remove();
};

//this function creates editTask function that creates its own taskSelected variables based on provided taskId;
var editTask = function (taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);

};



// editing a task involves 2 actions:
// 1) Load the task's current information into the form.
// 2) On form submit, update the task element's content


var taskButtonHandler = function (event) {
    //event target reports the element on which the event occurs, in this case, the click event
    //get target element from event (click)
    var targetEl = event.target;

    //edit button was clicked.
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //matches() method created specifically for checking iff element matches criteria. returns true or false
    //this is  different from querySelector() method, which finds/returns an element
    if (event.target.matches(".delete-btn")) {
        console.log("you clicked a delete button!")
        //get the element's task id to figure out which task Delete button belongs to
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);