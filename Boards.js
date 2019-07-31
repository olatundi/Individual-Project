const req = new XMLHttpRequest();
req.onload = function () {
    let data = JSON.parse(req.responseText);
    createPage(data);
}
var host = "http://35.246.117.146:8081/";
req.open('GET', host + "ToDo/api/account/getAll");
req.send();
const userID = sessionStorage.getItem("userId");
let boardID = 0;

const taskBody = document.getElementById("taskBody");
const taskCard = document.getElementById("taskCard");
const newTaskButton = document.getElementById("newTask");

function createPage(da) {
    //Display Account details
    for (d of da) {
        if (d.id == userID) {
            const wrapperEl = document.getElementById("accDetails")
            wrapperEl.innerText = "Hello " + d.firstName + " " + d.lastName + " (@" + d.username + ")";
        }
    }
}

function handleBoard() {
    const boardName = document.getElementById("formBoard").value;
    if (boardName != "") {
        createBoard(boardName)
    }
    else {
        window.alert("Please enter a valid board name");
        return false;
    }
}

function handleRename() {
    const rboardName = document.getElementById("renameBoard").value;
    if (rboardName != "") {
        createBoard(rboardName)
    }
    else {
        window.alert("Please enter a valid board name");
        return false;
    }
}
handleRename

function deleteAccount() {

    const delAcc = host+"ToDo/api/account/delete/" + userID;
    makeRequest("DELETE", delAcc).then(value => {
        logOut();
    });
}

function createBoard(boardName) {
    const creatBoard = host+"ToDo/api/board/create/" + userID;
    const boardJson = {
        name: boardName
    };
    makeRequest("POST", creatBoard, JSON.stringify(boardJson)).then(value => {
        $("#modalBoardForm").modal("hide"); 
        getBoard();
    });
}

function renameBoard(boardName) {
    boardID = sessionStorage.getItem("boardId");
    const creatBoard = host+"ToDo/api/board/update/" + boardID;
    const boardJson = {
        name: boardName
    };
    makeRequest("POST", creatBoard, JSON.stringify(boardJson)).then(value => {
        $("#modalRenameBoard").modal("hide"); 
        getBoard();
    });
}

function getBoard() {
    const cteBoard = host+ "ToDo/api/board/findBoard/" + userID;
    makeRequest("Get", cteBoard).then(value => {
        populateBoard(value);
    });
}




function setBoardId(boaId) {
    sessionStorage.setItem("boardId", boaId);
}

function deleteBoard(boardID) {

    const delBoa = host+ "ToDo/api/board/delete/" + boardID;

    makeRequest("DELETE", delBoa).then(value => {
        getBoard();
    })
}

const parent = document.getElementById("boardSection");
function populateBoard(board) {
    parent.innerText = "";
    board = JSON.parse(board);

    for (b of board) {
        let bID = b.id;
        const wrapperCard = document.createElement("div");
        wrapperCard.className = "card";
        wrapperCard.id = b.id;
        wrapperCard.setAttribute("onclick", "var temp = setBoardId(this.id); getTask(); return temp;");
        const wrapperCBody = document.createElement("div");
        wrapperCBody.className = "card-body";
        wrapperCBody.id = "board-body";
        const wrapperBoardT = document.createElement("div");
        wrapperBoardT.className = "boardTitle";

        const pEl = document.createElement("h2");
        pEl.innerText = b.name;
        wrapperBoardT.append(pEl);
        wrapperCBody.append(wrapperBoardT);

        const wrapperBoardB = document.createElement("div");
        wrapperBoardB.className = "boardButtons";

        const buttonEdit = document.createElement("button");
        buttonEdit.className = "btn btn-light";
        buttonEdit.innerText = "Edit Task";
        wrapperBoardB.append(buttonEdit);

        const buttonRename = document.createElement("a");
        buttonRename.className = "btn btn-light";
        buttonRename.innerText = "Rename";
        buttonRename.setAttribute("type", "button");
        // buttonRename.setAttribute("data-toggle", "modal");
        // buttonRename.setAttribute("data-target", "modalRenameBoard");
        buttonRename.addEventListener("click", e =>{
            $("#modalRenameBoard").modal("toggle");
        })
        wrapperBoardB.append(buttonRename);

        const buttonDelete = document.createElement("button");
        buttonDelete.className = "btn btn-light";
        buttonDelete.innerText = "Delete";
        buttonDelete.addEventListener("click", () => {
            deleteBoard(bID);
        });

        wrapperBoardB.append(buttonDelete);
        wrapperCBody.append(wrapperBoardB);
        wrapperCard.append(wrapperCBody);
        parent.append(wrapperCard);
    }
}


// function getBoardID() {
//     const cteBoard = "http://localhost:8080/ToDo/api/board/findBoard/" + userID;

//     makeRequest("GET", cteBoard).then(val => {
//         val = JSON.parse(val)
//         console.log(val);
//         let bdId = null;
//         for (b of val) {
//             if (b.name == document.getElementById(b.name).id) {
//                 bdId = b.id;
//                 if (bdId != null) {
//                     handleTask(bdId);
//                 }
//                 break;
//             }
//         }
//     });
// }

function handleTask() {
    const taskDesc = document.getElementById("taskDesc").value;
    const taskPri = document.getElementById("priorityChoice").value;

    if (taskDesc != "" && taskPri != "") {
        createTask(taskDesc, taskPri);
    }
    else {
        window.alert("Please enter a valid Task description and priority");
        return false;
    }
}
function createTask(description, priority) {
    boardID = sessionStorage.getItem("boardId");
    const creatTask = host+ "ToDo/api/task/create/" + boardID;
    const taskJson = {
        description: description,
        priority: priority
    };

    makeRequest("POST", creatTask, JSON.stringify(taskJson)).then(value => {
        $("#modalTaskForm").modal("hide");
        getTask();
    });
}

function App() { }
App.prototype.setState = function (key, state) {
    localStorage.setItem(key, state);
}
App.prototype.getState = function (key) {
    return localStorage.getItem(key);
}

function getTask() {
    boardID = sessionStorage.getItem("boardId");
    const cteTask = host+ "ToDo/api/task/findTask/" + boardID;

    makeRequest("GET", cteTask).then(value => {
        populateTask(value);
    });
}
let tasknum = 1;
var app = new App();

function deleteTask(taskID) {

    const delTask = host+"ToDo/api/task/delete/" + taskID;

    makeRequest("DELETE", delTask).then(value => {
        getTask();
    })
}
function populateTask(task) {
    taskBody.innerText = "";
    newTaskButton.style.visibility = "visible";
    taskCard.style.visibility = "visible";
    taskBody.style.visibility = "visible";
    const wrapRow = document.createElement("div");
    wrapRow.className = "row";
    const wrapCol = document.createElement("div");
    wrapCol.className = "col";
    let hEl = document.createElement("h3");
    hEl.innerText = "Done";
    wrapCol.append(hEl);
    wrapRow.append(wrapCol);
    const wrapCol8 = document.createElement("div");
    wrapCol8.className = "col-8";
    const hEl38 = document.createElement("h3");
    hEl38.innerText = "Task";
    wrapCol8.append(hEl38);
    wrapRow.append(wrapCol8);
    const wrapCol2 = document.createElement("div");
    wrapCol2.className = "col";
    const hEl32 = document.createElement("h3");
    hEl32.innerText = "Priority";
    wrapCol2.append(hEl32);
    wrapRow.append(wrapCol2);
    taskBody.append(wrapRow);

    task = JSON.parse(task);
    
    for (t of task) {
        let taskID = t.id;
        const wrapperRow = document.createElement("div");
        wrapperRow.className = "row";
        wrapperRow.id = "row" + tasknum;
        tasknum++;

        const wrapperCol = document.createElement("div");
        wrapperCol.className = "col";
        const wrapperChe = document.createElement("div");
        wrapperChe.className = "form-check";
        const wrapperInp = document.createElement("input");
        wrapperInp.className = "form-check-input position-static";
        wrapperInp.setAttribute("type", "checkbox");
        wrapperInp.id = t.id;
        wrapperInp.addEventListener('click', function (e) {
            var _checkbox = e.target;
            // We save the checkbox id as the key in localStorage
            // We save the checkbox checked state as the value
            
            app.setState(_checkbox.id, _checkbox.checked)
        });
        // Determine if the checkbox is saved in LocalStorage
        var isSaved = app.getState(wrapperInp.id);

        // Set the selected state
        if (isSaved === 'true') {
            wrapperInp.checked = true;
        }

        wrapperChe.append(wrapperInp);
        wrapperCol.append(wrapperChe);
        wrapperRow.append(wrapperCol);
        const wrapAlert = document.createElement("div");
        wrapAlert.className = "alert alert-info";
        const wrapperCol8 = document.createElement("div");
        wrapperCol8.className = "col-8";

        const taskDesc = t.description;
        const pEl2 = document.createElement("p2");
        pEl2.innerText = taskDesc;

        wrapAlert.append(pEl2);
        wrapperCol8.append(wrapAlert);
        wrapperRow.append(wrapperCol8)

        const wrapperColB = document.createElement("div");
        wrapperColB.className = "col";

        const wrapperS = document.createElement("button");
        wrapperS.id = "myPriority";
        wrapperS.innerText = t.priority;
        // const optionL = document.createElement("option");
        // optionL.value = "Low";
        // optionL.innerText = "Low";
        // wrapperS.append(optionL);
        // const optionM = document.createElement("option");
        // optionM.value = "Medium";
        // optionM.innerText = "Medium";
        // wrapperS.append(optionM);
        // const optionH = document.createElement("option");
        // optionH.value = "High";
        // optionH.innerText = "High";
        // wrapperS.append(optionH);
        wrapperS.value = t.priority;

        wrapperColB.append(wrapperS);
        wrapperRow.append(wrapperColB);
        taskBody.append(wrapperRow);

        const buttonDelete = document.createElement("button");
        buttonDelete.className = "btn btn-light delTask";
        buttonDelete.innerText = "Delete Task";
        buttonDelete.addEventListener("click", () => {
            deleteTask(taskID);
        });
        wrapperColB.append(buttonDelete);
        wrapperRow.append(wrapperColB);
        taskBody.append(wrapperRow);
    }
}

function logOut() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('boardId');
    window.location = "Login.html";
}


function toLogin() {
    window.location = "Login.html";
}

function toRegister() {
    window.location = "reg.html";
}

getBoard();



