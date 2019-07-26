$("#register-form").submit(function(e) {
    e.preventDefault();
});

function handleReg(fo) {
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

    const createAcc = "http://localhost:8080/ToDo/api/account/createAccount";
    const regJson = {
        username: uname,
        password: cPass,
        firstName: fname,
        lastName: lname
    };
    console.log(regJson);

    
    makeRequest("POST", createAcc, JSON.stringify(regJson)).then(value => {
        console.log("Success", value);
        window.alert("Please login to your account");
        toLogin();
    });

    return true;

}

function toLogin() {
    window.location = "Login.html"
}