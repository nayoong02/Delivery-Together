let editButton = document.getElementById("editBtn");
let nickname = document.getElementById("nickname");
let email = document.getElementById("email");
let password = document.getElementById("password");

function edit() {
    $.ajax({
        url: 'http://3.36.125.215:8080/members/me',
        type: 'PUT',
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        data: JSON.stringify({
            nickname: nickname.value,
            email: email.value,
            password: password.value
        }),
        success: function(res){
            alert("수정되었습니다");
            localStorage.setItem("nickname", res.nickname);
            window.location.href="../html/home.html";
        },
        error : function(e){
            alert(e.responseText);
        },
    })
}

function clickEditButton() {
    editButton.addEventListener("click", edit);
}

clickEditButton();