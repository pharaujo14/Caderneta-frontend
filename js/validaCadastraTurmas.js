$(document).ready(function () {
    $("#formCadastroTurma").submit(function (event) {
        event.preventDefault();
        enviar();
    });
});

function enviar() {
    var insert = {};
    insert["nome"] = $("#nomeTurma").val();
    insert["local"] = $("#local").val();
    insert["horario"] = $("#horarioAula").val();
    insert["dia"] = $("#diasAulas").val();
    insert["inicio"] = $("#inicioAulas").val().replace(/[^\d]+/g, '');
    insert["fim"] = $("#encerramentoAulas").val().replace(/[^\d]+/g, '');

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



