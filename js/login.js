function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function logar(login, senha) {

    const json = {
        username : login,
        password : senha,
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/login",
        data: JSON.stringify(json),
        dataType: "json",    
        success: function(resposta) {
            let token = `Bearer ${resposta.jwt}`
            let tokenP = parseJwt(resposta.jwt);            
            localStorage.setItem("token", token);
            localStorage.setItem("role", tokenP.role);
            location.href = "dashboard.html"
        }, error: function() {
            alert("Usuario ou senha incorretos!");
        }

    });    
}

$('#formLogin').on('submit', function(event){

    event.preventDefault();

    let username = $('#email').val();

    let password = $('#senha').val();

    logar(username, password);

})

