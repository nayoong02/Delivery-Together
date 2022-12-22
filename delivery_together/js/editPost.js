let editButton = document.getElementById("editBtn");

let restaurantName = document.getElementById("restaurantName");
let select = document.getElementById("category");
let category;
let minimumOrderAmount = document.getElementById("minimumOrderAmount");
let currentAmout = document.getElementById("currentAmout");
let deliveryCharge = document.getElementById("deliveryCharge");
let headCount = document.getElementById("headCount");

function getRecruitment() {
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments/' + recruitmentId(),
        type: 'GET',
        contentType: "application/json",
        success: function(res){
            recruitment(res); 
        },
        error : function(e){
            alert(e.responseText);
        },

    })
}

function recruitment(data) {
    var selectBox = document.getElementById("category");
    for(var i, j = 0; i = selectBox.options[j]; j++) {
        if(i.value == data.categories[0]) {
            selectBox.selectedIndex = j;
            break;
        }
    }
    document.getElementById("restaurantName").value = data.restaurant.name;
    document.getElementById("minimumOrderAmount").value = data.minimumOrderAmount;
    document.getElementById("currentAmout").value = data.currentMoney;
    document.getElementById("deliveryCharge").value = data.deliveryCharge;
    document.getElementById("headCount").value = data.headCount;
}

function moveBeforePage() {
    window.location.href='post.html?id=' + recruitmentId();
}

function modifyRecruitment() {
    category = select.options[select.selectedIndex].value;
    $.ajax({
        url: 'http://3.36.125.215:8080/recruitments/' + recruitmentId(),
        type: 'PUT',
        data: JSON.stringify({
            restaurant:{
                name : restaurantName.value,
            },
            categories: category.split(),
            minimumOrderAmount: minimumOrderAmount.value,
            deliveryCharge: deliveryCharge.value,
            headCount: headCount.value,
            money: currentAmout.value
        }),
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        success: function(res) {
            alert("수정되었습니다");
            window.location.href="../html/home.html";
        },
        error : function(e){
            alert(e.responseText);
        },
    })
}

function recruitmentId() {
    return window.location.href.split('?')[1].split('=')[1];
}

function clickEditButton() {
    editButton.addEventListener("click", modifyRecruitment)
}

getRecruitment();
clickEditButton();