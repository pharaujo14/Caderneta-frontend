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

