var sock = new SockJS("http://3.36.125.215:8080/ws-connection");
var ws = Stomp.over(sock);

var sendArea = document.getElementById("send-area");
var chatArea = document.getElementById("main-chat");

var myId = localStorage.getItem("id");
var chatRoomId = window.location.href.split("?")[1].split("=")[1];

function renderBeforeMessages() {
  $.ajax({
    url:
      "http://3.36.125.215:8080/rooms/" + chatRoomId + "/messages?messageId=1",
    type: "GET",
    contentType: "application/json",
    success: function (res) {
      var memberName = "";
      for (var i = 0; i < res.length; i++) {
        renderMessage(
          res[i].senderId,
          res[i].nickname,
          res[i].content,
          res[i].sendAt
        );
        if (res[i].senderId != myId) {
          memberName = res[i].nickname;
        }
      }
      document.getElementById("profile-name").innerHTML = memberName;
    },
    error: function (e) {
      alert(e);
    },
  });
}

function sendMessage() {
  ws.send(
    "/pub/rooms/" + chatRoomId,
    {},
    JSON.stringify({ memberId: myId, message: sendArea.value })
  );
}

function renderMessage(senderId, nickname, content, sendAt) {
  if (senderId != myId) {
    var message = "";
    message +=
      '<div class="friend-chat"><img class="profile-img" src="../img/default_profile.png" /><div class="friend-chat-col">';
    message += '<span class="profile-name">' + nickname + "</span>";
    message += '<span class="balloon">' + content + "</span>";
    message +=
      '</div><time datetime="' +
      sendAt +
      '">' +
      splitDate(sendAt) +
      "</time></div>";
    const template = document.createElement("template");
    template.innerHTML = message;
    document
      .getElementById("main-chat")
      .appendChild(template.content.firstChild);
    $(window).scrollTop(1000000000);
    return;
  }
  var message = "";
  message +=
    '<div class="me-chat"><div class="me-chat-col"><span class="balloon">' +
    content +
    "</span></div>";
  message +=
    '<time datetime="' + sendAt + '">' + splitDate(sendAt) + "</time></div>";
  const template = document.createElement("template");
  template.innerHTML = message;
  document.getElementById("main-chat").appendChild(template.content.firstChild);
  $(window).scrollTop(1000000000);
}

function splitDate(date) {
  var front = date.split("T")[0];
  var back = date.split("T")[1];
  return back.split(".")[0];
}

function connect() {
  ws.connect(
    {},
    function (frame) {
      ws.subscribe("/sub/rooms/" + chatRoomId, function (message) {
        var recv = JSON.parse(message.body);
        renderMessage(recv.senderId, recv.nickname, recv.content, recv.sendAt);
      });
    },
    function (error) {
      alert("서버에 문제가 발생했습니다.");
    }
  );
}

function clickSendButton() {
  document.getElementById("send-button").addEventListener("click", sendMessage);
}

clickSendButton();
renderBeforeMessages();
connect();
