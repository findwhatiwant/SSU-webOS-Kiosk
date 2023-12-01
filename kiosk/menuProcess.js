var menuCount = [0,0,0,0,0,0];

var priceResult = 0;

function priceUpdate(){
    document.getElementById("priceResult").innerHTML = priceResult;
}

function menuClick(menuId) {
    document.getElementById("menuResults").innerHTML = document.getElementById("menuResults").innerHTML + menuId.menuName + "<br>";
    priceResult += menuId.price;
    priceUpdate();
    menuCount[menuId.number] += 1;
}

