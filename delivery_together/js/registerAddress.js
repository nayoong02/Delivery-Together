let x;
let y;
let place;
let input = document.getElementById("input");
let addressList = document.getElementById("addressList");

let searchButton = document.getElementById("searchBtn");
let registerButton = document.getElementById("registerBtn");

function searchAddress() {
    $.ajax({
        url: 'https://dapi.kakao.com/v2/local/search/keyword.json?query=' + input.value,
        type: 'GET',
        contentType: "application/json",
        headers: {
            'Authorization': `KakaoAK c56cd6f9d2ea45402ac012849eb72942`,
        },
        success: function(res) {
            createAddressList(res.documents);
        },
        error : function(e){
            alert(e.responseText);
        },

    })
}

function createAddressList(data) {
    list = "";
    for (var i = 0; i < data.length; i++) {
        list += "<tr onclick='select(event)' x=" + data[i].x + " y=" + data[i].y + " place=" + data[i].place_name + ">";
        list += "<td>" + data[i].place_name + "</td><td>" + data[i].road_address_name + "</td></tr>";
    }
    addressList.innerHTML = list;
}

function select(event) {
    place = event.target.parentNode.getAttribute("place");
    x = event.target.parentNode.getAttribute("x");
    y = event.target.parentNode.getAttribute("y");
    input.value = place;
}


function registerAddress() {
    $.ajax({
        url: 'http://3.36.125.215:8080/members/me/address',
        type: 'POST',
        data: JSON.stringify({
            latitude: x,
            longitude: y,
        }),
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        contentType: "application/json",
        success: function(res) {
            alert("주소등록 성공");
            window.location.href = '../html/home.html';
        },
        error : function(e){
            alert(e.responseText);
         },
    })
}


//function extractParam() {
//    return window.location.href.split('?')[1].split('=')[1];
//}

function clickSearchButton() {
    searchButton.addEventListener("click", searchAddress)
}

function clickRegisterButton() {
    registerButton.addEventListener("click", registerAddress)
}

clickSearchButton();
clickRegisterButton();
