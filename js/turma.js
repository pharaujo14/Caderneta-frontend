let token = getToken();
let idTurma = getDataFromURL("id");

function cardTurma(turma) {

    let template = 
    `<div class="col-12">
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">Nome: ${turma.nome}</h5>
      <p class="card-text">Inicio das Aulas: ${turma.inicio}</p>
      <p class="card-text">Fim das Aulas: ${turma.fim}</p>
      <p class="card-text">Horario: ${turma.horarioInicio} até ${turma.horarioFim}</p>      
      <p class="card-text">Local: ${turma.local}</p>      
    </div>
  </div>
  </div>`

return template
}


function listAlunos (items) {
return `<ul class="list-group list-group-flush">${items}</ul>`
}

function listItemAluno(aluno) {

return `<li class="list-group-item">${aluno.email}</li>`

}

function getTurma(token, idTurma) {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/turmas/" + idTurma,
        headers: {
            "Authorization": token
        },
        success: function (resposta) {

                        
            let template = ''

            resposta.alunos.forEach(aluno => {
                template += listItemAluno(aluno)
            });

            let turma = cardTurma(resposta);

            let linha = row(turma);

            let list = listAlunos(template)

            $('.list-alunos').html(list);
            $('.dados-turma').html(linha);

            
            
        }
    });

}

getTurma(token,idTurma);


