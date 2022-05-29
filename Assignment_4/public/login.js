function userLogin(req) {
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    $.ajax({
        url: "http://localhost:5000/login",
        type: "post",
        data: {
            username: username,
            password: password
        },
        success: (res) => {
            window.location.href="/userprofile.html"
        }
    })
}

function setup() {
    $('body').on("click", "#login", userLogin)
}

$(document).ready(setup)
