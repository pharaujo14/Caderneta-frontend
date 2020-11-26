function cardTurma(turma) {

    let template = 
    `<div class="col">
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">${turma.nome}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${turma.horarioInicio} até ${turma.horarioFim} - ${turma.local}</h6>
      <p class="card-text">As aulas começaram no dia ${turma.inicio} e serão finalizadas no dia ${turma.fim}</p>
      <a href="#" class="card-link">Ver Turma</a>      
    </div>
  </div>
  </div>`

return template
}



function renderConteudoProfessor(role, id, token) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/professores/" + id + "/turmas",
        headers: {
            "Authorization": token
        },
        success: function (resposta) {
            
            let template = "";

            resposta.forEach(turma => {
                template += cardTurma(turma);
            });

            let linha = row(template);

            $('.container-conteudo').html(linha);

        }
    });
}

function renderConteudoAluno(role, id, token) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/turmas/alunos",
        headers: {
            "Authorization": token
        },
        success: function (resposta) {
            console.log(resposta)
        }
    });
}

function renderConteudo(role, id, token) {
    if (role == "PROFESSOR") {
        renderConteudoProfessor(role, id, token);
        return
    }

    renderConteudoAluno(role, id, token);
    return
}

let token = getToken();
let parsedToken = parseJwt(token);
let role = parsedToken.role;
let id = parsedToken.usrid;

renderConteudo(role, id, token);