function chatRooms() {
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments/' + recruitmentId() + '/rooms',
        type: 'GET',
        contentType: "application/json",
        success: function(res){
            for (var i = 0; i < res.length; i++) {
                renderChatRoom(res[i].id, res[i].member.nickname);
            }
        },
        error : function(e){
            alert(e);
        },
    })
}

function renderChatRoom(chatRoomId, nickname) {
    var roomDiv = "";
    roomDiv += '<li><a href="chatRoom.html?id=' + chatRoomId + '"><img src="../img/default_profile.png" class="profile-img"><div class="talk">';
    roomDiv += '<p class="friend-name">' + nickname + '</p>';
    roomDiv += '<p class="chat-content">메시지가 도착했습니다.</p></div>';
    roomDiv += '<div class="chat-status"></div></a></li>';
    const template = document.createElement('template');
    template.innerHTML = roomDiv;
    document.getElementById("chat-rooms").appendChild(template.content.firstChild);
}

function recruitmentId() {
    return window.location.href.split('?')[1].split('=')[1];
}

chatRooms();
