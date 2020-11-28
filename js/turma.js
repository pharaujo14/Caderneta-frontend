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


function listAlunos(alunos) {
    return `<ul class="list-group list-group-flush">${alunos}</ul>`
}

function listItemAluno(aluno) {

    return `<li class="list-group-item">${aluno.email}</li>`

}

function listAulas(aulas) {
    return `<ul class="list-group list-group-flush">${aulas}</ul>`
}

function listItemAula(aula, index) {

    return `<li class="list-group-item">Aula ${index + 1} ${aula}</li>`

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

function getAula(token, idTurma) {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/aulas/turma/" + idTurma,
        headers: {
            "Authorization": token
        },
        success: function (resposta) {          

            let dataAula = resposta.map(element => {
                return element.data
            })                      

            let template = ''

            dataAula.forEach((aula, index) => {
                template += listItemAula(aula, index)
            });

            
            let list = listAulas(template)

            $('.aulas-turma').html(list);
            

        }
    });

}

function addAluno(emailA, idTurma) {

    const json = {
        emailAluno: emailA,
        id: idTurma
    };
  
    console.log(json);
  
    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/turmas/addAlunos",
        data: JSON.stringify(json),
        dataType: "json",    
        success: alert("Adicionado com sucesso!")
    });

    setTimeout(recarregar(), 3000);
  }
  
  $('#addAlunosForm').on('submit', function(event){
  
    event.preventDefault();
    
  
    let emailA= $('#email').val();
  
    
  
    addAluno(emailA, idTurma);
  
  })
  
  function recarregar() {
    window.location.reload();
  }
  

getTurma(token, idTurma);
getAula(token, idTurma);