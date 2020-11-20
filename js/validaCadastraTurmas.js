$(document).ready(function () {
  ajustaData();
  $("#formCadastroTurma").submit(function (event) {
    event.preventDefault();
    enviar();
  });
});

function ajustaData() {
  $('[type="date"]').on("keydown", function () {
    event.preventDefault();
    return false;
  });
}

async function enviar() {
  let insert = {};
  insert.nome = $("#nomeTurma").val();
  insert.local = $("#local").val();
  insert.horarioInicio = $("#horaInicio").val();
  insert.horarioFim = $("#horaEncerramento").val();
  insert.inicio = $("#inicioAulas").val().split("-").reverse().join("/");
  insert.fim = $("#encerramentoAulas").val().split("-").reverse().join("/");

  $("#enviar").prop("disabled", true);

  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/turmas",
    data: JSON.stringify(insert),
    dataType: "json",
    cache: false,
    timeout: 600000,
    sucess: criarAulas(), 
  });

  alert("Cadastro realizado com sucesso");
}

async function buscaURL() {
  var url = response.location;
  url = url.split("turmas/");
  console.log(url);
  return url;

  
}

async function criarAulas() {
  let insert = {};

  var url = window.location.href;
  url = url.split("turmas/");
  console.log(url);

  insert.dias = [];

  $(".form-check-input").each((i, e) => {
    if ($(e).is(":checked")) {
      insert.dias.push(parseInt($(e).val()));
    }
  });

  insert.turma = url;

  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/aulas/emLote",
    data: JSON.stringify(insert),
    dataType: "json",
    cache: false,
    timeout: 600000,
    sucess: alert("Cadastro realizado com sucesso"),
  });
}
