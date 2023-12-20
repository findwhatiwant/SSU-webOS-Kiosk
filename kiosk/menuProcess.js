var menuCount = [0,0,0,0,0,0];

var priceResult = 0;

var db = {"calls":[]};

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
        bodyCss.style.fontSize = "175%";  // 2.5rem?
        fontSizeBtn.innerText = "원래 크기";
    }
    else {
        bodyCss.style.fontSize = null;
        fontSizeBtn.innerText = "글씨 키우기";
    }
}

function callEmployee(){  //toast로 호출 여부를 알리고 db에 저장
    // Get the modal
    let modal = document.getElementById("helpModal");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function call(x) {
    var bridge = new WebOSServiceBridge();

    const notificationApiUrl = "luna://com.webos.notification";
    const createToast = "/createToast";
    const toastParameters = {
        "message": "직원을 호출했습니다. 잠시만 기다려주세요.",
        "persistent": true,
        "sourceId": "com.ssu.webos.samdujungchi.webapp",
    }

    bridge.call(notificationApiUrl + createToast, JSON.stringify(toastParameters));

    let modal = document.getElementById("helpModal");
    modal.style.display = "none";

    // 디버그용
    // alert("직원을 호출했습니다. 잠시만 기다려주세요.");

    let situation = "오류 메세지";
    
    switch(x){
        case 0:
            situation = "기기 고장";
            break;
        case 1:
            situation = "동작 도움 요청";
            break;
        case 2:
            situation = "기타 요청";
            break;
        default:
            break;
    }


    let add = {"name":situation,time:new Date().toLocaleString()};

    db.calls.push(add);

    alert(JSON.stringify(db.calls));
}

function showDB(){
    // Get the modal
    let modal = document.getElementById("dbModal");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    let dbContainer = document.getElementById("bodyDB");

    for(var i=0; i<db.calls.length; i++){
        dbContainer.innerHTML += db.calls[i].name + " " + db.calls[i].time + "<br>";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function clearDB(){
    db.calls = [];
    let dbContainer = document.getElementById("bodyDB");
    dbContainer.innerHTML = "";
}

function showHelp(){
    let modal = document.getElementById("infoModal");
    modal.style.display == "none" ? modal.style.display = "block" : modal.style.display = "none";
}
// window.onload = function() {
//     var bridge = new WebOSServiceBridge();

//     const notificationApiUrl = "luna://com.webos.notification";
//     const createToast = "/createToast";
//     const getToastList = "/getToastList";
//     const closeToast = "/closeToast";

//     // const callEmployeeBtn = document.getElementById("callEmployeeButton");
//     function callEmployeeButton(){  //toast로 호출 여부를 알리고 db에 저장

//         // Get the modal
//         var modal = document.getElementById("myModal");

//         // Get the button that opens the modal
//         var btn = document.getElementById("myBtn");

//         // Get the <span> element that closes the modal
//         var span = document.getElementsByClassName("close")[0];

//         // When the user clicks on the button, open the modal
//         btn.onclick = function() {
//         modal.style.display = "block";
//         }

//         // When the user clicks on <span> (x), close the modal
//         span.onclick = function() {
//         modal.style.display = "none";
//         }

//         // When the user clicks anywhere outside of the modal, close it
//         window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//             }
//         }

//         // const toastParameters = {
//         //     "message": "직원을 호출했습니다. 잠시만 기다려주세요.",
//         //     "persistent": true,
//         //     "sourceId": "com.ssu.webos.samdujungchi.webapp",
//         // }

//         // bridge.call(notificationApiUrl + createToast, JSON.stringify(toastParameters));
//     }

//     const showDBbtn = document.getElementById("showDB");
//     showDBbtn.addEventListener('click', function (e){   //db에 저장된 호출 여부를 보여줌
//         alert("직원을 호출했습니다. 잠시만 기다려주세요.");
//         // let toastList = bridge.call(notificationApiUrl + getToastList).toastInfo;
        
//         // const background = document.getElementsByClassName("beforeofdimmed")[0].className = "dimmed";
//         // let popupTag = document.createElement('div');
//         // let popupMenu = document.createElement('div');
//         // let popupButton = document.createElement('button');
        
//         // popupMenu.className = "popupMenu";
    
//         // popupTag.className = "popup";
    
//         // popupButton.id = "resetButton";
//         // popupButton.innerHTML = "초기화";
//         // popupButton.onclick = bridge.call(notificationApiUrl + closeToast, JSON.stringify({"sourceId": "com.ssu.webos.samdujungchi.webapp"}));
    
//         // popupTag.innerHTML = "<div class='title'>직원 호출 로그</div><div class='content'></div>";
//         // for(var i=0; i < toastList.length; i++){
//         //     if(menuCount[i] > 0){
//         //         popupMenu.innerHTML += toastKList[i].message + " " + toastList[i].timestamp + "<br>";
//         //     }
//         // }
//         // popupTag.appendChild(popupMenu);
//         // popupTag.appendChild(popupButton);
//     });
// }
