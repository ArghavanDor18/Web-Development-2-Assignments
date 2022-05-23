username = document.getElementById('username').innerText;
password = document.getElementById('password').innerText;
async function auth (){
await $.ajax({
    url: 'http://localhost:5000/login/auth',
    type: 'POST',
    user: {
        username: username,
        password: password
    },
    success: (new_user) => {
        if(new_user == 'success'){
        $('#new_user').html('Successful login!')
    
    } else {
        $('#new_user').html('Login failed')
     
            }
        }

    })
}

function setup(){
    $('body').on('click', '.login', auth)
}

$(document).ready(setup)

