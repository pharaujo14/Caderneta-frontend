let token = getToken();
let idAula = getDataFromURL("id");
let inputAluno = $('#email');
let aux = {};

function cardAula(aula, role) {
    


    aux = aula
    let template =
        `<div class="col-12">
    <div class="card">
    <div class="card-body card-aula">
      <h5 class="card-title aula-nome">Aula: ${aula.nome}</h5>
      <h6 class="card-subtitle mb-2">${aula.data}</h6>      
      <p class="card-text">Horario: ${aula.turma.horarioInicio} até ${aula.turma.horarioFim} - ${aula.turma.local}</p>
      <p class="card-text">Turma: ${aula.turma.nome}</p>
      <p class="card-text">Professor: ${aula.turma.professor.nome}</p>
      <p class="card-text ">Conteúdo: <span class="aula-conteudo">${aula.conteudo}</span></p>      
      ${role == 'PROFESSOR'?`<button data-id-aula="${aula.id}" class="btn btn-outline-danger btn-modal-aula">Editar Aula</button>`: ''}
    </div>
  </div>
  </div>`
    return template
}

function modalAula(nomeAula, conteudoAula) {
    let modal = $('.update-aula-modal')

    modal.find('.nome-aula').val(nomeAula)
    modal.find('.conteudo-aula').val(conteudoAula)

    modal.modal('show')
}

function clearModal() {
    let modal = $('.update-aula-modal')

    modal.find('.nome-aula').val('')
    modal.find('.conteudo-aula').val('')

}

function getAulaProfessor(token, idAula, role) {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/aulas/" + idAula,
        headers: {
            "Authorization": token
        },
        success: function (resposta) {
            let template = ''
            let aula = cardAula(resposta, role);
            let linha = row(aula);

            $('.dados-aula').html(linha)
        }
    });
}

function getAulaAluno(token, idAula, role) {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/aulas/" + idAula,
        headers: {
            "Authorization": token
        },
        success: function (resposta) {
            let template = ''
            let aula = cardAula(resposta, role);
            let linha = row(aula);

            $('.dados-aula').html(linha)
        }
    });
}
function renderConteudoProfessor(role, id, token) {
    getAulaProfessor(token, idAula, role);
}

function renderConteudoAluno(role, id, token) {
    getAulaAluno(token, idAula, role); 
}

function renderConteudo(role, id, token) {
    if (role == "PROFESSOR") {
        renderConteudoProfessor(role, id, token);
        return
    }

    renderConteudoAluno(role, id, token);

    return
}


let parsedToken = parseJwt(token);
let role = parsedToken.role;
let id = parsedToken.usrid;

console.log(role)

renderConteudo(role, id, token);

$('body').on('click', '.btn-modal-aula', function (event) {

    let button = $(event.target);
    let nomeAula = button.parents('.card-aula').find('.aula-nome').text();
    let conteudoAula = button.parents('.card-aula').find('.aula-conteudo').text();

    modalAula(nomeAula, conteudoAula);
});

$('.update-aula-modal').on('hidden.bs.modal', function (event) {
    clearModal();
})

$('.update-aula-modal form').on('submit', function (event) {
    event.preventDefault();
    let modal = $('.update-aula-modal')

    let nomeAula = modal.find('.nome-aula').val()
    let conteudoAula = modal.find('.conteudo-aula').val()

    aux.conteudo = conteudoAula
    aux.nome = nomeAula

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/aulas/" + idAula,
        headers: {
            "Authorization": token
        },
        data: JSON.stringify(aux),
        dataType: "json",
        success: function (resposta) {
            swal("Concluído", "Aula atualizada com sucesso!", "success")
                .then((value) => {
                    setTimeout(recarregar(), 10000);
                });
        }
    });


})

function recarregar() {
    window.location.reload();
}

$('.update-aula-modal .btn-salvar-aula').on('click', function () {

    $('.update-aula-modal form').submit()
})