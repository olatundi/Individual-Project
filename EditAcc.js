$("#edit-form").submit(function(e) {
    e.preventDefault();
});

function handleEdit(fo) {
    const uname = document.getElementById("user").value;
    const pass = document.getElementById("password").value;
    const cPass = document.getElementById("ConPassword").value;
    const fname = document.getElementById("firstName").value;
    const lname = document.getElementById("lastName").value;

    if (pass == cPass) {
        let finalP = cPass;
    }
    else {
        window.alert("Please Enter a Matching Password!");
        return null;
    }

    const userID = sessionStorage.getItem("userId");
    var host = "http://35.246.117.146:8081/";
    const editAcc = host+"ToDo/api/account/update/" + userID;
    const regJson = {
        username: uname,
        password: cPass,
        firstName: fname,
        lastName: lname
    };

    makeRequest("POST", editAcc, JSON.stringify(regJson)).then(value => {
        window.alert("Account Updated");
        toBoard();
    });
    return true;
}

function toLogin() {
    window.location = "Login.html"
}

function toBoard() {
    window.location = "Boards.html"
}