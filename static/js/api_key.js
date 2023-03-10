let scrollCount = 0;
window.addEventListener("load",function(event) {
    var API_KEY = (document.cookie+ ';devtools_api_key=API_KEY;').split('devtools_api_key=')[1].split(';')[0];
    var tokens = document.getElementsByClassName("token string");
    for (var i = 0; i < tokens.length; i++) {
        tokens[i].innerHTML = tokens[i].innerHTML.replaceAll('??API_KEY??', API_KEY);
    }
    var referrer = document.referrer;
    if (referrer == '') {
        referrer = "direct";
    }
    try {
        var http = new XMLHttpRequest();
        http.open("GET", "https://smartdriver.dev-tools.ai/register_referrer?referrer=" + encodeURIComponent(referrer));
        http.send(null);
    } catch (exception) {
        console.log(':(');
    }
},false);

window.addEventListener("click",function(event) {
    var API_KEY = (document.cookie+ ';devtools_api_key=API_KEY;').split('devtools_api_key=')[1].split(';')[0];
    var tokens = document.getElementsByClassName("token string");
    for (var i = 0; i < tokens.length; i++) {
        tokens[i].innerHTML = tokens[i].innerHTML.replaceAll('??API_KEY??', API_KEY);
    }
},false);

window.addEventListener("scroll",function(event) {
    scrollCount += 1;

    if (scrollCount % 10 == 0) {
        var API_KEY = (document.cookie+ ';devtools_api_key=API_KEY;').split('devtools_api_key=')[1].split(';')[0];
        var tokens = document.getElementsByClassName("token string");
        for (var i = 0; i < tokens.length; i++) {
            tokens[i].innerHTML = tokens[i].innerHTML.replaceAll('??API_KEY??', API_KEY);
        }
    }
},false);

document.addEventListener('copy', function(e){
    var API_KEY = (document.cookie+ ';devtools_api_key=API_KEY;').split('devtools_api_key=')[1].split(';')[0];

    var text = window.getSelection().toString().replace('??API_KEY??', API_KEY);
    e.clipboardData.setData('text/plain', text);
    e.preventDefault();
});
