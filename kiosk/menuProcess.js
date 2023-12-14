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
    console.log(menuCount);
}

function menuNameReturn(ipt){
    for(var i=0; i<menuCount.length; i++){
        if(Object.values(menu)[i].number == ipt){
            return Object.values(menu)[i].menuName;
        }
    }
}

function paymentClick(){
    const background = document.getElementsByClassName("beforeofdimmed")[0].className = "dimmed";
    let popupTag = document.createElement('div');
    let popupMenu = document.createElement('div');
    let popupButton = document.createElement('button');
    
    popupMenu.className = "popupMenu";

    popupTag.className = "popup";

    popupButton.id = "finalPaymentButton";
    popupButton.innerHTML = "결제하기";
    popupButton.onclick = "";

    popupTag.innerHTML = "<div class='title'>결제 화면</div><div class='content'></div>";
    for(var i=0; i<menuCount.length; i++){
        if(menuCount[i] > 0){
            popupMenu.innerHTML += menuNameReturn(i)+ " " + menuCount[i] + "개" + "<br>";
        }
    }
    popupTag.appendChild(popupMenu);
    popupTag.appendChild(popupButton);
    document.getElementById("popupDiv").appendChild(popupTag);
    
}

