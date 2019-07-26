function makeRequest(method, url, body){
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            resolve(xhr.responseText);
        };
        
        xhr.open(method, url);
        
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.send(body);
    });

}