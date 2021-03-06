function cardAula(aula) {
    let template =
        `<div class="col-md-3 mb-3">
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">${aula.data} - ${aula.nome} </h5>
      <h6 class="card-subtitle mb-2 text-muted">${aula.turma.horarioInicio} até ${aula.turma.horarioFim} - ${aula.turma.local}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Turma: ${aula.turma.nome}</h6>      
      <h6 class="card-subtitle mb-2 text-muted">Professor: ${aula.turma.professor.nome}</h6>
      <p class="card-text"></p>
      <a href="aula.html?id=${aula.id}" class="card-link">Ver Aula</a>      
    </div>
  </div>
  </div>`
    return template
}

function cardTurma(turma) {
    let template =
        `<div class="col-md-3 mb-3">
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">${turma.nome}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${turma.horarioInicio} até ${turma.horarioFim} - ${turma.local}</h6>
      <p class="card-text">As aulas começaram no dia ${turma.inicio} e serão finalizadas no dia ${turma.fim}</p>
      <a href="turma.html?id=${turma.id}" class="card-link">Ver Turma</a>      
    </div>
  </div>
  </div>`

    return template
}

function renderConteudoProfessor(role, id, token) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/aulas/professores/dashboard",
        headers: {
            "Authorization": token
        },
        success: function (resposta) {

            let template = "";

            resposta.forEach(aula => {
                template += cardAula(aula);
            });

            let linha = row(template, 'mt-2');

            $('.list-aulas').html(linha);
        }
    });

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

            let linha = row(template, 'mt-2');

            $('.list-turmas').html(linha);

        }
    });
}

function renderConteudoAluno(role, id, token) {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/aulas/alunos/dashboard",
        headers: {
            "Authorization": token
        },
        success: function (resposta) {

            let template = "";

            resposta.forEach(aula => {
                template += cardAula(aula);
            });

            let linha = row(template, 'mt-2');

            $('.list-aulas').html(linha);
        }
    });

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/turmas/alunos",
        headers: {
            "Authorization": token
        },
        success: function (resposta) {

            let template = "";

            resposta.forEach(turma => {
                template += cardTurma(turma);
            });

            let linha = row(template, 'mt-2');

            $('.list-turmas').html(linha);

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