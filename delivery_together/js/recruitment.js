let modifyButton = document.getElementById("modifyBtn");
let deleteButton = document.getElementById("deleteBtn");
let attendButton = document.getElementById("attendBtn");
let leaveButton = document.getElementById("leaveBtn");
let chatButton = document.getElementById("chatBtn");

let hostNickname;
let hostId;

function getRecruitment() {
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments/' + recruitmentId(),
        type: 'GET',
        contentType: "application/json",
        success: function(res){
            hostNickname = res.host.info.nickname;
            hostId = res.host.info.id;
            recruitment(res); 
        },
        error : function(e){
            alert(e.responseText);
        },

    })
}

function recruitment(data) {
    document.getElementById("restaurantName").innerHTML = data.restaurant.name;
    document.getElementById("category").innerHTML = data.categories[0];
    document.getElementById("minimumOrderAmount").innerHTML = data.minimumOrderAmount + "원";
    document.getElementById("currentAmout").innerHTML = data.currentMoney + "원";
    document.getElementById("deliveryCharge").innerHTML = data.deliveryCharge + "원";
    document.getElementById("count").innerHTML = data.currentCount + "명/" + data.headCount + "명";
}

function moveEditPage() {
    if (hostNickname != localStorage.getItem('nickname')) {
        alert('접근 권한이 없습니다.');
        return;
    }
    window.location.href='editPost.html?id=' + recruitmentId();
}

function modifyRecruitment() {
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments/' + recruitmentId(),
        type: 'PUT',
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        success: function(res) {
            // html 만들기
            // [id, 현재 인원, 모집 인원, ~~, ~~ 등]
        },
        error : function(e){
            alert(e.responseText);
        },
    })
}

function deleteRecruitment() {
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments/' + recruitmentId(),
        type: 'DELETE',
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        success: function(res) {
            alert("삭제되었습니다");
            window.location.href="../html/home.html";
        },
        error : function(e){
            alert(e.responseText);
        },
    })
}

function attend() {
    if (hostNickname == localStorage.getItem('nickname')) {
        alert('본인의 모집에 신청할 수 없습니다.');
        return;
    }
    var input = prompt("참가할 금액을 입력해주세요");
    if (input != null) {
        attendRecruitment(input);
    }
}

function attendRecruitment(input) {
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments/' + recruitmentId() + "/attend",
        type: 'POST',
        data: JSON.stringify({
            money: input
        }),
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        success: function(res) {
            alert("신청되었습니다");
            window.location.href="../html/home.html"
        },
        error : function(e){
            alert(e.responseText);
        },

    })
}


function leaveRecruitment() {
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments/' + recruitmentId() + "/leave",
        type: 'POST',
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        success: function(res){
            alert("신청 취소되었습니다.");
            window.location.href="../html/home.html"
        },
        error : function(e){
            alert(e.responseText);
        },
    })
}

function chatGoGo() {
    if (hostId == localStorage.getItem("id")) {
        window.location.href="../html/chatList.html?id=" + recruitmentId();
        return;
    }
    
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments/' + recruitmentId() + "/chat",
        type: 'POST',
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        success: function(res){
            window.location.href="../html/chatRoom.html?id=" + res;
        },
        error : function(e){
            alert(e.responseText);
        },
    })
}


function recruitmentId() {
    return window.location.href.split('?')[1].split('=')[1];
}
// function clickModifyButton() {
//     modifyButton.addEventListener("click", modifyRecruitment)
// }
function clickDeleteButton() {
    deleteButton.addEventListener("click", deleteRecruitment)
}
function clickAttendButton() {
    attendButton.addEventListener("click", attend)
}
function clickLeaveButton() {
    leaveButton.addEventListener("click", leaveRecruitment)
}

function clickChatButton() {
   chatButton.addEventListener("click", chatGoGo)
}

getRecruitment();
clickDeleteButton();
clickAttendButton();
clickLeaveButton();
clickChatButton();
