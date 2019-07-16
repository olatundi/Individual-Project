const parent = document.getElementById("layout-left");

function createBoard(fo) {
    // console.log(da);
    // console.log(userObj.username);
    // <div class="col">
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
    const wrapperRow = document.createElement("div");
    wrapperRow.className = "row";
    const wrapperCol = document.createElement("div");
    wrapperCol.className = "col";
    const wrapperCard = document.createElement("div");
    wrapperCard.className = "card";
    const wrapperCBody = document.createElement("div");
    wrapperCBody.className = "card-body";
    wrapperCBody.id = "board-body"
    const wrapperBoardT = document.createElement("div");
    wrapperBoardT.className = "boardTitle";

    const pEl = document.createElement("h2");
    pEl.innerText = document.getElementById("formBoard").value;
    wrapperBoardT.append(pEl);
    wrapperCBody.append(wrapperBoardT);

    const wrapperBoardB = document.createElement("div");
    wrapperBoardB.className = "boardButtons";

    const buttonEdit = document.createElement("button");
    buttonEdit.className = "btn btn-light";
    buttonEdit.innerText="Edit";
    wrapperBoardB.append(buttonEdit);
   
    const buttonRename = document.createElement("button");
    buttonRename.className = "btn btn-light";
    buttonRename.innerText="Rename";
    wrapperBoardB.append(buttonRename);

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "btn btn-light";
    buttonDelete.innerText="Delete";
    buttonDelete.addEventListener("click", () => {
        parent.removeChild(wrapperRow)
    });
    wrapperBoardB.append(buttonDelete);
    wrapperCBody.append(wrapperBoardB);
    wrapperCard.append(wrapperCBody);
    wrapperCol.append(wrapperCard);
    wrapperRow.append(wrapperCol);
    console.log(wrapperRow);
    parent.append(wrapperRow);

}

const parent1 = document.getElementById("layout-right");

function createTask(fo) {
    // <div class="layout-right">
    // <div class="card">
    // <div class="card-body">
    //  <div class="row">
    //                     <div class="col">
    //                        <div class="form-check">
    //                             <input class="form-check-input position-static" type="checkbox" id="blankCheckbox"
    //                                 value="option1" aria-label="...">
    //                         </div>
    //                     </div>
    //                     <div class="col-8">
    //                         <p2>Build Website</p2>
    //                     </div>
    //                     <div class="col">
    //                         <!-- Basic dropdown -->
    //                         <button class="btn btn-primary dropdown-toggle mr-4" type="button" data-toggle="dropdown"
    //                             aria-haspopup="true" aria-expanded="false">Priority</button>

    //                         <div class="dropdown-menu
    //                             <a class="dropdown-item" href="#">Low</a>
    //                             <a class="dropdown-item" href="#">Medium</a>
    //                             <div class="dropdown-divider"></div>
    //                             <a class="dropdown-item" href="#">High</a>
    //                         </div>
    //                         <!-- Basic dropdown -->
    //                     </div>
    //                 </div>
    const wrapperCard = document.createElement("div");
    wrapperCard.className = "card";
    const wrapperCBody = document.createElement("div");
    wrapperCBody.className = "card-body";
    const wrapperRow = document.createElement("div");
    wrapperRow.className = "row";
    const wrapperCol = document.createElement("div");
    wrapperCol.className = "col";
    
    
    wrapperCBody.id = "board-body"
    const wrapperBoardT = document.createElement("div");
    wrapperBoardT.className = "boardTitle";

    const pEl = document.createElement("h2");
    pEl.innerText = document.getElementById("formTask").value;
    wrapperBoardT.append(pEl);
    wrapperCBody.append(wrapperBoardT);

    const wrapperBoardB = document.createElement("div");
    wrapperBoardB.className = "boardButtons";

    const buttonEdit = document.createElement("button");
    buttonEdit.className = "btn btn-light";
    buttonEdit.innerText="Edit";
    wrapperBoardB.append(buttonEdit);
   
    const buttonRename = document.createElement("button");
    buttonRename.className = "btn btn-light";
    buttonRename.innerText="Rename";
    wrapperBoardB.append(buttonRename);

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "btn btn-light";
    buttonDelete.innerText="Delete";
    buttonDelete.addEventListener("click", () => {
        parent.removeChild(wrapperRow)
    });
    wrapperBoardB.append(buttonDelete);
    wrapperCBody.append(wrapperBoardB);
    wrapperCard.append(wrapperCBody);
    wrapperCol.append(wrapperCard);
    wrapperRow.append(wrapperCol);
    console.log(wrapperRow);
    parent.append(wrapperRow);

}


function toLogin() {
    window.location = "login.html";
}

function toRegister() {
    window.location = "reg.html";
}