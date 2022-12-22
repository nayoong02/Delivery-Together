let nickname = document.getElementById("nickname");
let logoutButton = document.getElementById("btn-logout");
let deleteMemberButton = document.getElementById("btn-delete");
let searchButton = document.getElementById("btn-searchCategory");

let select = document.getElementById("category");
let category;

function getRecruitments() {
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments',
        type: 'GET',
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        success: function(res){
            nickname.innerHTML = localStorage.getItem("nickname") + " 님";
            createList(res);
        },
        error : function(e){
            alert(e.responseText);
        },

    })
}

function createList(data){
    let list="";
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var distance = row.distance;
        var distanceMessage;
        if (distance == -1) {
            distanceMessage = "주소 미등록";
        } else {
            distanceMessage = Math.round(distance) + "m";
        }
        list += "<tr onclick='move(event)' id=" + row.id + ">";
        list += "<td>" + row.restaurant.name + "</td><td>" + row.categories[0] + "</td><td>" + row.currentCount + "</td>";
        list += "<td>" + row.headCount + "</td><td>" + row.host.info.nickname + "</td>"
        list += "<td>" + row.createAt.split("T")[0]+ "  " + row.createAt.split("T")[1].split(".")[0] + "</td><td>" + distanceMessage +"</td></tr>";
    }
    let recruitmentList = document.getElementById('recruitmentsList');
    recruitmentList.innerHTML = list;
}

function logout() {
    alert("로그아웃되었습니다");
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    window.location.href="../html/signUpNLogin.html";
}

function deleteMember() {
    $.ajax({
        url: 'http://3.36.125.215:8080/members/me',
        type: 'DELETE',
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        success: function(res){
            alert("탈퇴되었습니다");
            window.location.href="../html/signUpNLogin.html";
        },
        error : function(e){
            alert(e.responseText);
        },
    })
}

function searchByCategory() {
    category = select.options[select.selectedIndex].value;
    let url;
    if (category == "카테고리") {
        url = 'http://3.36.125.215:8080/recruitments';
    } else {
        url = 'http://3.36.125.215:8080/recruitments' + "?category="+ category;
    }
    $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        success: function(res){
            createList(res);
        },
        error : function(e){
            alert(e.responseText);
        },

    })
}

function move(event) {
    window.location.href="../html/post.html?id=" + event.target.parentNode.id;
}

function clickLogoutButton() {
    logoutButton.addEventListener("click", logout)
}

function clickDeletMemberButton() {
    deleteMemberButton.addEventListener("click", deleteMember)
}

function clickSearchButton() {
    searchButton.addEventListener("click", searchByCategory)
}

getRecruitments();
clickLogoutButton();
clickDeletMemberButton();
clickSearchButton();