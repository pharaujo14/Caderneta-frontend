$(document).ready(function () {
  showPassword();
  $('#validaSenha').css("display", "none") 
  $("#cpf").mask("999.999.999-99");
  $("#formCadastro").submit(function (event) {
    event.preventDefault();
    validarSenha(); 
  });
});

function validarSenha(){
  senha = $("#senha").val();
  confirmaSenha = $("#confirmasenha").val();
  if (senha != confirmaSenha){ 
    $('#validaSenha').css("display", "grid") 
    senha == null;
    confirmaSenha == null;
    return false;
  }
  $('#validaSenha').css("display", "none") 
  enviar();
  return true;
}



function enviar() {

  var role = $("#role").val()

  var insert = {};  
  insert["nome"] = $("#nome").val();
  insert["sobrenome"] = $("#sobrenome").val();
  insert["email"] = $("#email").val();
  insert["cpf"] = $("#cpf").val().replace(/[^\d]+/g,'');
  insert["senha"] = $("#senha").val();

  $("#enviar").prop("disabled", true);

  if(role == 1){
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "http://localhost:8080/professores",
      data: JSON.stringify(insert),
      dataType: "json",
      cache: false,
      timeout: 600000,
      sucess: alert("Cadastro realizado com sucesso")
    });
  } else {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "http://localhost:8080/alunos",
      data: JSON.stringify(insert),
      dataType: "json",
      cache: false,
      timeout: 600000,
      sucess: alert("Cadastro realizado com sucesso")
    });
  }

  
}


function showPassword(){
  var senha = $('#senha');
  var confirmaSenha = $('#confirmasenha');
  var senhaOlho= $("#senhaOlho");
  var confirmaSenhaOlho= $("#confirmaSenhaOlho");
  
    senhaOlho.mousedown(function() {
      return senha.attr("type", "text");
    });
    
    senhaOlho.mouseup(function() {
      return senha.attr("type", "password");
    });
  
    confirmaSenhaOlho.mousedown(function() {
      return confirmaSenha.attr("type", "text");
    });
    
    confirmaSenhaOlho.mouseup(function() {
      return confirmaSenha.attr("type", "password");
    });
}

