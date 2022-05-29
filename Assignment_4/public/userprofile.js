function userInfo() {
    $.ajax({
        url: "http://localhost:5000/userInfo/:username",
        type: "Get",
        success: (user) => {
            $('main').append(`
            <p>Welcome, ${user[0].firstName} <p>
            `)
            $('main').append(`${user[0].username} has purchased the following: <br>`)
            for (i = 0; i < user[0].shoppingCart.length; i++) {
                $('main').append(`${user[0].shoppingCart[i]} <br>`)
            }
       
            $('main').append('<button id="add_to_cart">Add To Cart</button>')
        }
    })
}



function storePage() {
    $.ajax({
        url: "http://localhost:5000/store",
        type: "get",
        success: (res) => {
            window.location.href="/store.html"
        }
    })
}

function setup() {
    userInfo();

    $("body").on("click", "#add_to_cart", storePage)
}

$(document).ready(setup)