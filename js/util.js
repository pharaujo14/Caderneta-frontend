function getToken() {
    return localStorage.getItem("token")    
}

function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function row (elemento, classes) {

    return `<div class="row ${classes!=undefined?classes:''}"> ${elemento} </div>`

    
}

function getDataFromURL(key){

    const urlParams = new URLSearchParams(location.search)

    let  param = urlParams.get(key)

    return param
}

