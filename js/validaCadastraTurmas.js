$(document).ready(function () {
  ajustaData();
  $("#formCadastroTurma").submit(function (event) {
    event.preventDefault();
    enviar();
    setTimeout(redirecionar(), 20000);
  });
});

var jwt = localStorage.getItem('jwt');

function ajustaData() {
  $('[type="date"]').on("keydown", function () {
    event.preventDefault();
    return false;
  });
}


function redirecionar(){
  swal("Concluído", "Turma criada com sucesso!", "success")
  .then((value) => {
    window.location.href = 'dashboard.html'; 
  });            
}

function enviar(jwt) {
  let insert = {};
  insert.nome = $("#nomeTurma").val();
  insert.local = $("#local").val();
  insert.horarioInicio = $("#horaInicio").val();
  insert.horarioFim = $("#horaEncerramento").val();
  insert.inicio = $("#inicioAulas").val().split("-").reverse().join("/");
  insert.fim = $("#encerramentoAulas").val().split("-").reverse().join("/");
  insert.dias = [];

  $(".form-check-input").each((i, e) => {
    if ($(e).is(":checked")) {
      insert.dias.push(parseInt($(e).val()));
    }
  });

  $("#enviar").prop("disabled", true);

  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/turmas",
    headers: {"Authorization": localStorage.getItem('token')},
    data: JSON.stringify(insert),
    dataType: "json",
    cache: false,
    timeout: 600000,
  });
 
}