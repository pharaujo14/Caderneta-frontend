$(document).ready(function () {
  $("#formCadastro").submit(function (event) {
    event.preventDefault();

    enviar();
  });
});

function enviar() {
  var insert = {};
  insert["nome"] = $("#nome").val();
  insert["sobrenome"] = $("#sobrenome").val();
  insert["email"] = $("#email").val();
  insert["cpf"] = $("#cpf").val();
  insert["foto"] = $("#foto").val();
  insert["senha"] = $("#senha").val();

  $("#enviar").prop("disabled", true);

  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/professores",
    data: JSON.stringify(insert),
    dataType: "json",
    cache: false,
    timeout: 600000,
    success: alert("Cadastro realizado com sucesso"),
  });
}
