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


function toLogin() {
    window.location = "login.html";
}

function toRegister() {
    window.location = "reg.html";
}