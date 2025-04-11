
let = todoList = [];

const taskTextBox = document.getElementById("taskTextBox");
const timeTextBox = document.getElementById("timeTextBox");
const containerDiv = document.getElementById("containerDiv");


function loadTodo() {
    loadTodoList()
    displayTodoList();
   

}
function addTodo() {
    pushTodo();
    displayTodoList();
    clearForm();
    saveTodo()
    isValidTextBox()
}


function pushTodo() {
    const task = taskTextBox.value;
    const time = timeTextBox.value;
    const todo = { task, time };

    if(isValidTextBox(todo))
        todoList.push(todo);
    
    else {alert("invalid");}
}

function displayTodoList() {
    let html = "";
    for (let i = 0; i < todoList.length; i++) {
        const card = `
        <div class="card">
            <span onclick="deleteMe(${i})" id="delete-btn">╳</span>
            <div id="task">${todoList[i].task}</div>
            <div id="time">${todoList[i].time.replace("T", "<br>")}</div>
        </div>
        `;
        html += card;
    }
    containerDiv.innerHTML = html;


}

function deleteMe(index) {
    todoList.splice(index, 1);
    displayTodoList();
    saveTodo()


}

function clearForm() {
    taskTextBox.value = "";
    timeTextBox.value = "";
    taskTextBox.focus();
}

function saveTodo() {
   const saveTodoJSON = JSON.stringify(todoList);
   localStorage.setItem("todoList", saveTodoJSON);
}

function loadTodoList() {
    const myTodoStr = localStorage.getItem("todoList");
    if(myTodoStr)
        todoList = JSON.parse(myTodoStr);
}

function isValidTextBox(todo) {
    return (todo.task !== "" && todo.time.toString().trim() !== "");
}

