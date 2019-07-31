$("#register-form").submit(function(e) {
    e.preventDefault();
});

function handleReg(fo) {
    const uname = document.getElementById("user").value;
    const pass = document.getElementById("password").value;
    const cPass = document.getElementById("ConPassword").value;
    const fname = document.getElementById("firstName").value;
    const lname = document.getElementById("lastName").value;
    var host = "http://35.246.117.146:8081/";

    if (uname != "" ) {
        let usename = uname;
    }
    else {
        window.alert("Please Enter a Valid Username!");
        return null;
    }

    if (pass == cPass) {
        let finalP = cPass;
    }
    else {
        window.alert("Please Enter a Matching Password!");
        return null;
    }

    const createAcc = host+"ToDo/api/account/createAccount";
    const regJson = {
        username: uname,
        password: cPass,
        firstName: fname,
        lastName: lname
    };
    
    makeRequest("POST", createAcc, JSON.stringify(regJson)).then(value => {
        window.alert("Now login to your account");
        toLogin();
    });
    return true;
}

function toLogin() {
    window.location = "Login.html"
}