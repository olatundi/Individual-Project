$("#login-form").submit(function(e) {
    e.preventDefault();
});

function handleReg(fo) {
    const uname = document.getElementById("user").value;
    const pass = document.getElementById("password").value;
    var host = "http://35.246.117.146:8081/"

    // if (pass == cPass) {
    //     let finalP = cPass;
    // }
    // else {
    //     window.alert("Please Enter a Matching Password!");
    //     return null;
    // }

    const checkAcc = host+"ToDo/api/account/login";
    const regJson = {
        username: uname,
        password: pass
    };
    // const xhr = new XMLHttpRequest();

    // xhr.open("POST", createAcc);
    
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhr.send(JSON.stringify(regJson));
    makeRequest("POST", checkAcc, JSON.stringify(regJson)).then(value => {
        value = JSON.parse(value);
        
        if (value.length > 0 ){
            sessionStorage.setItem('userId', value[0].id);
            // window.alert()
            toBoard();
        } 
        else{
            window.alert("Please Enter Valid Details or Create a New Account");
        }
        
    });
    // toLogin();

    return true;

}

function toBoard() {
    window.location = "Boards.html"
}