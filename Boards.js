
const req = new XMLHttpRequest();
req.onload = function () {
    let data = JSON.parse(req.responseText);
    console.log("Data:", data);
    createPage(data);
}

req.open('GET', "http://localhost:8080/ToDo/api/account/getAll");
req.send();
const userID = sessionStorage.getItem("userId");
function createPage(da) {
    //Display Account details
    console.log("acc", da);
    for (d of da) {
        console.log(d);
        if (d.id == userID) {
            console.log(userID);
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


function createBoard(boardName) {
    // console.log(da);
    // console.log(userObj.username);
    // <div class="col" >
    //                 <div class="card">
    //                     <div class="card-body">
    //                         <div class="boardTitle"></div>
    // <div class="boardTitle">
    //     <h2>Boards 1
    //     </h2>
    // </div>

    // <div class="boardButtons">
    //     <button type="button" class="btn btn-light">Edit</button>
    //     <button type="button" class="btn btn-light">Rename</button>
    //     <button type="button" class="btn btn-light">Delete</button>
    // </div>
    // </div>
    const creatBoard = "http://localhost:8080/ToDo/api/board/create/" + userID;
    const boardJson = {
        name: boardName
    };
    console.log(boardJson);


    makeRequest("POST", creatBoard, JSON.stringify(boardJson)).then(value => {
        console.log("Success:", value);
        getBoard();
    });
}


function getBoard() {
    const cteBoard = "http://localhost:8080/ToDo/api/board/findBoard/" + userID;

    makeRequest("Get", cteBoard).then(value => {
        console.log("Success:", value);

        populateBoard(value);
    });
}


const parent = document.getElementById("boardSection");
function populateBoard(board) {
    parent.innerText = "";
    board = JSON.parse(board);
    console.log(board);
    for (b of board) {
        console.log(b);
        const wrapperCard = document.createElement("div");
        wrapperCard.className = "card";
        wrapperCard.id = b.name;
        wrapperCard.setAttribute("onclick", "return getTask(); ");
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
        buttonEdit.innerText = "Edit";
        wrapperBoardB.append(buttonEdit);

        const buttonRename = document.createElement("button");
        buttonRename.className = "btn btn-light";
        buttonRename.innerText = "Rename";
        wrapperBoardB.append(buttonRename);

        const buttonDelete = document.createElement("button");
        buttonDelete.className = "btn btn-light";
        buttonDelete.innerText = "Delete";
        buttonDelete.addEventListener("click", () => {
            parent.removeChild(wrapperCard);
        });
        wrapperBoardB.append(buttonDelete);
        wrapperCBody.append(wrapperBoardB);
        wrapperCard.append(wrapperCBody);

        console.log(wrapperCard);

        parent.append(wrapperCard);
    }
}

function handleTask(boardId) {
    const taskDesc = document.getElementById("taskDesc").value;
    const taskPri = document.getElementById("priorityChoice").value;
    console.log(taskPri);

    if (taskDesc != "" && taskPri != "") {
        console.log(boardId);
        createTask(taskDesc, taskPri, boardId);
    }
    else {
        window.alert("Please enter a valid Task description and priority");
        return false;
    }
}

function getBoardID () {
    const cteBoard = "http://localhost:8080/ToDo/api/board/findBoard/" + userID;

    makeRequest("GET", cteBoard).then(val => {
        val = JSON.parse(val)
        console.log(val);
        let bdId = null;
        for (b of val) {
            if (b.name == document.getElementById(b.name).id){
                bdId = b.id;
                if (bdId != null){
                handleTask(bdId);
                }
                break;
            }
            
        }
       
    });
    
}
function createTask(description, priority, boardID) {
    const creatTask = "http://localhost:8080/ToDo/api/task/create/" + boardID;
    const taskJson = {
        description: description,
        priority: priority
    };
    console.log(taskJson);


    makeRequest("POST", creatTask, JSON.stringify(taskJson)).then(value => {
        console.log("Success:", value);
        getTask();
    });
}

const taskBody = document.getElementById("taskBody");

function getTask() {
    const cteTask = "http://localhost:8080/ToDo/api/task/findTask/" + userID;

    makeRequest("GET", cteTask).then(value => {
        console.log("Success:", value);
        populateTask(value);
    });
}
let tasknum = 1;
function populateTask(task) {

    taskBody.innerText = "";
    task = JSON.parse(task);
    console.log(task);
    for (t of task) {
        console.log(t);
        const newTaskButton = document.getElementById("newTask");
        newTaskButton.style.visibility = "visible";

        const taskBody = document.getElementById("taskBody");
        taskBody.style.visibility = "visible";
        const taskCard = document.getElementById("taskCard");
        taskCard.style.visibility = "visible";

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
        wrapperChe.append(wrapperInp);
        wrapperCol.append(wrapperChe);
        wrapperRow.append(wrapperCol);

        const wrapperCol8 = document.createElement("div");
        wrapperCol8.className = "col-8";

        const taskDesc = t.description;
        const pEl2 = document.createElement("p2");
        pEl2.innerText = taskDesc;
        wrapperCol8.append(pEl2);
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
        console.log(t.priority);
        wrapperS.value = t.priority;

        wrapperColB.append(wrapperS);
        wrapperRow.append(wrapperColB);

        taskBody.append(wrapperRow);



        const buttonDelete = document.createElement("button");
        buttonDelete.className = "btn btn-light";
        buttonDelete.innerText = "Delete";
        buttonDelete.addEventListener("click", () => {
            parent.removeChild(wrapperRow);
        });
        wrapperColB.append(buttonDelete);

        wrapperRow.append(wrapperColB);
        console.log(wrapperRow);
        taskBody.append(wrapperRow);

    }
}

function logOut() {

    sessionStorage.removeItem('userId');
    window.location = "Login.html";
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
// function toggleDropdownion() {
//     document.getElementById("myDropdown").classList.toggle("show");
//   }

//   // Close the dropdown if the user clicks outside of it
//   window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }
// click, (ev) = > {
//     parent.ev.id

// }



function toLogin() {
    window.location = "Login.html";
}

function toRegister() {
    window.location = "reg.html";
}

getBoard();