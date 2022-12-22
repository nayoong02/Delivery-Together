let restaurantName = document.getElementById("restaurantName");
let minimumOrderAmount = document.getElementById("minimumOrderAmount");
let money = document.getElementById("money");
let deliveryCharge = document.getElementById("deliveryCharge");
let headCount = document.getElementById("headCount");
let select = document.getElementById("category");
let category;

let registerButton = document.getElementById("registerBtn");
let cancelButton = document.getElementById("cancelBtn");

function registerRecruitment() {
    category = select.options[select.selectedIndex].value;
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments',
        type: 'POST',
        data: JSON.stringify({
            restaurant:{
                name : restaurantName.value,
                latitude: 3,
                longitude: 4
            },
            categories: category.split(),
            minimumOrderAmount: minimumOrderAmount.value,
            money: money.value,
            deliveryCharge: deliveryCharge.value,
            headCount: headCount.value
        }),
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        statusCode: {
            201: function(res) {
                alert("게시물 등록 성공");
                window.location.href = '../html/home.html'
            }
        },
        error : function(e){
            if (e.responseText === "모집을 등록하려면 주소를 등록해야 합니다.") {
                alert(e.responseText);
                return;
            }
            alert(JSON.stringify(e.responseJSON).split(",")[0].split('"')[3]);
        },
    })
}

function clickRegisterPost() {
    registerButton.addEventListener("click", registerRecruitment)
}

clickRegisterPost();