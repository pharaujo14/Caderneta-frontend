let token = getToken();
let parsedToken = parseJwt(token);
let role = parsedToken.role;
let id = parsedToken.usrid;

console.log({
    role,
    id
})



$('.container-conteudo')

function getConteudoAluno(){
    $.ajax({
        type: "GET",
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

function getConteudoProfessor(){
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/professores/id/turmas",
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

function renderConteudoProfessor(role){

}

function renderConteudoAluno(role){

}

function renderConteudo(role){
    if(role == "PROFESSOR"){
        renderConteudoProfessor(role);
        return
    }

    renderConteudoAluno(role);
    return
}

