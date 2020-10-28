$(document).ready(function () {
    ajustaData();
    $("#formCadastroTurma").submit(function (event) {
        event.preventDefault();
        enviar();
    });
});

function ajustaData(){
    $('[type="date"]').on("keydown", function() {
        event.preventDefault();
        return false;
      });
}

function enviar() {
    var insert = {};
    insert["nome"] = $("#nomeTurma").val();
    insert["local"] = $("#local").val();
    insert["horarioInicio"] = $("#horaInicio").val();
    insert["horarioFim"] = $("#horaEncerramento").val();
    // insert["dia"] = $("#diasAulas").val();
    insert["inicio"] = $("#inicioAulas").val().split('-').reverse().join('/');
    insert["fim"] = $("#encerramentoAulas").val().split('-').reverse().join('/');

    $("#enviar").prop("disabled", true);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/turmas",
        data: JSON.stringify(insert),
        dataType: "json",
        cache: false,
        timeout: 600000,
        sucess: alert("Cadastro realizado com sucesso")
    });
}



