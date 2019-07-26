$("#login-form").submit(function(e) {
    e.preventDefault();
});

function handleReg(fo) {
    const uname = document.getElementById("user").value;
    const pass = document.getElementById("password").value;
    

    // if (pass == cPass) {
    //     let finalP = cPass;
    // }
    // else {
    //     window.alert("Please Enter a Matching Password!");
    //     return null;
    // }

    const checkAcc = "http://localhost:8080/ToDo/api/account/login";
    const regJson = {
        username: uname,
        password: pass
        
    };
    console.log(regJson);

    // const xhr = new XMLHttpRequest();

    // xhr.open("POST", createAcc);
    
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhr.send(JSON.stringify(regJson));
    makeRequest("POST", checkAcc, JSON.stringify(regJson)).then(value => {
        value = JSON.parse(value);
        console.log("Success:", value);
        console.log(value.length);  
        if (value.length > 0 ){
            
            sessionStorage.setItem('userId', value[0].id);
            // window.alert()
            toBoard();
        } 
        else{
            window.alert("Please enter valid details");
        }
        
    });
    // toLogin();

    return true;

}

function toBoard() {
    window.location = "Boards.html"
}