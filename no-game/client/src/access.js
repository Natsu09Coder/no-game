let page = {};

page.initialize = function() {
}

/************************/
let access = {};

access.login = function(username, password) {
    console.log(username, "et", password);
    fetch(`/api/login?username=${username}&password=${password}`)
    .then(response => response.json())
    .then(result => {
        if (result.valid === true) {
            this.correctCode();
        } else {
            this.wrongCode();
        }
    });
};

access.correctCode = function() {
    document.querySelector("#incorrect").className = '';
    document.querySelector("#granted").className = 'active';
    this.play(true);
};

access.wrongCode = function() {
    document.querySelector("#incorrect").className = 'active';
    window.setTimeout(function() {
        document.querySelector("#incorrect").className = '';
    }, 2000);
};

access.play = function(success) {
    var el = document.getElementById(success ? 'audioOK' : 'audioNOK');
    el.play();
};

/************************/

window.addEventListener("load", function(event) {
    page.initialize();
});