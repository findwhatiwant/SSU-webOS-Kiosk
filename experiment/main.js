window.onload = function () {
    var bridge = new WebOSServiceBridge();

    const notificationApiUrl = 'luna://com.webos.notification';
    const createToast = "/createToast";


    var params = JSON.stringify({
        "menu": ["coffee","tea","milk"],
        // "price" : ["2500","3000","3500"]
    });

    const box_start_btn = document.getElementById("box-start-btn");
    var search_list = document.getElementById("search-list");
    
    box_start_btn.addEventListener('click', function (e) {
        display_log("menu: " + params.menu)
        // bridge.onservicecallback = insertIntentBox;
        bridge.call(notificationApiUrl + createToast, params);
        // display_log("our menu: ");
        // bridge.onServiceCallback = BoxTest;
    });

    // function BoxTest() {
    //     for (id of params.id) {
    //         for (price of params.price) {
    //             insertIntentBox(price, id);
    //         }
    //     }
    // }

    // insert a search item and append its intent action
    function insertIntentBox(intent, title) {
        const liNode = document.createElement("li");
        const textNode = document.createTextNode(title);
        liNode.appendChild(textNode);
        liNode.setAttribute("class", "box");

        liNode.addEventListener('click', function() {
            bridge.call("luna://com.webos.service.intent/start", '{"intent":' + JSON.stringify(intent) + '}');
        });

        search_list.appendChild(liNode);
    }

    // Print response message
    function display_log(msg) {
        let responseWindow = document.getElementById('response-window');
        responseWindow.innerHTML += msg + '</br>'; 
    }
}


