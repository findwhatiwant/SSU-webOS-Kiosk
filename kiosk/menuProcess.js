var menuCount = [0,0,0,0,0,0];

var priceResult = 0;

function priceUpdate(){//가격 업데이트
    document.getElementById("priceResult").innerHTML = priceResult;
}

function menuClick(menuId) { //메뉴 개수를 늘려주는 함수
    document.getElementById("menuResults").innerHTML = document.getElementById("menuResults").innerHTML + menuId.menuName + "<br>";
    priceResult += menuId.price;
    priceUpdate();
    menuCount[menuId.number] += 1;
    console.log(menuCount);
}

function menuCancle(){
    menuCount = [0,0,0,0,0,0];
    document.getElementById("menuResults").innerHTML = "";
    priceResult = 0;
    document.getElementById("priceResult").innerHTML = "";
}

function menuNameReturn(ipt){ //결제하기 버튼에서 메뉴 이름을 리턴 하기 위함
    for(var i=0; i<menuCount.length; i++){
        if(Object.values(menu)[i].number == ipt){
            return Object.values(menu)[i].menuName;
        }
    }
}

function paymentClick(){ //결제하기 버튼
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

function changeFontSize(){ //글씨 크기 키우거나 원래대로 돌리기
    const fontSizeBtn = document.getElementById("fontSizeButton");
    let bodyCss = document.querySelector("body");

    if(fontSizeBtn.innerText != "원래 크기") {
        bodyCss.style.fontSize = "xx-large";  // 2.5rem?
        fontSizeBtn.innerText = "원래 크기";
    }
    else {
        bodyCss.style.fontSize = null;
        fontSizeBtn.innerText = "글씨 키우기";
    }
}

window.onload = function() {
    var bridge = new WebOSServiceBridge();

    const notificationApiUrl = "luna://com.webos.notification";
    const createToast = "/createToast";
    const closeToast = "/closeToast";

    const callEmployeeBtn = document.getElementById("callEmployeeButton");
    callEmployeeBtn.addEventListener('click', function (e){  //toast로 호출 여부를 알리고 db에 저장
        const toastParameters = {
            "message": "직원을 호출했습니다. 잠시만 기다려주세요.",
            "persistent": true,
            "sourceId": "com.ssu.webos.samdujungchi.webapp",
        }

        bridge.call(notificationApiUrl + createToast, JSON.stringify(toastParameters));
    });
}
