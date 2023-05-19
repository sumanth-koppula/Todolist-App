var taskList = []
var completedList = [];
var remList = [];
var addButton = document.getElementById("add-button")
var todoInput = document.getElementById("todo-input")

var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected")


//event listners for add and delete
addButton.addEventListener("click", add)

deleteSButton.addEventListener("click", deleteS)


//event listeners for filtersk
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e)
    }

    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }

})
//event listner for enter key
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});


//updates the all the remaining, completed and main list
function update() {
    completedList = taskList.filter((ele) => {
        return ele.complete

    })
    remList = taskList.filter((ele) => {
        return !ele.complete
    })
    document.getElementById("t-count").innerText = taskList.length.toString();
    document.getElementById("c-count").innerText = completedList.length.toString();

}

//adds the task in main list

function add() {
    var value = todoInput.value;
    if (value === '') {
        alert("Task cannot be empty")
        return;
    }
    taskList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });

    todoInput.value = ""


    update();
    addinmain(taskList);
}


//renders the main list and views on the main content

function addinmain(taskList) {
    allTodos.innerHTML = ""
    taskList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`
        allTodos.innerHTML += x
    });
}


//deletes and indiviual task and update all the list
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    taskList = taskList.filter((ele) => {
        return ele.id != deleted
    })

    update();
    addinmain(taskList);

}

//completes indiviaula task and updates all the list
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    taskList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true
                console.log(e.target.parentElement.parentElement)

                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false

                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }

        }
    })

    update();
    addinmain(taskList);
}



//deletes only completed task
function deleteS(todo) {

    taskList = taskList.filter((ele) => {
        return !ele.complete;
    })


    update();
    addinmain(taskList);

}


// functions for filters
function viewCompleted() {
    addinmain(completedList);
}

function viewRemaining() {

    addinmain(remList);
}
function viewAll() {
    addinmain(taskList);
}
