let registerButton = document.getElementById("register-submit");
let nickname = document.getElementById("nickname");
let email = document.getElementById("register-email");
let password = document.getElementById("register-password");

function register() {
	if (checkBlankSignUp()) {
		$.ajax({
			url: 'http://3.36.125.215:8080/sign-up',
			type: 'POST',
			data: JSON.stringify({
				nickname: nickname.value,
				email: email.value,
				password: password.value
			}),
			contentType: "application/json",
            statusCode: {
				201: function(data) {
					alert("회원가입 성공");
					reset();
				}
			},
            error : function(e){
               alert(e.responseText);
            },

		})
	}
}

function checkBlankSignUp() {
	if (nickname.value == "" || email.value == "" || password.value == "") {
        alert("모든 항목을 입력해주세요");
        return false;
    }

    return true;
}

function reset() {
	nickname.value = null;
 	email.value = null;
 	password.value = null;
}


function setClickRegisterButton() {
    registerButton.addEventListener("click", register)
}


setClickRegisterButton();
