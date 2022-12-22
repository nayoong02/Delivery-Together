let loginButton = document.getElementById("login-submit");
let loginEmail = document.getElementById("login-email");
let loginPassword = document.getElementById("login-password");

function login() {
	if (checkBlank()) {
		$.ajax({
			url: 'http://3.36.125.215:8080/login',
			type: 'POST',
			data: JSON.stringify({
				email: loginEmail.value,
				password: loginPassword.value
			}),
			contentType: "application/json",
			success: function (res) {
				alert("로그인 성공");
				localStorage.setItem("id", res.id);
				localStorage.setItem("token", res.token);
				localStorage.setItem("nickname", res.nickname);
				window.location.href = '../html/home.html';
			},
			error : function(e){
				alert(e.responseText);
			 },
		})
	}
}

function checkBlank() {
	if (loginEmail.value == "" || loginPassword.value == "") {
        alert("모든 항목을 입력해주세요");
        return false;
    }

    return true;
}

   

function setClickLoginButton() {
    loginButton.addEventListener("click", login)
}

setClickLoginButton();
